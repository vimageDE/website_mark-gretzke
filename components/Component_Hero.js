import { motion, useMotionValue, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const allClients = [
    'Apache207',
    'Constantinfilm',
    'DeutscheOperAmRhein',
    'GoodYear',
    'Gym80',
    'Levelup',
    'Masterplan',
    'Purelei',
    'Snocks',
    'ZDF',
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '500px 0px 0px 0px' });

  const mouseX = useMotionValue(null);
  const [scaleValues, setScaleValues] = useState(Array(allClients.length).fill(1));

  useEffect(() => {
    const updateMouseX = (event) => {
      const mouseXPosition = event.clientX;

      const maxScale = 1;
      const minScale = 0.65;

      // Compute scale for each image
      const newScaleValues = allClients.map((_, index) => {
        const imgElement = document.getElementById(`client-${index}`);
        if (imgElement) {
          const rect = imgElement.getBoundingClientRect();
          const distanceFromMouse = Math.abs(rect.left + rect.width / 2 - mouseXPosition);

          const maxDistance = 8 * rect.width;
          const minDistance = 0;

          // Linearly interpolate the scale based on the distance
          let scale =
            minScale + ((maxScale - minScale) * (distanceFromMouse - minDistance)) / (maxDistance - minDistance);
          scale = Math.max(minScale, Math.min(maxScale, scale)); // Clamp the scale between min and max

          return scale;
        }
        return 1;
      });

      setScaleValues(newScaleValues);
    };

    window.addEventListener('mousemove', updateMouseX);

    return () => {
      window.removeEventListener('mousemove', updateMouseX);
    };
  }, [allClients]);

  return (
    <div className="relative h-[84%] bg-black bg-opacity-10 flex flex-col">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-40 blur-md">
        <source src="/bg-videos/underwater37712_2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text more readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="h-full relative flex flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center justify-center mb-24" ref={ref}>
          <h2
            className="text-6xl md:text-9xl text-center"
            style={{
              transform: isInView ? 'none' : 'translateY(30px)',
              opacity: isInView ? 1 : 0,
              transition: `all ${isInView ? '0.9s' : '0s'} cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s`,
            }}
          >
            Mark Gretzke
          </h2>
          <h2
            className="text-2xl"
            style={{
              transform: isInView ? 'none' : 'translateY(30px)',
              opacity: isInView ? 1 : 0,
              transition: `all ${isInView ? '0.9s' : '0s'} cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isInView ? '0.6s' : '0s'
              }`,
            }}
          >
            Design & Code
          </h2>
          <div
            style={{
              transform: isInView ? 'none' : 'translateY(30px)',
              opacity: isInView ? 1 : 0,
              transition: `all ${isInView ? '0.9s' : '0s'} cubic-bezier(0.17, 0.55, 0.55, 1) ${
                isInView ? '0.9s' : '0s'
              }`,
            }}
          >
            <motion.div className="mt-6 " whileHover={{ scale: 1.4 }}>
              <motion.button
                className="px-8 py-2 rounded-md"
                initial={{ backgroundColor: '#FFFFFF' }}
                animate={{ backgroundColor: ['#FFFFFF', '#e9c169', '#FFFFFF'] }}
                transition={{
                  duration: 2.5, // Time in seconds for one cycle of the keyframes
                  ease: 'easeInOut', // Easing function
                  repeat: Infinity, // Loop the animation indefinitely
                }}
              >
                <h2 className="text-black text-xl">HIRE</h2>
              </motion.button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          {/* <div className="pl-8 text-xs text-left text-white -mb-6">worked on projects for:</div> */}
          <div className="w-screen text-white flex justify-center">
            {allClients.map((imageSrc, index) => (
              <motion.div
                key={index}
                id={`client-${index}`}
                className="bg-contain h-12 md:h-24 lg:h-40 w-40 bg-no-repeat"
                style={{ backgroundImage: `url(/clients/clients_${imageSrc}.png)` }}
                transformTemplate={({ scale }) => `scale(${scale})`}
                custom={mouseX}
                animate={{
                  scale: scaleValues[index],
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function HeroImage() {
  const heroImage = '/background-image1.jpg';
  const heroVideo = '/background-video.mp4';
  const clientsImage = '/Clients_all.png';

  return (
    <div
      className="bg-cover h-[800px] bg-black bg-opacity-10 bg-fixed flex flex-col"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="h-full relative flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-9xl">Mark Gretzke</h2>
          <h2 className="text-2xl">Design & Code</h2>
        </div>
        <div className="absolute bottom-0">
          <div className="pl-8 text-xs text-left text-white -mb-6">worked on projects for:</div>
          <div
            className="bg-contain h-40 w-screen text-white"
            style={{ backgroundImage: `url(${clientsImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
