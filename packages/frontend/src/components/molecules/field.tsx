import React from 'react';
import styled from 'styled-components';
import { FieldName } from '../atoms/field-name';
import { FieldType } from '../atoms/field-type';
import { FieldClass } from '../atoms/field-class';
import { FieldValueFunction } from '../atoms/field-value-function';
import { FieldTypes } from '../../constants/field_types';
import { FieldClasses } from '../../constants/field_classes';



const Container = styled.div`
  width: 100%;
  padding: 0.5em 0;
  margin: 0.8em 0;
  border: solid 1px #ffffff;
`;

export interface Props {
  idx: number;
  field_class_id: string;
}

const typeOptions = [ 
  {label:"STRING", id:"1"},
  {label:"INTEGER",id:"2"},
  {label:"POUNDS", id:"3"},
  {label:"SQFOOT", id:"4"},
  {label:"DOLLAR",id:"5"}
]

const classOptions = [
  {label:"REQUIRED", id:"1"},
  {label:"OPTIONAL",id:"2"},
  {label:"DERIVED", id:"3"}
]


export function Field({ idx, field_class_id }: Props) {
  
  return (
    <Container>
      <FieldName idx={idx}/>
      <FieldType idx={idx} label="Type" options={typeOptions} />
      <FieldClass idx={idx} label="Class" options={classOptions} />
      { field_class_id == FieldClasses.Derived && <FieldValueFunction idx={idx} />}
    </Container>
  );
}
