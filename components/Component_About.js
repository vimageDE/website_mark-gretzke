import { motion } from 'framer-motion';

export default function About() {
  const aboutImage = '/about_Mark.jpg';

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
    <div className="h-screen py-64 bg-black">
      <div className="flex justify-center">
        <div className="w-2/5">
          <div
            className="bg-contain bg-no-repeat h-96 w-96 ml-auto rounded-md"
            style={{ backgroundImage: `url(${aboutImage})` }}
          ></div>
        </div>
        <div className="w-3/5 pl-12 pr-32 text-white">
          <div className="h-full relative flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-3xl mb-4">About</h2>
              <h2 className="text-2xl">Who am I?</h2>
            </div>
            <div className="text-white mx-auto">
              Der Schwerpunkt meiner kreativen Arbeit liegt vor allem auf der Erschaffung von neuen und alternativen
              Realitäten. Mit 3D-Animationen gelingt es, den Zuschauer in eine Welt zu entführen, in der nicht die
              technischen Limitationen, sondern die Fantasie die Grenzen des Möglichen aufzeigen. Das mag in manchen
              Aufgaben nur die Verzerrung der Wirklichkeit bedeuten, in anderen hingegen ist es die Tür in eine neue,
              alternative Welt.
            </div>
            <motion.span
              className="h-[1px] bg-white my-4"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.5 }}
            >
              &nbsp;
            </motion.span>
            <motion.div variants={containerVariants} initial="initial" whileInView="whileInView">
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Education:</div>
                <div>Bachelof or Arts - HS Mainz</div>
              </motion.div>
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Experience:</div>
                <div>Freelancer over 10 years</div>
              </motion.div>
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">Also known for:</div>
                <a href="www.vimage.de">Vimage (Design)</a>
                <div>•</div>
                <a href="www.mayfly-games.com">Mayfly-Games (Gamedev)</a>
                <div>•</div>
                <a href="www.mark-gretzke.com">Mark-Gretzke (Coding)</a>
              </motion.div>
              <motion.div className="flex space-x-2" variants={itemVariants}>
                <div className="uppercase font-black">place of residence:</div>
                <div>Ludwigshafen am Rhein</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
