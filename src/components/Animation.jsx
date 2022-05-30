import styled from 'styled-components';
import { useState, useEffect } from 'react';
const MainImgContainer = styled.div`
  width: 100vw;
  height: 400vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const AnimationImg = styled.img.attrs((props) => ({ src: props.src }))`
  position: absolute;
  top: 0;
  object-fit: cover;
  transform: scale(${({ zoom }) => zoom});
  transform-origin: 49% 50%;
`;
const Animation = () => {
  //Scroll positionu yakalamami sagliyor.
  const [scrollPosition, setScrollPosition] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position);
  };

  const handleZoom = () => {
    if (scrollPosition >= 2000 && scrollPosition <= 2300 && handleScroll) {
      setZoom(zoom - 0.01);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleZoom();
  }, [scrollPosition]);

  return (
    <MainImgContainer>
      <AnimationImg
        zoom={zoom}
        src="https://web.archive.org/web/20200514180121im_/https://www.rino-pelle.com/wp-content/uploads/2020/03/instagram-tile-4.jpg"
      />
    </MainImgContainer>
  );
};

export default Animation;
