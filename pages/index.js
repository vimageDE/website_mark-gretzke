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

const bgImage = '/background-image1.jpg';

export default function Home() {
  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full object-cover -z-50"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <Head>
        <title>Example project</title>
        <meta name="description" content="template by Mark Wierzimok" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Intro />
      <Skills />
      {/*<SoftwareSection />
      <PortfolioSection />
  <About />*/}
    </div>
  );
}
