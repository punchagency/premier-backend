import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  name: string;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, placeholder, name }) => {
  return (
    <PhoneInput
      country={'ae'} // Default to UAE
      value={value}
      onChange={onChange}
      name={name}
      placeholder={`${placeholder ?? "Phone Number"} `}
      inputStyle={{
        width: '100%',
        height: '3.177vw',
        padding: '1.042vw',
        paddingLeft: '3.042vw',
        borderRadius: '0.833vw',
        border: '1px solid #E8EBEF',
        fontSize: '1rem',
      }}
      buttonStyle={{
        border: '1px solid #E8EBEF',
        borderRight: '1px solid #E8EBEF',
        borderRadius: '0.833vw 0 0 0.833vw',
        backgroundColor: 'white',
        paddingLeft: '0.642vw',
      }}
      dropdownStyle={{
        width: 'max-content',
        borderRadius: '0.833vw',
      }}
    />
  );
};

export default CustomPhoneInput;