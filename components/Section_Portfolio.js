import { useEffect, useState, useRef } from 'react';
import projects from '../constants/projects.json';
import { motion } from 'framer-motion';
import PortfolioShowcase from './Component_PortfolioShowcase';
import gsap from 'gsap';
import {
  AnimatedSvgMask,
  ImageWithMask,
  TestClip,
  VideoWithClipPath,
  VideoWithComplexClipPath,
  VideoWithCustomClipPath,
  VideoWithMask,
} from './Component_Test';

export default function PortfolioSection() {
  const [hover, setHover] = useState(false);
  // Define state to track the currently active topic and project
  const [activeTopic, setActiveTopic] = useState('Animation');
  const [activeProject, setActiveProject] = useState(0); // Using index here
  const [activeTitle, setActiveTitle] = useState('');
  const [activeDescr, setActiveDescr] = useState('');
  const [animActive, setAnimActive] = useState(false);

  const [hoverScale, setHoverScale] = useState({});
  const projectTitle = useRef(null);
  const projectDescr = useRef(null);
  const dotRefs = useRef([]);

  const [dotPressed, setDotPressed] = useState(false);

  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.075,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 35,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        // repeat: Infinity,
      },
    },
  };

  const project = projects[activeTopic][activeProject];

  useEffect(() => {
    const targetElement = dotRefs.current[activeProject];

    if (targetElement && !dotPressed) {
      const dotanim = gsap
        .timeline()
        .to(targetElement, {
          scale: 1.5,
          duration: 0.2,
        })
        .to(targetElement, {
          scale: 1,
          duration: 0.25,
        });
    }

    setDotPressed(false);

    if (animActive) return;

    const title = projectTitle.current;
    const descr = projectDescr.current;

    const switchAnim = gsap
      .timeline()
      .add(() => setAnimActive(true))
      .to(title, { x: 200, opacity: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power1.in' }) // Move right and fade out
      .to(descr, { x: 200, opacity: 0, filter: 'blur(10px)', duration: 0.5, delay: 0.2, ease: 'power1.in' }, '<')
      .set(title, { x: -200 }) // Instantly set to the left (no animation)
      .set(descr, { x: -200 })
      .add(() => {
        setActiveTitle(project.title);
        setActiveDescr(project.description);
        setAnimActive(false);
      })
      .to(title, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1.out' }) // Move to center and fade in
      .to(descr, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, delay: 0.2, ease: 'power1.out' }, '<');
  }, [activeTopic, activeProject]);

  return (
    <div className="portfolio-container relative h-screen w-screen bg-black bg-opacity-80 text-white text-center py-16 overflow-hidden">
      <div className="md:pt-12">
        <motion.h2
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{}}
          className="text-white hidden md:block text-6xl"
        >
          Projects
        </motion.h2>
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 hidden md:block"
        >
          a small overview of the last 10 years
        </motion.div>
      </div>

      <motion.div
        className="topics flex items-center justify-center flex-wrap gap-2 mb-4"
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
      >
        {Object.keys(projects).map((topic) => (
          <motion.button
            key={topic}
            onClick={() => {
              setActiveTopic(topic);
              setActiveProject(0);
            }}
            variants={itemVariants}
            className={`mx-2 md:mx-0 md:w-32 text-lg ${
              topic === activeTopic ? 'text-gold md:font-black' : 'text-white'
            }`}
            // whileHover={{ scale: 1.4 }}
            animate={{ scale: hoverScale[topic] }}
            onHoverStart={() => {
              setHoverScale((prev) => {
                return { ...prev, [topic]: 1.25 };
              });
            }}
            onHoverEnd={() =>
              setHoverScale((prev) => {
                return { ...prev, [topic]: 1 };
              })
            }
            transition={{ ease: 'backOut', duration: 0.2 }}
          >
            {topic}
          </motion.button>
        ))}
      </motion.div>
      <motion.div
        className="w-full h-5/6 md:h-[60%] flex flex-col md:flex-row justify-center items-center md:mt-12"
        initial={{ opacity: 0, filter: 'blur(5px)', y: 15, scale: 0.75 }}
        whileInView={{
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          transition: { delay: 0.25, duration: 0.75, ease: 'circOut' },
        }}
      >
        {/* Text */}
        <div className="md:w-1/2 md:ml-[5%] xl:ml-[15%]">
          {/* Title */}
          <h2 ref={projectTitle} className="text-4xl md:text-6xl text-white">
            {activeTitle}
          </h2>
          {/* Description */}
          <motion.p
            ref={projectDescr}
            className="md:no-scrollbar px-14 md:px-16 text-center md:text-left text-sm md:text-lg overflow-y-auto fade-out-scroll"
          >
            {activeDescr}
          </motion.p>
        </div>
        {/* Projects */}
        <div className="md:w-1/2 md:mr-[2%] xl:mr-[10%]">
          <div className="w-full h-full scale-75 md:scale-100 ">
            <TestClip project={project} />
          </div>
        </div>
        {/* <PortfolioShowcase project={project} /> */}
      </motion.div>

      <motion.div
        className="absolute bottom-20 md:bottom-28 right-0 left-0 dots-container flex justify-center mb-4"
        initial={{ opacity: 0, y: -0 }}
        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 1 } }}
      >
        {projects[activeTopic].map((_, index) => (
          <motion.span
            key={index}
            ref={(el) => (dotRefs.current[index] = el)}
            className={`mx-2 dot p-3 rounded-full cursor-pointer ${
              index === activeProject ? 'bg-gold' : 'bg-white opacity-50'
            }`}
            onClick={() => {
              setDotPressed(true);
              setActiveProject(index);
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ ease: 'backOut' }}
          ></motion.span>
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-12 right-0 left-0"
        initial={{ opacity: 0, y: -0 }}
        whileInView={{ y: 0, opacity: 1, transition: { delay: 1, duration: 1 } }}
      >
        <motion.button
          className="mt-4 py-3 px-6 md:py-4 md:px-8 bg-white rounded-full m-8 text-black my-auto font-black uppercase"
          onClick={() => {
            setActiveProject((prev) => (prev + 1) % projects[activeTopic].length);
          }}
          whileHover={{ scale: 1.25 }}
          transition={{ ease: 'backOut', duration: 0.2 }}
        >
          Next
        </motion.button>
      </motion.div>
      <div>
        {/* <button
          className="w-28 h-12 bg-white rounded-full m-8 text-black my-auto font-black"
          onClick={() => setActiveProject((prev) => (prev + 1) % projects[activeTopic].length)}
        >
          Previous
        </button>
        <button
          className="w-28 h-12 bg-white rounded-full m-8 text-black my-auto font-black"
          onClick={() =>
            setActiveProject((prev) => (prev - 1 + projects[activeTopic].length) % projects[activeTopic].length)
          }
        >
          Next
        </button> */}
      </div>
    </div>
  );
}
