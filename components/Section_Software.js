import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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

const Software = ({ software, className }) => {
  const symbol = '/Software_' + software.replace(' ', '-') + '_128.png';

  return (
    <motion.div className={className} variants={itemVariants} whileHover={{ scale: 1.5 }}>
      <div className="w-16 h-16 bg-contain mx-auto mb-1" style={{ backgroundImage: `url(${symbol})` }}></div>
      <div className="text-xs">{software}</div>
    </motion.div>
  );
};

export default function SoftwareSection() {
  const isinView = useInView({
    margin: '0px -500px -50px 0px',
  });
  const bgImage = '/background-software1.png';

  return (
    <div className="h-screen flex relative overflow-hidden">
      <div className="h-full w-full absolute bg-white -z-20" />
      <div
        className="absolute bg-contain bg-no-repeat h-[125%] w-full -left-80 -bottom-32 -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="flex w-full justify-center items-center">
        <div className="w-2/5"></div>
        <div className="w-3/5 px-8 flex flex-col justify-center items-center">
          <motion.h2
            className="text-6xl pb-8 text-black"
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
            className="grid grid-cols-3 gap-16 text-center mt-8"
          >
            <Software software={'C4D'} className="" />
            <Software software={'After Effects'} className="" />
            <Software software={'Octane'} className="" />
            <Software software={'Unity'} className="" />
            <Software software={'Solidity'} className="" />
            <Software software={'Webdev'} className="" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
