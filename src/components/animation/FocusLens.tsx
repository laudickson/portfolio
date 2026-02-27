import styled from '@emotion/styled';
import { Link } from '../Atoms';

export const FocusLens = styled(Link)`
    text-shadow: 0px 0px 4px black;
    color: black;

    &:hover {
        animation: focusLens 0.8s forwards ease-in-out;
    }

    @keyframes focusLens {
        25% {
            color: transparent;
        }
        50% {
            text-shadow: 0px 0px 8px #eaeaea;
        }
        100% {
            text-shadow: 0px 0px 4px #eaeaea;
            color: black;
        }
    }
`;
