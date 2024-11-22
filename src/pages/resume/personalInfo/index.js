import React from 'react';
import { Link } from 'react-router-dom';

const PersonalInfo = ({ data, onChange }) => {
  return (
    <div>
      <h2>Personal Section</h2>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phone"
        value={data.phone}
        onChange={onChange}
        placeholder="Phone"
      />
      <Link to="/experience">Next: Experience</Link>
    </div>
  );
};

export default PersonalInfo;
