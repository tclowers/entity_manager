import React from 'react';
import styled from 'styled-components';
import { useResourceContext } from '../../contexts/resource-context';


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
    fieldID?: string;
    name?: string;
    size?: number;
}

export function StringInput({ fieldID, name, size }: Props) {
  const { state, dispatch } = useResourceContext();

  const onTextUpdate= (event:any) => {
    dispatch({ type: 'CHANGE_FIELD_VALUE', field_value: event.target.value, field_id: fieldID});
  };

  const fieldVal = state.fields[String(fieldID)];


  return <Input value={fieldVal} size={size} onChange={onTextUpdate} />;
}
