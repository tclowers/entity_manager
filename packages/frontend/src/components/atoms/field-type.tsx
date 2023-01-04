import React from 'react';
import styled from 'styled-components';
import { useEntityContext } from '../../contexts/entity-context';


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
    padding: 0px 2px 1px;Select
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

export function FieldType({ idx, options }: Props) {  

  const { state, dispatch } = useEntityContext();

  const fieldType = state.fields[idx].type

  const onTypeUpdate= (event:any) => {
      dispatch({ type: 'changeType', fieldType: event.target.value, idx: idx});
    };

  return <Select value={fieldType} onChange={onTypeUpdate}>
      {options.map(({ label, value }: SelectProps, i: number) => {
        return (
            <option value={label} key={i}>{label}</option>
        );
      })}
  </Select>
}
