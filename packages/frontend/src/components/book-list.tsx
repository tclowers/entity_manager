import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { query } from '../graphql/books';
import { Book, Props as BookProps } from './book';
import { Spinner } from './spinner';

const Container = styled.div`
    width: 60%;
`;

const Title = styled.h2`
    margin-bottom: 0.5em;
`;

export function BookList() {
    const { loading, error, data } = useQuery(query);

    if (loading) return (<Spinner />);
    if (error) return (<Container>Error! {error.message}</Container>);

    const listItems: React.FC[] = data.books.map(
        ({ author, title }: BookProps, i: number) => <Book author={author} title={title} key={i} />
    );

    return (
        <Container>
            <Title>Books:</Title>
            {listItems}
        </Container>
    );
}