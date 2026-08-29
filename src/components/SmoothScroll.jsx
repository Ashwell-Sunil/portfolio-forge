import React from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

/**
 * SmoothScroll
 * Global wrapper providing smooth inertia scrolling via Lenis.
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
