import React from 'react';
import { Link } from 'react-router-dom';

const Education = ({ data, onChange }) => {
  return (
    <div>
      <h2>Education Section</h2>
      <input
        type="text"
        name="degree"
        value={data.degree}
        onChange={onChange}
        placeholder="Degree"
      />
      <input
        type="text"
        name="institution"
        value={data.institution}
        onChange={onChange}
        placeholder="Institution"
      />
      <input
        type="date"
        name="graduationDate"
        value={data.graduationDate}
        onChange={onChange}
      />
      <Link to="/preview">Next: Preview</Link>
    </div>
  );
};

export default Education;
