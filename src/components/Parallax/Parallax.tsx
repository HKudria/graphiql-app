import imageOne from '../../assets/bg_1.jpg';
import imageTwo from '../../assets/bg_2.png';
import imageThree from '../../assets/bg_3.png';
import { useState, useEffect, ReactNode } from 'react';
import './Parallax.scss';

type MousePosition = {
  x: number;
  y: number;
};

type ParallaxProps = {
  color: ParallaxColor;
  children: ReactNode;
};

type ParallaxColor = 'light' | 'dark';

export default function Parallax({ color = 'light', children }: ParallaxProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: { clientX: number; clientY: number }) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxClassName = `layer parallax__${color}`;

  const layerTopStyle =
    color === 'dark'
      ? {
          backgroundColor: 'rgba(10, 13, 63, 0.7)',
        }
      : {};

  return (
    <div className="parallax">
      <div
        className="layer back"
        style={{
          backgroundImage: `url(${imageOne})`,
        }}
      ></div>
      <div
        className="layer base"
        style={{
          backgroundImage: `url(${imageTwo})`,
          transform: `translate(-${mousePosition.x / 70}px, -${mousePosition.y / 70}px)`,
        }}
      ></div>
      <div
        className="layer logotypes"
        style={{
          backgroundImage: `url(${imageThree})`,
          transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
        }}
      ></div>
      <div className={parallaxClassName} style={layerTopStyle}></div>
      {children}
    </div>
  );
}