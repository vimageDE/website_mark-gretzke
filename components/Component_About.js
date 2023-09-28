import { motion } from 'framer-motion';

export default function About() {
  const aboutImage = '/about_Mark.jpg';
  const aboutImage1 = '/aboutImage1.webp';

  const containerVariants = {
    initial: {
      opacity: 1,
    },
    whileInView: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
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

  return (
    <div
      className="h-screen py-24 md:py-64 bg-opacity-95 bg-cover relative overflow-hidden"
      style={{ backgroundImage: `url(${aboutImage1})` }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black bg-opacity-50 xl:bg-opacity-0"></div>
      <div className="flex justify-center relative">
        <div className="md:w-2/5">
          {/* <div
            className="bg-contain bg-no-repeat h-96 w-96 ml-auto rounded-md"
            style={{ backgroundImage: `url(${aboutImage})` }}
          ></div> */}
        </div>
        <div className="md:w-3/5 px-12 md:px-0 md:pl-12 md:pr-32 text-white ">
          <div className="h-full relative flex flex-col">
            <div className="flex flex-col">
              <motion.h2 initial={{ x: 75 }} whileInView={{ x: 0 }} className="text-3xl mb-4">
                About
              </motion.h2>
              <motion.h2 initial={{ x: 75 }} whileInView={{ x: 0 }} className="text-2xl" transition={{ delay: 0.25 }}>
                Who am I?
              </motion.h2>
            </div>
            <motion.div
              className="text-white mx-auto text-sm"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Der Schwerpunkt meiner kreativen Arbeit liegt vor allem auf der Erschaffung von neuen und alternativen
              Realitäten. Mit 3D-Animationen gelingt es, den Zuschauer in eine Welt zu entführen, in der nicht die
              technischen Limitationen, sondern die Fantasie die Grenzen des Möglichen aufzeigen. Das mag in manchen
              Aufgaben nur die Verzerrung der Wirklichkeit bedeuten, in anderen hingegen ist es die Tür in eine neue,
              alternative Welt.
            </motion.div>
            <motion.span
              className="h-[1px] bg-white my-4"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%', transition: { delay: 0.5, duration: 1.5 } }}
              // transition={{ delay: 0.5, duration: 1.5 }}
            >
              &nbsp;
            </motion.span>
            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="whileInView"
              className="flex flex-col space-y-2"
            >
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Education:</div>
                <div>Bachelof or Arts - HS Mainz</div>
              </motion.div>
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Experience:</div>
                <div>Freelancer over 10 years</div>
              </motion.div>
              <motion.div className="flex flex-col md:flex-row space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Also known for:</div>
                <div className="flex space-x-2 text-sm md:text-base text-center">
                  <a href="www.vimage.de">Vimage (Design)</a>
                  <div>•</div>
                  <a href="www.mayfly-games.com">Mayfly-Games (Gamedev)</a>
                  <div>•</div>
                  <a href="www.mark-gretzke.com">Mark-Gretzke (Coding)</a>
                </div>
              </motion.div>
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">place of residence:</div>
                <div className="flex space-x-2">
                  <div>Germany - Ludwigshafen am Rhein</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div>
        <div className="absolute left-0 md:left-auto right-0 md:right-12 bottom-16 flex justify-center gap-10">
          <motion.button
            initial={{ x: 120, opacity: 0 }}
            whileHover={{ scale: 1.25, transition: { duration: 0.15, ease: 'circOut' } }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 1.2 } }}
          >
            <h2 className="text-2xl">Contact</h2>
          </motion.button>
          <motion.button
            initial={{ x: 120, opacity: 0 }}
            whileHover={{ scale: 1.25, transition: { duration: 0.15, ease: 'circOut' } }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 1.0 } }}
          >
            <h2 className="text-2xl">Imprint</h2>
          </motion.button>
          <motion.button
            initial={{ x: 120, opacity: 0 }}
            whileHover={{ scale: 1.25, transition: { duration: 0.15, ease: 'circOut' } }}
            whileInView={{ x: 0, opacity: 1, transition: { delay: 0.8 } }}
          >
            <h2 className="text-2xl">Privacy Policy</h2>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
