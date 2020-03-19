import React from "react";
import styled from "styled-components";

const SInput = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

interface IProps {
  placeholder: string;
  onChange: React.ChangeEventHandler;
  value: string;
  required?: boolean;
  type?: string;
  className?: string;
}

const Input: React.FC<IProps> = ({
  placeholder,
  value,
  onChange,
  required = true,
  type = "text",
  className
}) => (
  <SInput
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    className={className}
  />
);

export default Input;
