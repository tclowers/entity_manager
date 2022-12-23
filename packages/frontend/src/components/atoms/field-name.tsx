import React from 'react';
import styled from 'styled-components';
import { useContext } from "react";

const Container = styled.input.attrs({ type: "text" })`
  font-size: 0.9em;
`;

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  font-size: 0.8em;
  border: 2px solid;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

interface Props {
  name: string;
}

export function FieldName({ name }: Props) {
    // const { state, dispatch } = useContext(FieldsContext);


  // return <Input value={inputValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)} />;
  return <Input value="something" />;
}
