import React from 'react';
import styled from 'styled-components';
import { useState } from "react";

const Container = styled.input.attrs({ type: "text" })`
  width: 100%;
  font-size: 0.9em;
`;

const Select = styled.select`
  // width: 50%;
  height: 1.9em;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 1em;
  border: none;
  margin-left: 10px;
  margin-right: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 1.9em;
    padding: 0px 2px 1px;Select
  }
`;

interface Props {
  label: string;
  initialValue: string;
  options: SelectProps[];
}

interface SelectProps {
  label: string;
  value: string;
}

export function SelectInput({ label, options, initialValue }: Props) {
  console.log("\n\n label: %s\n\n", label)
  
  const [inputValue, setInputValue] = useState(initialValue);

  console.log("\n\n initialValue: %s\n\n", initialValue)
  console.log("\n\n inputValue: %s\n\n", inputValue)

  return <Select value={inputValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)}>
      {options.map(({ label, value }: SelectProps, i: number) => {
        return (
            <option value={label} key={i}>{label}</option>
        );
      })}
  </Select>
}
