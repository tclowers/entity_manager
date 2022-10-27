import React from 'react';
import styled from 'styled-components';
import { TextInput } from '../atoms/text-input';
import { SelectInput } from '../atoms/select-input';

const Container = styled.div`
  width: 100%;
  padding: 0.5em 0;
  margin: 0.8em 0;
  border: solid 1px #ffffff;
`;

export interface Props {
  name: string;
  type: string;
}

const typeOptions = [ 
  {label:"STRING", value:"1"},
  {label:"INTEGER",value:"2"},
  {label:"POUNDS", value:"3"},
  {label:"SQFOOT", value:"4"},
  {label:"DOLLAR",value:"5"}
]


export function Field({ name, type }: Props) {
  return (
    <Container>
      <TextInput name={name} />
      <SelectInput options={typeOptions} />
    </Container>
  );
}
