import React from 'react';
import styled from 'styled-components';
import { useResourceContext } from '../../contexts/resource-context';

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  font-size: 0.8em;
  border: 2px solid;
  border-radius: 3px;
  width: 20%;
  align-self: flex-start;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

interface Props {
    fieldID?: string;
    size?: number;
}

export function NumericInput({ fieldID, size }: Props) {
    const { state, dispatch } = useResourceContext();
  
    const onValueUpdate= (event:any) => {
      dispatch({ type: 'CHANGE_FIELD_VALUE', field_value: event.target.value, field_id: fieldID});
    };
  
    const fieldVal = state.fields[String(fieldID)];
  
  
    return <Input value={fieldVal} size={size} onChange={onValueUpdate} />;
  }
