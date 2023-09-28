import Head from 'next/head';
import Header from '../components/Example_Header';
import ExampleComponent from '../components/Example_Component_Basic';
import Selection from '../components/Component_Selection';
import Hero from '../components/Component_Hero';
import About from '../components/Component_About';
import Intro from '../components/Component_Intro';
import Skills from '../components/Component_Skills';
import Projects from '../components/Component_Projects';
import PortfolioSection from '../components/Section_Portfolio';
import SoftwareSection from '../components/Section_Software';
import ScrollSnapExample from '../components/Component_Test';
import WebgiViewer from '../components/Component_3D';
import { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls, Stage } from '@react-three/drei';
import BubbleComponent from '../components/Component_Bubbles';
import { Globals } from '../components/GlobalVariables';

const bgImage = '/background-image1.jpg';

export default function Home() {
  const scrollContainerRef = useRef(null);
  const { mobile } = useContext(Globals);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);

  // Custom mobile scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;

    const scale = 1;
    const minMovement = 50;
    let scrollStartPos = 0;
    let startY = 0;
    let currentScrollTop = 0;
    let deltaY = 0;

    const handleTouchStart = (e) => {
      deltaY = 0;
      startY = e.touches[0].clientY; // Record the position where the touch started
      scrollStartPos = container.scrollTop;
      currentScrollTop = container.scrollTop;
      setScrollActive(true);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      deltaY = (startY - e.touches[0].clientY) * scale; // scale is the scaling factor
      // container.scrollTop = currentScrollTop + deltaY;
    };

    const handleTouchEnd = () => {
      if (deltaY > minMovement) container.scrollTop = scrollStartPos + screenHeight;
      else if (deltaY < minMovement * -1) container.scrollTop = scrollStartPos - screenHeight;
      // const targetScrollTop = currentScrollTop + deltaY; // However you determine where to scroll to.
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true }); // passive true since we are not preventing default

    return () => {
      // Cleanup listeners when the component is unmounted
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollContainerRef, screenHeight]);

  // Add this useEffect to set the CSS variable on mount
  useEffect(() => {
    // Function to update the --viewport-height variable
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--viewport-height', `${vh}px`);
      const screenHeight = window.outerHeight;
      setScreenHeight(screenHeight);

      window.removeEventListener('resize', setViewportHeight);
    };

    // Set the initial value
    setViewportHeight();

    // Update the value whenever the window is resized
    window.addEventListener('resize', setViewportHeight);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      if (window && typeof window.removeEventListener === 'function') {
        window.removeEventListener('resize', setViewportHeight);
      }
    };
  }, [mobile]); // Empty dependency array means this useEffect runs once when the component mounts

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop; // Adjust this value if needed
      if (scrollTop !== scrollPosition) {
        setScrollPosition(scrollTop);
        // console.log('ScrollPosition: ', scrollTop);
      }
    };

    // Attach the event listener to the scrolling container
    scrollContainerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      scrollContainerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition, scrollContainerRef]);

  return (
    <div className="">
      <div className="absolute w-full h-screen overflow-y-hidden overflow-x-hidden" style={{ pointerEvents: 'none' }}>
        <WebgiViewer
          className={'h-screen w-full overflow-y-hidden overflow-x-hidden'}
          scrollPosition={scrollPosition}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <BubbleComponent />
      <div
        className={`h-screen overflow-x-hidden overflow-y-scroll scroll-smooth snap-y snap-mandatory`}
        ref={scrollContainerRef}
      >
        <div
          className="fixed top-0 left-0 w-full h-full object-cover -z-50"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <Head>
          <title>Example project</title>
          <meta name="description" content="template by Mark Wierzimok" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header scrollPosition={scrollPosition} />
        <div className="scroll-section">
          <div className="snap-start h-screen hero-section">
            <Hero />
            <Intro />
          </div>
          <div className="snap-center skills-section">
            <Skills />
          </div>
          <div className="snap-center software-section">
            <SoftwareSection />
          </div>
          <div className="snap-center portfolio-section">
            <PortfolioSection />
          </div>
          <div className="snap-start about-section">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}
