import React from 'react';
import styled from 'styled-components';
import { useEntityContext } from '../../contexts/entity-context';


const Container = styled.input.attrs({ type: "text" })`
  font-size: 0.9em;
`;

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "0.2em",
}))`
  font-size: 0.8em;
  border: 2px solid;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

interface Props {
  idx: number;
}

export function FieldValueFunction({ idx }: Props) {
    const { state, dispatch } = useEntityContext();

    const name = state.fields[idx].valueFunction

    const onTextUpdate= (event:any) => {
        dispatch({ type: 'changeValueFunction', valueFunction: event.target.value, idx: idx});
      };

  return <Input value={name} onChange={onTextUpdate} />;
}
