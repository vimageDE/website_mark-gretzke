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
import { useRef } from 'react';

const bgImage = '/background-image1.jpg';

export default function Home() {
  const scrollContainerRef = useRef(null);

  return (
    <div className="h-screen overflow-y-scroll snap-y scroll-smooth" ref={scrollContainerRef}>
      <div
        className="fixed top-0 left-0 w-full h-full object-cover -z-50"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <Head>
        <title>Example project</title>
        <meta name="description" content="template by Mark Wierzimok" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header scrollContainer={scrollContainerRef} />
      <div className="">
        <div className="snap-start">
          <Hero />
          <Intro />
        </div>
        <div className="snap-center">
          <Skills />
          <SoftwareSection />
        </div>
        <div className="snap-center">
          <PortfolioSection />
        </div>
        <div className="snap-start">
          <About />
        </div>
      </div>
    </div>
  );
}
