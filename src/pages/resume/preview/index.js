import React from 'react';

const Preview = ({ data }) => {
  return (
    <div>
      <h2>Resume Preview</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <h4>Experience</h4>
      <p>{data.jobTitle} at {data.company}</p>
      <p>{data.jobDescription}</p>
      <h4>Education</h4>
      <p>{data.degree} from {data.institution}</p>
      <p>Graduation Date: {data.graduationDate}</p>
    </div>
  );
};

export default Preview;
