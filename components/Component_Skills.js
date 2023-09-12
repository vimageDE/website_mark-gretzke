import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function Skill({ title, content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px 0px 0px' });
  const [currentValues, setCurrentValues] = useState({});

  useEffect(() => {
    const intervals = {};

    if (isInView) {
      Object.keys(content).forEach((key) => {
        intervals[key] = setInterval(() => {
          setCurrentValues((prevValues) => {
            const prevValue = prevValues[key] || 10;
            if (prevValue < content[key]) {
              return { ...prevValues, [key]: prevValue + 1 };
            } else {
              clearInterval(intervals[key]);
              return prevValues;
            }
          });
        }, 15);
      });
    } else {
      // Reset the values when not in view
      setCurrentValues({});
    }

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [isInView, content]);

  return (
    <div className="flex flex-col justify-center" ref={ref}>
      <h2 className="text-xl">{title}</h2>
      <div>
        {Object.keys(content).map((topic) => (
          <div className="text-xl" key={topic}>
            {topic} {currentValues[topic] || 0}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="bg-black h-screen w-full bg-opacity-80 text-white text-center flex justify-center">
      <div className="my-auto">
        <h2 className="text-6xl pb-8 text-center">Skills</h2>
        <div className="grid grid-cols-4 gap-32 items-start">
          <Skill
            title="Animation"
            content={{
              'Product Rendering': 95,
              Commercials: 90,
              VFX: 95,
            }}
          />
          <Skill
            title="Gamedev"
            content={{
              Gamedesign: 85,
              Coding: 90,
              Visuals: 80,
            }}
          />
          <Skill
            title="Blockchain"
            content={{
              Contracts: 70,
              Tests: 85,
              Frontend: 90,
            }}
          />
          <Skill
            title="Webdev"
            content={{
              Backend: 80,
              Coding: 85,
              'UX/UI': 85,
            }}
          />
        </div>
      </div>
    </div>
  );
}
