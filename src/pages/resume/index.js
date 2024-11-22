import { useState } from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import { Flex,Button, Steps, Form, Input, DatePicker ,Upload } from 'antd';
import { ROUTE_CONSTANTS } from '../../util/constants';
import Preview from './preview';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../state/userProfile';

import './index.css';


const Resume = ()=>{
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    const { Step } = Steps;
    const [form] = Form.useForm()
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    jobDescription: '',
    degree: '',
    institution: '',
    graduationDate: ''
  });
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({resumeData, [name]: value });
  };
 
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setIsAuth(false));

    } catch (e) {
      console.log(e, ':signOut error')
    }
  };
  const handleDateChange = (date, dateString) => {
    setResumeData({ ...resumeData, graduationDate: dateString });
  };
  const steps = [
    {
      title: 'Profile Section',
      content: (
          <Form form = {form}>
          Add your profile details
            <Form.Item >
              <Input name="name" value={resumeData.name} onChange={handleChange} placeholder='First Name' />
            </Form.Item>
            <Form.Item >
              <Input name="lastName" value={resumeData.lastName} onChange={handleChange} placeholder='Last Name'/>
            </Form.Item>
            <Form.Item >
              <Input name="number" value={resumeData.number} onChange={handleChange} placeholder='Phone Number'/>
            </Form.Item>
            <Form.Item >
              <Input name="adress" value={resumeData.adress} onChange={handleChange} placeholder='Adress' />
            </Form.Item>
            <Form.Item >
            <Upload>
                <Button>
                Choose File
                </Button>
                </Upload>
            </Form.Item>
          </Form>
        
      ),
    },
    {
      title: 'Education Section',
      content: (
        <div>
          <Form>
            <Form.Item label="Degree">
              <Input name="degree" value={resumeData.degree} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Institution">
              <Input name="institution" value={resumeData.institution} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Graduation Date">
              <DatePicker onChange={handleDateChange} value={resumeData.graduationDate} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Skills Sector',
      content: (
        <div>
          <Form>
            <Form.Item label="Job Title">
              <Input name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Company">
              <Input name="company" value={resumeData.company} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Job Description">
              <Input.TextArea name="jobDescription" value={resumeData.jobDescription} onChange={handleChange} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Mini Project',
      content: (
        <div>
          <Form>
            <Form.Item label="Job Title">
              <Input name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Company">
              <Input name="company" value={resumeData.company} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Job Description">
              <Input.TextArea name="jobDescription" value={resumeData.jobDescription} onChange={handleChange} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Social',
      content: (
        <div>
          <Form>
            <Form.Item label="Job Title">
              <Input name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Company">
              <Input name="company" value={resumeData.company} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Job Description">
              <Input.TextArea name="jobDescription" value={resumeData.jobDescription} onChange={handleChange} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Preview',
      content: (
        <div>
          <h3>Resume Preview</h3>
          <p><strong>Name:</strong> {resumeData.name}</p>
          <p><strong>Email:</strong> {resumeData.email}</p>
          <p><strong>Phone:</strong> {resumeData.phone}</p>
          <h4>Experience</h4>
          <p>{resumeData.jobTitle} at {resumeData.company}</p>
          <p>{resumeData.jobDescription}</p>
          <h4>Education</h4>
          <p>{resumeData.degree} from {resumeData.institution}</p>
          <p>Graduation Date: {resumeData.graduationDate}</p>
        </div>
      ),
    },
  ];

  return (
      <div className="Resume">
        <div className="main_header">
        <Flex  justify="space-around" align="center">
          <div>
          RESUME GENERATOR
          </div>
        <Button  onClick={handleSignOut}>
            Sign Out
        </Button>
        </Flex>
        </div>
       
          <div style={{ width: '98%', margin: '5% auto ' }}>
      <Steps current={current}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 50 }}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 20 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
      </div>
  );
}

export default Resume;
