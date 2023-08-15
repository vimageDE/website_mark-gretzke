import { useState } from 'react';
import projects from '../constants/projects.json';

export default function PortfolioSection() {
  const [hover, setHover] = useState(false);
  // Define state to track the currently active topic and project
  const [activeTopic, setActiveTopic] = useState('Animation');
  const [activeProject, setActiveProject] = useState(0); // Using index here

  const project = projects[activeTopic][activeProject];

  return (
    <div className="portfolio-container bg-black bg-opacity-80 text-white text-center py-16">
      <div className="pt-12">
        <h2 className="text-white text-6xl">Projects</h2>
        <div className="">a small selection</div>
      </div>

      <div className="topics min-h-[45px] flex items-center justify-center">
        {Object.keys(projects).map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setActiveTopic(topic);
              setActiveProject(0);
            }}
            className={`w-32 hover:text-xl ${topic === activeTopic ? 'text-gold' : 'text-white'}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="dots-container flex justify-center mb-4">
        {projects[activeTopic].map((_, index) => (
          <span
            key={index}
            className={`dot mx-1 p-2 rounded-full cursor-pointer ${
              index === activeProject ? 'bg-gold' : 'bg-white opacity-50'
            }`}
            onClick={() => setActiveProject(index)}
          ></span>
        ))}
      </div>

      <div className="projects-carousel flex justify-center">
        <button
          className="w-28 h-12 bg-white rounded-full m-8 text-black my-auto font-black"
          onClick={() => setActiveProject((prev) => (prev + 1) % projects[activeTopic].length)}
        >
          Previous
        </button>

        <div
          key={project.title}
          className={`project-slide active relative`}
          style={{ width: '100vw', maxWidth: '1400px', height: '37vw' }} // Maintaining 21:9 aspect ratio
        >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
            src={'/projects/' + project.media}
            alt={project.title}
            autoPlay
            loop
            muted
          ></video>

          <div
            className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black to-transparent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h2 className="text-6xl text-white">{project.title}</h2>
            <p className={`px-64 ${hover ? 'block' : 'hidden'}`}>{project.description}</p>
          </div>
        </div>
        <button
          className="w-28 h-12 bg-white rounded-full m-8 text-black my-auto font-black"
          onClick={() =>
            setActiveProject((prev) => (prev - 1 + projects[activeTopic].length) % projects[activeTopic].length)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
