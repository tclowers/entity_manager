import React from 'react';
import styled from 'styled-components';
import { useBooks } from '../../api/books';
import { ApiAction } from '../../api/common';
import { Field, Props as FieldProps } from '../molecules/field';
import { Spinner } from '../atoms/spinner';

import { useState } from 'react';


const Container = styled.div`
  padding: 1em, 5%;
`;

const Title = styled.h2`
  margin-bottom: 0.5em;
`;

const List = styled.ul`
  list-style: none;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: "white";
  color: "palevioletred";

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

type FieldItem = {
  name: string,
  type: string,
  fieldClass: string,
  valueFunction: string
}

type FieldState = {
  fields: FieldItem[]
}
const initialState = {
  fields: [ 
    {"name": "item", "type": "STRING", "fieldClass":"REQUIRED", "valueFunction":""},
    {"name": "value", "type": "INTEGER", "fieldClass":"OPTIONAL", "valueFunction":""},
    {"name": "weight", "type":"POUNDS", "fieldClass":"DERIVED", "valueFunction":"value*1.17"}
  ]
}

const addField = (fieldList: FieldItem[]) => {
  return [
    ...fieldList,
    {"name": "", "type":"", "fieldClass":"", "valueFunction":""}
  ]
}

type FieldAction =
//  | { type: 'success', results: HNResponse }
//  | { type: 'failure', error: string }
 | { type: 'addField' };

function reducer(state: FieldState, action: FieldAction) {
  switch (action.type) {
    case 'addField':
      return { ...state, fields: addField(state.fields) };
    default:
      throw new Error();
  }
}



export function FieldList() {

  // const [fieldData, setFields] = useState(initialState.fields);

  // const onAddBtnClick = (event:any) => {
  //   setFields(addField(fieldData));
  // };

  // let fields = fieldData.map(({ name, type, fieldClass, valueFunction }: FieldProps, i: number) => {
  //   return (
  //     <li key={i}>
  //       <Field name={name} type={type} key={i} fieldClass={fieldClass} valueFunction={valueFunction} />
  //     </li>
  //   );
  // })

  const [state, dispatch] = React.useReducer(reducer, initialState);

  // onClick={() => dispatch({ type: UPDATE_USER, username: "Vimalraj" })}

  const onAddBtnClick = (event:any) => {
    dispatch({ type: "addField"});
  };

  let fields = state.fields.map(({ name, type, fieldClass, valueFunction }: FieldProps, i: number) => {
    return (
      <li key={i}>
        <Field name={name} type={type} key={i} fieldClass={fieldClass} valueFunction={valueFunction} />
      </li>
    );
  })

  const FieldsContext = React.createContext({});

//   if (loading) return <Spinner />;
//   if (error) return <Container>Error! {error.message}</Container>;

  return (
    <FieldsContext.Provider value={{ state, dispatch }}>
      <Container>
        <Title>Fields:</Title>
        <List>
          {fields}
        </List>
        <Button onClick={onAddBtnClick}>+</Button>
      </Container>
    </FieldsContext.Provider>
  );
}
