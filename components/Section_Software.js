import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Software = ({ software, className }) => {
  const symbol = '/Software_' + software.replace(' ', '-') + '_128.png';

  return (
    <motion.div className={className} whileHover={{ y: -2 }}>
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
    <div className="h-screen flex bg-white relative -z-20 overflow-hidden">
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
            transition={{ delay: 0.5 }}
          >
            Software & Languages
          </motion.h2>
          <div className="flex space-x-32 text-center py-2 h-[500px] overflow-visible w-64">
            <Software software={'C4D'} className="" />
            <Software software={'After Effects'} className="" />
            <Software software={'Octane'} className="" />
            <Software software={'Unity'} className="" />
            <Software software={'Solidity'} className="" />
            <Software software={'Webdev'} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
