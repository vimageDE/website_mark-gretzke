import Head from 'next/head';
import Header from '../components/Example_Header';
import ExampleComponent from '../components/Example_Component_Basic';
import Selection from '../components/Component_Selection';
import Hero from '../components/Component_Hero';
import About from '../components/Component_About';
import Intro from '../components/Component_Intro';
import Skills from '../components/Component_Skills';
import Projects from '../components/Component_Projects';
import PortfolioSection from '../components/Component_PortfolioSection';
import SoftwareSection from '../components/Section_Software';
import ScrollSnapExample from '../components/Component_Test';
import WebgiViewer from '../components/Component_3D';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls, Stage } from '@react-three/drei';

const bgImage = '/background-image1.jpg';

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop; // Adjust this value if needed
      if (scrollTop !== scrollPosition) {
        setScrollPosition(scrollTop);
        console.log('ScrollPosition: ', scrollTop);
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
    <div>
      <div className="absolute w-full h-screen overflow-y-hidden overflow-x-hidden" style={{ pointerEvents: 'none' }}>
        <WebgiViewer
          className={'h-screen w-full overflow-y-hidden overflow-x-hidden'}
          scrollPosition={scrollPosition}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <div
        className="h-screen overflow-x-hidden overflow-y-scroll snap-y scroll-smooth snap-mandatory"
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
        <div className="">
          <div className="snap-start">
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
