import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    padding: 0.5em 0;
    margin: 0.8em 0;
    border: solid 1px #ffffff;
`;

const Title = styled.div`
    width: 100%;
    font-size: 1.1em;
`;

const Author = styled.div`
    width: 100%;
    font-size: 0.9em;
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