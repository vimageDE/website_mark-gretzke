import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Software } from './Component_Software';

export default function SoftwareSection() {
  const isinView = useInView({
    margin: '0px -500px -50px 0px',
  });
  return (
    <div className="h-[500px] flex flex-col justify-center items-center bg-white ">
      <motion.h2 className="text-6xl pb-8 text-black" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        Software & Languages
      </motion.h2>
      <div className="grid grid-cols-6 text-center py-2 w-full">
        <Software software={'C4D'} className="" />
        <Software software={'After Effects'} className="" />
        <Software software={'Octane'} className="" />
        <Software software={'Unity'} className="" />
        <Software software={'Solidity'} className="" />
        <Software software={'Webdev'} className="" />
      </div>
    </div>
  );
}
