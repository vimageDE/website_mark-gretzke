import { useState } from 'react';
import projects from '../constants/projects.json';
import { motion } from 'framer-motion';
import PortfolioShowcase from './Component_PortfolioShowcase';
import {
  AnimatedSvgMask,
  ImageWithMask,
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
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);
  const [hoverScale, setHoverScale] = useState({});

  const handleMetadataLoaded = (event) => {
    setVideoWidth(event.target.videoWidth);
    setVideoHeight(event.target.videoHeight);
  };

  const project = projects[activeTopic][activeProject];

  return (
    <div className="portfolio-container h-screen w-screen bg-black bg-opacity-80 text-white text-center py-16">
      <div className="pt-12">
        <h2 className="text-white text-6xl">Projects</h2>
        <div className="mb-6">a small overview of the last 10 years</div>
      </div>

      <div className="topics flex items-center justify-center">
        {Object.keys(projects).map((topic) => (
          <motion.button
            key={topic}
            onClick={() => {
              setActiveTopic(topic);
              setActiveProject(0);
            }}
            className={`w-32 text-lg ${topic === activeTopic ? 'text-gold font-black' : 'text-white'}`}
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
      </div>
      <div className="mx-64 relative h-4/6 flex items-center">
        {/* Text */}
        <div className="w-3/5 flex flex-col justify-center pl-16">
          {/* Title */}
          <h2 className="text-6xl text-white">{project.title}</h2>
          {/* Description */}
          <motion.p className="px-16 text-left text-lg">{project.description}</motion.p>
        </div>
        {/* Projects */}
        <div className="">
          <AnimatedSvgMask project={project} />
        </div>
        {/* <PortfolioShowcase project={project} /> */}
      </div>
      <div className="dots-container flex justify-center mb-4">
        {projects[activeTopic].map((_, index) => (
          <motion.span
            key={index}
            className={`mx-2 dot p-3 rounded-full cursor-pointer ${
              index === activeProject ? 'bg-gold' : 'bg-white opacity-50'
            }`}
            onClick={() => setActiveProject(index)}
            whileHover={{ scale: 1.5 }}
            transition={{ ease: 'backOut' }}
          ></motion.span>
        ))}
      </div>
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
