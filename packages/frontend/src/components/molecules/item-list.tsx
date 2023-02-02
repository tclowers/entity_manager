import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const ListItem = styled.li`
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const List = styled.ul`
  color: black;
  list-style: none;
  padding: 0;
`;

export interface Props {
    items: any[];
}


export const ItemList = ({ items }: Props) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} onClick={() => handleClick(item.url)}>
          {item.name}
        </ListItem>
      ))}
    </List>
  )
};
