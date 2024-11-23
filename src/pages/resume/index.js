import { useState } from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import { Flex,Button, Steps,Row,Col, Form, Input, DatePicker ,Upload } from 'antd';
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
        <Form autoComplete="off" form={form} name="profile">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input name="name" value={resumeData.name} onChange={handleChange} placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input name="lastName" value={resumeData.lastName} onChange={handleChange} placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input name="phone" value={resumeData.phone} onChange={handleChange} placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input name="address" value={resumeData.address} onChange={handleChange} placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
              Profile Image
            <Form.Item name="upload">
              <Upload>
                <Button>Choose File</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
        
      ),
    },
    {
      title: 'Education Section',
      content: (
        <Form autoComplete="off" form={form} name="education">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="degree"
              rules={[{ required: true, message: 'Please input your degree!' }]}
            >
              <Input name="degree" value={resumeData.degree} onChange={handleChange} placeholder="Course Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="institution"
              rules={[{ required: true, message: 'Please input your institution!' }]}
            >
              <Input name="institution" value={resumeData.institution} onChange={handleChange} placeholder="Institution" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="graduationDate"
              rules={[{ required: true, message: 'Please input your graduation date!' }]}
            >
              <Input name="graduationDate" value={resumeData.graduationDate} onChange={handleChange} placeholder="Graduation Date" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
        
      ),
    },
    {
      title: 'Skills Sector',
      content: (
        <Form autoComplete="off" form={form} name="skills">
        <Row gutter={10}>
          <Col span={2}>
            <Form.Item
              name="skills"
              rules={[{ required: true, message: 'Please input your skills!' }]}
            >
              <Input  style={{padding:'12px 24px'}}name="skills" value={resumeData.skills} onChange={handleChange} placeholder="Skills" />
            </Form.Item>
          </Col>
        </Row>
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
              <Row gutter={10}>
          <Col span={8}>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} placeholder='Project Name *'  />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="company" value={resumeData.company} onChange={handleChange} placeholder='Tech Stack'/>
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="jobDescription" value={resumeData.jobDescription} onChange={handleChange} placeholder='Description'/>
            </Form.Item>
            </Col>
            </Row>
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
              <Row gutter={10}>
                <Col span={24}>
            <Form.Item>
              <Input style={{padding:'12px 24px'}} name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} placeholder='Social Links *'/>
            </Form.Item>
            </Col>
            </Row>
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
