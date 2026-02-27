import styled from '@emotion/styled';

export const Headshot = styled.div<{ img: string; appear: boolean; popOut: boolean; popIn: boolean }>`
    @media screen and (max-width: 500px) {
        display: none;
    }

    height: 80%;
    width: 30%;
    margin-right: 16px;
    opacity: ${(props) => (props.appear ? 0.6 : 0)};
    box-shadow:
        0 0 8px 40px white inset,
        0 0 0 0 grey;
    background-image: ${(props) => (props.img ? `url(${props.img})` : 'none')};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 40px;
    transition: opacity 2s ease-in;

    &.loaded {
        ${(props) =>
            props.popOut
                ? `
        animation: popout forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;

        @keyframes popout {
          0% { box-shadow: 0 0 8px 40px white inset, 0 0 0 0 grey; };
          50% { box-shadow: 0 0 0 0 white inset, 0 0 0 0px grey };
          100% {
            box-shadow: 0 0 0 0 white inset, 0 0 20px 2px grey;
            opacity: .8;
          };
        }
      `
                : ''}
        ${(props) =>
            props.popIn
                ? `
      animation: popin forwards;
      animation-duration: .5s;
      animation-timing-function: ease-out;

      @keyframes popin {
        0% { box-shadow: 0 0 0 0 white inset, 0 0 20px 2px grey; opacity: .8; };
        10% { box-shadow: 0 0 0 0 white inset, 0 0 0 0px grey };
        100% { box-shadow: 0 0 8px 40px white inset, 0 0 0 0 grey; };
      }
      `
                : ''}
    }
`;
