import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export function OtherPage() {
    return (
        <Container>Some other page.</Container>
    );
}