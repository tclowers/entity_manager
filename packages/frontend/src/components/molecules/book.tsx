import React from 'react';
import styled from 'styled-components';
import { Title } from '../atoms/title';
import { Author } from '../atoms/author';


const Container = styled.div`
    width: 100%;
    padding: 0.5em 0;
    margin: 0.8em 0;
    border: solid 1px #ffffff;
`;

export interface Props {
    author: string;
    title: string;
}

export function Book({ author, title }: Props) {
    return (
        <Container>
            <Title>{title}</Title>
            <Author>by {author}</Author>
        </Container>
    );
}