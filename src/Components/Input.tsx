import React from "react";
import styled from "styled-components";
import { TTheme } from "../styles/theme";

interface ISprops {
  theme: TTheme;
}

const SInput = styled.input`
  border: 0;
  border-radius: ${(props: ISprops) => props.theme.borderRadius};
  background-color: ${(props: ISprops) => props.theme.bgColor};
  height: 35px;
  font-size: ${(props: ISprops) => props.theme.searchFontSize};
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
