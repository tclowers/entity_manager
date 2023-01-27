import React, {useContext} from 'react';
import styled from 'styled-components';
import { StringInput } from '../atoms/string-input';
import { NumericInput } from '../atoms/numeric-input';
import { useResourceContext } from '../../contexts/resource-context';
import { EntityField } from '../../models/entity-field';
import { ApiAction } from '../../api/common';
import { useEntities } from '../../api/entities';
import { Spinner } from '../atoms/spinner';
import { FieldTypes } from '../../constants/field_types';
import { FieldClasses } from '../../constants/field_classes';
import { createResource } from '../../api/resources';



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
  color: black;
`;

const ListItem = styled.li`
  display: flex;
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

const FieldLabel = styled.span`
  width: 70%;
  align-self: center;
`;

export function CreateResource() {
  const entityID = '42f9856c-dcff-4c41-a0ef-28190b403110';

  const [{ data, loading, error }, refetch] = useEntities(ApiAction.Read, entityID);

  if (loading) return <Spinner />;
  if (error) return <Container>Error! {error.message}</Container>;

  const { state, dispatch } = useResourceContext();

  const saveResource = (event:any) => {
    console.log("saving resource: ", state);
    createResource(state);
  };

  console.log("data: ", data)

  let fields = data.fields
    .filter(({field_class_id}:EntityField) => field_class_id != FieldClasses.Derived) // prevent user input for derived fields
    .map(({ id, name, field_type_id }: EntityField, i: number) => {
      // Add the correct input field based on field type
      let inputType = <NumericInput fieldID={id} />
      if (field_type_id == FieldTypes.String) {
        inputType = <StringInput fieldID={id} />
      }

      // input field plus label
      return (
        <ListItem key={i}>
          <FieldLabel>{name}</FieldLabel>
          {inputType}
        </ListItem>
      );
    }
  )

  return (
    <Container>
      <TitleRow>
        <Title>Create {data.name}</Title>
      </TitleRow>
      <List>
        {fields}
      </List>
      <Button onClick={saveResource}>Save {data.name}</Button>
    </Container>
  );
}
