import React, {useContext} from 'react';
import styled from 'styled-components';
import { Field, Props as FieldProps } from '../molecules/field';
import { useEntityContext } from '../../contexts/entity-context';
import { EntityField } from '../../models/entity-field';
import { EntityName } from '../atoms/entity-name';
import { createEntity } from '../../api/entities';

const Container = styled.div`
  padding: 1em, 5%;
`;

const Title = styled.h2`
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  color: black;
`;

const List = styled.ul`
  list-style: none;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: "blue";
  color: "white";

  font-size: 1em;
  margin: 1em;white
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;justify-content: flex-start
  justify-content: flex-start;
`;

const SubTitle = styled.h2`
  font-size: 0.8em;
  color: black;
`;

export function CreateEntity() {

  const { state, dispatch } = useEntityContext();

  const onAddBtnClick = (event:any) => {
    dispatch({ type: 'addField'});
  };

  const saveEntity = (event:any) => {
    console.log("saving entity: ", state);
    createEntity(state);
  };

  let fields = state.fields.map(({ name, field_type_id, field_class_id, value_function }: EntityField, i: number) => {
    return (
      <li key={i}>
        <Field idx={i} field_class_id={field_class_id} />
      </li>
    );
  })

//   if (loading) return <Spinner />;
//   if (error) return <Container>Error! {error.message}</Container>;

  return (
    <Container>
      <TitleRow>
        <Title>Entity:</Title>
        <EntityName />
      </TitleRow>
      <SubTitle>Schema</SubTitle>
      <List>
        {fields}
      </List>
      <Button onClick={onAddBtnClick}>+ Field</Button>
      <SubTitle>Faces</SubTitle>
      <SubTitle>Events</SubTitle>
      <Button onClick={saveEntity}>Save Entity</Button>
    </Container>
  );
}
