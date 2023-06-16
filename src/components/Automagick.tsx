import * as React from 'react';
import styled from "@emotion/styled";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pictures } from '../images/Pictures';

const Mural = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 60px;
  width: 2700px;
  flex-wrap: wrap;

  img {
    border: 1px solid black;
  }
`;

const Veil = styled.div<{ color: string }>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 60px;
  z-index: 1;
  background-color: ${props => props.color};
  opacity: 0.42;

  @media screen and (max-width:500px) {
    left: 0;
  }
`;

export const Automagick = () => {
  const shuffled = Pictures
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const visible = shuffled.slice(0, 40);
  // const invisible = shuffled.slice(40, shuffled.length);

  return (
    <>
      <Veil color='#cccccc' />
      <Veil color='black' />
      <Mural>
        { visible.map(picture =>
          <LazyLoadImage
          src={ picture.image }
          key={ picture.id }
          width='270px'
          height='360px'
        />
        )}
      </Mural>
    </>
  );
};
