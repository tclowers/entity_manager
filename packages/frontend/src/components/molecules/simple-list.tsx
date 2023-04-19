import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const ListItem = styled.li`
  cursor: pointer;
`;

const List = styled.ul`
  color: black;
  list-style: none;
  padding: 0;
`;

export interface Props {
    elements: any;
}


export const SimpleList = ({ elements }: Props) => {

    const items = Object.entries(elements).map(([key, value]) => {
        return {
            "key": key,
            "val": value,
        }
    })

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          {item.key}: {String(item.val)}
        </ListItem>
      ))}
    </List>
  )
};