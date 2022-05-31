import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import './Animation.css';

gsap.registerPlugin(ScrollTrigger);
gsap.set('.gridBlock', {
  backgroundImage: (i) =>
    `url(https://picsum.photos/${500}/${500}?random=${i})`,
});
const Animation = () => {
  const imageRef = useRef(null);
  useEffect(() => {
    const el = imageRef.current;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: document.querySelector('.grid-container'),
          start: 'top top',
          end: () => 400 * 4,
          scrub: true,
          pin: document.querySelector('.grid'),
          anticipatePin: 1,
        },
      })
      .set('.gridBlock:not(.centerBlock)', { autoAlpha: 0 })
      .to(
        '.gridBlock:not(.centerBlock)',
        { duration: 0.1, autoAlpha: 1 },
        0.001
      )
      .from('.gridLayer', {
        scale: 3.3333,
        ease: 'none',
      });
  }, []);
  return (
    <div className="grid-container">
      <div className="grid">
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer centerPiece">
          <div className="gridBlock centerBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
        <div className="gridLayer">
          <div className="gridBlock"></div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
