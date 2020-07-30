import React from 'react';
import logo from '../../logo.svg';
import styled, { keyframes } from 'styled-components';

const logoSpin = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

const LogoImage = styled.img`
    height: 40vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${logoSpin} infinite 20s linear;
    }
`;

export function Logo() {
    return (
        <LogoImage src={logo} className="App-logo" alt="logo" />
    );
}