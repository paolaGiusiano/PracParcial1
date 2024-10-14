import React from 'react';

const Input = ({ label, type, value, onChange, required = false }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  </div>
);

export default Input;
