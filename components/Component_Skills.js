import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function Skill({ title, content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px 0px 0px' });
  const [currentValues, setCurrentValues] = useState({});
  const [hoverScale, setHoverScale] = useState({});

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
        }, 20);
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
          <motion.div
            className="py-1 text-sm md:text-xl cursor-pointer"
            key={topic}
            animate={{ scale: hoverScale[topic] }}
            transition={{ ease: 'backOut', duration: 0.2 }}
            onHoverStart={() => {
              setHoverScale((prevValues) => {
                return { ...prevValues, [topic]: 1.25 };
              });
            }}
            onHoverEnd={() => {
              setHoverScale((prevValues) => {
                return { ...prevValues, [topic]: 1 };
              });
            }}
          >
            {topic} {currentValues[topic] || 0}%
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="bg-black h-screen w-full bg-opacity-80 text-white text-center flex justify-center">
      <div className="my-auto">
        <motion.h2
          className="text-6xl pb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.75, delay: 0.15 } }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-24 xl:gap-32 items-start"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.75, delay: 0.25 } }}
        >
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
        </motion.div>
      </div>
    </div>
  );
}
