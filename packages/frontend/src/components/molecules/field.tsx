import React from 'react';
import styled from 'styled-components';
import { FieldName } from '../atoms/field-name';
import { TextInput } from '../atoms/text-input';
import { SelectInput } from '../atoms/select-input';

const Container = styled.div`
  width: 100%;
  padding: 0.5em 0;
  margin: 0.8em 0;
  border: solid 1px #ffffff;
`;

export interface Props {
  idx: number;
  name: string;
  type: string;
  fieldClass: string;
  valueFunction: string;
}

const typeOptions = [ 
  {label:"STRING", value:"1"},
  {label:"INTEGER",value:"2"},
  {label:"POUNDS", value:"3"},
  {label:"SQFOOT", value:"4"},
  {label:"DOLLAR",value:"5"}
]

const classOptions = [
  {label:"REQUIRED", value:"1"},
  {label:"OPTIONAL",value:"2"},
  {label:"DERIVED", value:"3"}
]


export function Field({ idx, name, type, fieldClass, valueFunction }: Props) {
  console.log("field key value: ", idx.toString())

  return (
    <Container>
      <FieldName idx={idx}/>
      <SelectInput label="Type" options={typeOptions} initialValue={type} />
      <SelectInput label="Class" options={classOptions}  initialValue={fieldClass} />
      { fieldClass == "DERIVED" && <TextInput name={valueFunction} />}
    </Container>
  );
}
