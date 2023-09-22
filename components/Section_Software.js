import { useState, useRef, useEffect, useContext } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globals } from './GlobalVariables';

const containerVariants = {
  initial: {
    opacity: 1,
  },
  whileInView: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      // repeat: Infinity,
    },
  },
};

const Software = ({ software, onSoftwareSelected, onBackClicked, isSelected, somethingSelected, invert }) => {
  const symbol = '/Software_' + software.replace(' ', '-') + '_128.png';
  const [selectedScale, setSelectedScale] = useState(1.5);
  const { mobile, computer } = useContext(Globals);

  const softwareRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // This effect runs when isSelected changes
  useEffect(() => {
    if (isSelected && softwareRef.current) {
      const parent = softwareRef.current.closest('.parent-container');
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const softwareRect = softwareRef.current.getBoundingClientRect();

        const xCenter = (parentRect.width - softwareRect.width) / 2;
        const yCenter = (parentRect.height - softwareRect.height) / 3;

        // Correct the offset to place the object exactly at the center
        const offsetX = xCenter - (softwareRect.left - parentRect.left);
        const offsetY = yCenter - (softwareRect.top - parentRect.top);

        setX(offsetX);
        setY(offsetY);

        setOpacity(1);
        setSelectedScale(1.5);
      }
    } else {
      setX(0);
      setY(0);
      setSelectedScale(1);

      if (somethingSelected) {
        setOpacity(0);
      } else {
        setOpacity(1);
      }
    }
  }, [isSelected, somethingSelected]);

  const variants = {
    initial: { ...itemVariants.initial },
    whileInView: { ...itemVariants.whileInView },
    animate: { scale: selectedScale, x, y, opacity },
  };

  return (
    <motion.div variants={itemVariants} className={`cursor-pointer ${isSelected ? 'z-20' : 'z-10'} `}>
      <motion.div
        ref={softwareRef}
        animate={{ scale: selectedScale, x, y, opacity }}
        onHoverStart={() => {
          if (!somethingSelected) setSelectedScale(1.5);
        }}
        onHoverEnd={() => {
          if (!somethingSelected) setSelectedScale(1);
        }}
      >
        <div
          onClick={() => onSoftwareSelected(software)}
          className={`w-16 h-16 bg-contain mx-auto mb-1 ${invert && !computer ? 'invert' : 'invert-0'} ${
            somethingSelected ? 'pointer-events-none' : ''
          }`}
          style={{ backgroundImage: `url(${symbol})` }}
        ></div>
        <div
          onClick={() => onSoftwareSelected(software)}
          className={`text-xs text-white xl:text-black ${somethingSelected ? 'pointer-events-none' : ''}`}
        >
          {software}
        </div>
        {isSelected ? (
          <motion.div className="absolute left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="w-[200px] text-white xl:text-black">This is a test for a text</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-gold py-1 px-4 rounded cursor-pointer mt-8"
              onClick={() => {
                onBackClicked();
              }}
            >
              <h2 className="text-black text-xl">BACK</h2>
            </motion.div>
          </motion.div>
        ) : (
          <></>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function SoftwareSection() {
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const softwareImage1 = '/softwareImage5.png';

  const isinView = useInView({
    margin: '0px -500px -50px 0px',
  });
  const bgImage = '/background-software1.png';

  const onSoftwareSelected = (software) => {
    if (selectedSoftware !== null) {
      return;
    }
    setSelectedSoftware(software);
  };
  const onBackClicked = () => {
    console.log('Test Back clicked');
    setSelectedSoftware(null);
    console.log('Selected Software is:', selectedSoftware);
  };

  return (
    <div
      className="h-screen flex relative overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${softwareImage1})` }}
    >
      <div className="h-full w-full absolute bg-gradient-to-t md:bg-gradient-to-l from-black/90 xl:from-transparent to-black/20 bg-black bg-opacity-25 xl:bg-opacity-0 xl:-z-20" />
      {/* <div
        className="absolute bg-contain bg-no-repeat h-[125%] w-full -left-80 -bottom-32 -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div> */}
      <div className="flex w-full justify-center items-center">
        <div className="md:w-2/5"></div>
        <div className="md:w-3/5 md:px-8 flex flex-col justify-center items-center">
          <motion.h2
            className="mt-8 md:mt-0 text-5xl pb-8 text-white xl:text-black text-center z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Software & Languages
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="whileInView"
            className="flex gap-12 md:gap-16 w-[350px] flex-wrap justify-center text-center mt-8 relative parent-container"
          >
            <Software
              software={'C4D'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'C4D'}
              somethingSelected={selectedSoftware !== null}
              invert={false}
            />
            <Software
              software={'After Effects'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'After Effects'}
              somethingSelected={selectedSoftware !== null}
              invert={false}
            />
            <Software
              software={'Octane'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'Octane'}
              somethingSelected={selectedSoftware !== null}
              invert={true}
            />
            <Software
              software={'Unity'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'Unity'}
              somethingSelected={selectedSoftware !== null}
              invert={false}
            />
            <Software
              software={'Solidity'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'Solidity'}
              somethingSelected={selectedSoftware !== null}
              invert={true}
            />
            <Software
              software={'Webdev'}
              onSoftwareSelected={onSoftwareSelected}
              onBackClicked={onBackClicked}
              isSelected={selectedSoftware === 'Webdev'}
              somethingSelected={selectedSoftware !== null}
              invert={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
