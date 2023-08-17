import { ConnectButton } from 'web3uikit';
import { Software } from './Component_Software';
import { useState, useEffect } from 'react';

export default function Header({ scrollContainer }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = scrollContainer.current.scrollTop > 450; // Adjust this value if needed
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Attach the event listener to the scrolling container
    scrollContainer.current.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      scrollContainer.current.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, scrollContainer]);

  return (
    <div
      className={`w-[100%] fixed top-0 z-20 bg-black ${
        scrolled ? 'bg-opacity-90' : 'bg-opacity-50'
      } flex justify-center text-center items-center transition-all duration-1000`}
    >
      <h2 className="w-32">Skills</h2>
      <div className="flex justify-center">
        <img src="/Logo_Vimage.png" className={`${scrolled ? 'h-12' : 'h-24'} transition-all duration-1000`}></img>
      </div>
      <h2 className="w-32">Projects</h2>
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
