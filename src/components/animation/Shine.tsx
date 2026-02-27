import styled from '@emotion/styled';
import { Link } from '../Atoms';

export const Shine = styled(Link)`
    position: relative;
    text-shadow: 0 0 8px silver;
    background-position: 0;
    background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: shine 3s infinite linear;
    transition: text-shadow 0.4s ease-out;

    &:hover {
        text-shadow: 0 0 1px white;
    }

    &::before,
    &::after {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        content: '';
        opacity: 0;
        transition:
            opacity 0.3s,
            transform 0.5s;
    }

    &::before {
        top: 0;
        transform: translateX(-20px);
    }

    &::after {
        bottom: 0;
        transform: translateX(20px);
    }

    &:hover::before,
    &:hover::after {
        opacity: 1;
        transform: translateX(0px);
    }

    @keyframes shine {
        0% {
            background-position: 0;
        }
        100% {
            background-position: 320px;
        }
    }
`;
