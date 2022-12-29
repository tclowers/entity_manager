import React from 'react';
import styled from 'styled-components';
import { useFieldsContext } from '../../contexts/fields-context';


const Container = styled.input.attrs({ type: "text" })`
  width: 100%;
  font-size: 0.9em;
`;

const Select = styled.select`
  // width: 50%;
  height: 1.2em;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 0.8em;
  border: none;
  margin-left: 10px;
  margin-right: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 1.9em;
    padding: 0px 1px 1px;Select
  }
`;

interface Props {
    idx: number;
    label: string;
    options: SelectProps[];
}

interface SelectProps {
  label: string;
  value: string;
}

export function FieldClass({ idx, options }: Props) {  

  const { state, dispatch } = useFieldsContext();

  const fieldClass = state.fields[idx].fieldClass

  const onClassUpdate= (event:any) => {
      dispatch({ type: 'changeClass', fieldClass: event.target.value, idx: idx});
    };

  return <Select value={fieldClass} onChange={onClassUpdate}>
      {options.map(({ label, value }: SelectProps, i: number) => {
        return (
            <option value={label} key={i}>{label}</option>
        );
      })}
  </Select>
}
