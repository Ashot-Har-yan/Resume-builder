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
          <Form autoComplete='off' form = {form}>
            <Form.Item style={{display:'flex',justifyContent:'center'}}>
              Add your profile details</Form.Item>
            <Form.Item >
              <Input  style={{padding:'12px 24px'}} name="name" value={resumeData.name} onChange={handleChange} placeholder='First Name' />
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="lastName" value={resumeData.lastName} onChange={handleChange} placeholder='Last Name'/>
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="number" value={resumeData.number} onChange={handleChange} placeholder='Phone Number'/>
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="adress" value={resumeData.adress} onChange={handleChange} placeholder='Adress' />
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
        
        <Form autoComplete='off' form = {form} >
            <Form.Item style={{display:'flex',justifyContent:'center'}}>
              Add your Education details
              </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="degree" value={resumeData.degree} onChange={handleChange} placeholder='Course Name' />
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="institution" value={resumeData.institution} onChange={handleChange} placeholder='Completion Year *' />
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="institution" value={resumeData.institution} onChange={handleChange} placeholder='College/School' />
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="institution" value={resumeData.institution} onChange={handleChange} placeholder='Percentage *' />
            </Form.Item>
            
          </Form>
        
      ),
    },
    {
      title: 'Skills Sector',
      content: (
        
           <Form autoComplete='off' form = {form} >
          <Form.Item style={{display:'flex',justifyContent:'center'}}>
              Add your Skills
              </Form.Item>
          
          </Form>
      ),
    },
    {
      title: 'Mini Project',
      content: (
        <Form autoComplete='off' form = {form}>
          <Form.Item style={{display:'flex',justifyContent:'center'}}>
              Add your Mini Projects
              </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} placeholder='Project Name *'  />
            </Form.Item>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="company" value={resumeData.company} onChange={handleChange} placeholder='Tech Stack'/>
            </Form.Item>
            <Form.Item >
              <Input.TextArea name="jobDescription" value={resumeData.jobDescription} onChange={handleChange} placeholder='Description'/>
            </Form.Item>
          </Form>
      ),
    },
    {
      title: 'Social',
      content: (
        <Form autoComplete='off' form = {form} >
          <Form.Item style={{display:'flex',justifyContent:'center'}}>
          Add social links like linkedin , github etc
              </Form.Item>
            <Form.Item>
              <Input style={{padding:'12px 24px'}} name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} placeholder='Social Links *'/>
            </Form.Item>
           
          </Form>
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
      <div style={{ marginTop: 20,display:'flex',justifySelf:'center'}}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button  type="primary" style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
      </div>
  );
}

export default Resume;
