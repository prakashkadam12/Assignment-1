import React, { useState } from 'react';

const CustomDropdown = ({ value, onChange, options, handleAssigneeChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleOptionChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
    handleAssigneeChange(newValue); // Call the handleAssigneeChange function from props
  };

  return (
    <div className="relative font-inter text-sm w-[162px]">
      <select
        value={selectedValue}
        onChange={handleOptionChange}
        className="w-full md:w-[162px] h-[45px] border border-[#BCBCBC] rounded-[25px] px-[40px] py-[10px] text-[#009379]  font-inter text-sm appearance-none"
        style={{fontWeight: 600,fontSize: '12px',lineHeight: '14.52px',letterSpacing: '-2%',}}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedValue && (
        <img
          src={options.find(option => option.value === selectedValue).image}
          alt="Selected Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 md:mr-3 md:right-3"
          style={{ width: '25px', height: '25px', borderRadius: '12.5px' }}
        />
      )}
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 md:pr-8 pointer-events-none ml-2">
        <svg
          className="fill-current text-[#000000]"
          style={{ width: '15px', height: '15px' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-4-4h8l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomDropdown;
