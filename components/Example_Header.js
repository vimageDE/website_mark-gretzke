import { ConnectButton } from 'web3uikit';
import { Software } from './Component_Software';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomLink = ({ title }) => {
  return (
    <h2 className="w-32 relative group text-center">
      {title}
      <span className="h-[2px] bg-white inline-block absolute left-[50%] bottom-0 w-[0%] group-hover:w-[50%] group-hover:left-[25%] transition-all ease duration-300">
        &nbsp;
      </span>
    </h2>
  );
};

export default function Header({ scrollPosition }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isScrolled = scrollPosition > 450; // Adjust this value if needed
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled, scrollPosition]);

  return (
    <div
      className={`w-[100%] fixed top-0 z-20 bg-black ${
        scrolled ? 'bg-opacity-90' : 'bg-opacity-50'
      } flex justify-center text-center items-center transition-all duration-1000`}
    >
      <CustomLink title={'Skills'} />
      <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }} transition={{ delay: 0, duration: 0.2 }}>
        <img src="/Logo_Vimage.png" className={`${scrolled ? 'h-12' : 'h-24'} transition-all duration-300`}></img>
      </motion.div>
      <CustomLink title={'Projects'} />
    </div>
  );
}

export function HeaderOld() {
  return (
    <div className="w-[100%] absolute top-0">
      <div className="grid grid-cols-3">
        <div className="grid grid-cols-3 text-center bg-black bg-opacity-25 py-2">
          <Software software={'C4D'} />
          <Software software={'After Effects'} />
          <Software software={'Octane'} />
        </div>
        {/*<h1 className="font-blog text-center text-4xl font-black w-28 mx-auto">Mark Gretzke</h1>*/}
        <div className="flex justify-center h-24">
          <img src="/Logo_Vimage.png"></img>
        </div>
        <div className="grid grid-cols-3 text-center bg-black bg-opacity-25 py-2">
          <Software software={'Unity'} />
          <Software software={'Solidity'} />
          <Software software={'Webdev'} />
        </div>
      </div>
    </div>
  );
}
