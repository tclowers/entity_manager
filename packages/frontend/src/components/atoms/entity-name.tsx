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
  border: 0;
  border-bottom: 2px solid;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// interface Props {
//   idx: number;
// }

export function EntityName() {
    const { state, dispatch } = useEntityContext();

    const name = state.name

    const onTextUpdate= (event:any) => {
        dispatch({ type: 'changeEntityName', name: event.target.setInputValue});
      };

  return <Input value={name} onChange={onTextUpdate} />;
}
