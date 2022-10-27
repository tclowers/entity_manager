import React from 'react';
import styled from 'styled-components';
import { useState } from "react";

const Container = styled.input.attrs({ type: "text" })`
  width: 50%;
  font-size: 0.9em;
`;

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

interface Props {
  name: string;
}

export function TextInput({ name }: Props) {
  const [inputValue, setInputValue] = useState(name);

  return <Input value={inputValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)} />;
}
