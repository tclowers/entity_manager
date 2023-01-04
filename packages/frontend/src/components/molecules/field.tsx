import React from 'react';
import styled from 'styled-components';
import { FieldName } from '../atoms/field-name';
import { FieldType } from '../atoms/field-type';
import { FieldClass } from '../atoms/field-class';
import { FieldValueFunction } from '../atoms/field-value-function';



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
  {label:"STRING", id:"1"},
  {label:"INTEGER",id:"2"},
  {label:"POUNDS", id:"3"},
  {label:"SQFOOT", id:"4"},
  {label:"DOLLAR",id:"5"}
]

const classOptions = [
  {label:"REQUIRED", value:"1"},
  {label:"OPTIONAL",value:"2"},
  {label:"DERIVED", value:"3"}
]


export function Field({ idx, name, type, fieldClass, valueFunction }: Props) {
  
  return (
    <Container>
      <FieldName idx={idx}/>
      <FieldType idx={idx} label="Type" options={typeOptions} />
      <FieldClass idx={idx} label="Class" options={classOptions} />
      { fieldClass == "DERIVED" && <FieldValueFunction idx={idx} />}
    </Container>
  );
}
