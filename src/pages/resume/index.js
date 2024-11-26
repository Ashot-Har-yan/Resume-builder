import { useState } from 'react';
import { Flex,Button, Steps,Row,Col, Form, Input ,Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../state/userProfile';
import './index.css';


const Resume = ()=>{
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    const [skillsList, setSkillsList] = useState([]);
    const { Step } = Steps;
    const [form] = Form.useForm()
  const [resumeData, setResumeData] = useState({
    name: '',
    lastName:'',
    phone: '',
    address:'',
    courseName:'',
    institution: '',
    graduationDate: '',
    projectName: '',
    tech: '',
    projectDescript: '',
    social: '',
    profileImage:null,
  });
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({
      ...prevData, 
      [name]: value, 
    }));
  };
  const handleImageChange = ({ fileList }) => {
    if (fileList.length > 0) {
      
      const file = fileList[0].originFileObj;
      const imageURL = URL.createObjectURL(file); 
      setResumeData({ ...resumeData, profileImage: imageURL });
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setIsAuth(false));

    } catch (e) {
      console.log(e, ':signOut error')
    }
  };
  const addSkill = () => {
    setSkillsList([...skillsList, '']); // Add an empty string for new skill input
  };
  const handleSkillChange = (index, e) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index] = e.target.value; // Update the specific skill input
    setSkillsList(updatedSkills);
  };
  // const handleDateChange = (date, dateString) => {
  //   setResumeData({ ...resumeData, graduationDate: dateString });
  // };
  const steps = [
    {
      title: 'Profile Section',
      content: (
        <Form autoComplete="off" form={form} name="profile">
          <Row gutter={[40, 16]}>
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input
                  style={{ padding: '12px 24px' }}
                  name="name"
                  value={resumeData.name}
                  onChange={handleChange}
                  placeholder="First Name"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input
                  style={{ padding: '12px 24px' }}
                  name="lastName"
                  value={resumeData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input
                  style={{ padding: '12px 24px' }}
                  name="phone"
                  value={resumeData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input
                  style={{ padding: '12px 24px' }}
                  name="address"
                  value={resumeData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="upload">
                <Upload
                  accept="image/*"
                  beforeUpload={() => false} 
                  onChange={handleImageChange}
                  showUploadList={false} 
                >
                  <Button>Choose File</Button>
                </Upload>
                {resumeData.profileImage && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={resumeData.profileImage}
                      alt="Profile"
                      style={{ width: 100, height: 100, borderRadius: '50%' }}
                    />
                  </div>
                )}
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
        <Row gutter={[40,16]}>
          <Col span={12}>
            <Form.Item
              name="courseName"
              rules={[{ required: true, message: 'Please input your degree!' }]}
            >
              <Input  style={{padding:'12px 24px'}} name="courseName" value={resumeData.courseName} onChange={handleChange} placeholder="Course Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="institution"
              rules={[{ required: true, message: 'Please input your institution!' }]}
            >
              <Input  style={{padding:'12px 24px'}} name="institution" value={resumeData.institution} onChange={handleChange} placeholder="Institution" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="graduationDate"
              rules={[{ required: true, message: 'Please input your graduation date!' }]}
            >
              <Input  style={{padding:'12px 24px'}} name="graduationDate" value={resumeData.graduationDate} onChange={handleChange} placeholder="Graduation Date" />
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
            {skillsList.map((skill, index) => (
              <Col span={2} key={index}>
                <Form.Item
                  name={`skills[${index}]`}
                  rules={[{ required: true, message: 'Please input your skill!' }]}
                >
                  <Input
                    style={{ padding: '12px 24px' }}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e)}
                    placeholder="Skill"
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Button type="dashed" onClick={addSkill} style={{ marginTop: '10px' }}>
            Add Skill
          </Button>
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
              <Input style={{padding:'12px 24px'}} name="projectName" value={resumeData.projectName} onChange={handleChange} placeholder='Project Name *'  />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="tech" value={resumeData.tech} onChange={handleChange} placeholder='Tech Stack'/>
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item >
              <Input style={{padding:'12px 24px'}} name="projectDescript" value={resumeData.projectDescript} onChange={handleChange} placeholder='Description'/>
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
              <Input style={{padding:'12px 24px'}} name="social" value={resumeData.social} onChange={handleChange} placeholder='Social Links *'/>
            </Form.Item>
            </Col>
            </Row>
          </Form>
      ),
    },
    {
      title: 'Preview',
      content: (
        <Form style={{justifySelf:'center'}}>
          <div className='finalResume'>
          {resumeData.profileImage && (
            <div style={{ marginBottom: '20px' }}>
              <img
                src={resumeData.profileImage}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: '50%' }} 
              />
            </div>
          )}
          
          <p>{resumeData.name} {resumeData.lastName}</p>
          <h4><strong>Phone</strong></h4>
          <span>{resumeData.phone}</span>
          <h4><strong>Address</strong></h4>
          <span>{resumeData.address}</span>
          <h4>Education</h4>
          <h2>Course Name: <span>{resumeData.courseName}</span></h2>
          <h2>Institution: <span>{resumeData.institution}</span></h2>
          <h2>Graduation Date: <span>{resumeData.graduationDate}</span></h2>
          <h4><strong>Skills</strong></h4>
          <ul>
              {skillsList.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
              </ul>
          <h4><strong>Projects</strong></h4>
          <h2>Project name: <span>{resumeData.projectName}</span></h2>
          <h2>Tech Stack: <span>{resumeData.tech}</span></h2>
          <h2>Description: <span>{resumeData.projectDescript}</span></h2>
          <h4><strong>Social</strong></h4>
          <span>{resumeData.social}</span>
          </div>
        </Form>
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
      <Steps current={current} onChange={setCurrent} >
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 50 }}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 20,display:'flex',justifySelf:'center'}}>
        {current > 0 && (
          <Button  type="primary" style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
      </div>
  );
}

export default Resume;
