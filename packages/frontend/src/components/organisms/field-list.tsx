import React, {useContext} from 'react';
import styled from 'styled-components';
import { useBooks } from '../../api/books';
import { ApiAction } from '../../api/common';
import { Field, Props as FieldProps } from '../molecules/field';
import { Spinner } from '../atoms/spinner';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFieldsContext } from '../../contexts/fields-context';



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

export function FieldList() {

  const { state, dispatch } = useFieldsContext();

  const onAddBtnClick = (event:any) => {
    dispatch({ type: 'addField'});
  };

  let fields = state.fields.map(({ name, type, fieldClass, valueFunction }: FieldProps, i: number) => {
    return (
      <li key={i}>
        <Field name={name} type={type} idx={i} fieldClass={fieldClass} valueFunction={valueFunction} />
      </li>
    );
  })

//   if (loading) return <Spinner />;
//   if (error) return <Container>Error! {error.message}</Container>;

  return (
    <Container>
      <Title>Fields:</Title>
      <List>
        {fields}
      </List>
      <Button onClick={onAddBtnClick}>+</Button>
    </Container>
  );
}
