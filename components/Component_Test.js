import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import anime from 'animejs';

function ScrollSnapExample() {
  return (
    <div className="h-40 w-full bg-gray-200 overflow-y-scroll snap-y">
      <div className="bg-red-500 h-96 flex justify-center items-center snap-center">
        <h1>Section 1</h1>
      </div>
      <div className="bg-blue-500 flex justify-center items-center snap-center">
        <h1>Section 2</h1>
      </div>
      <div className="bg-yellow-500 flex justify-center items-center snap-center">
        <h1>Section 3</h1>
      </div>
    </div>
  );
}

export function VideoWithMask() {
  return (
    <div className="relative w-[500px] h-[150px]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/background-video.mp4"
        autoPlay
        loop
        muted
        style={{
          WebkitMaskImage: "url('/MaskTest.png')",
          maskImage: "url('/MaskTest.png')",
        }}
      />
    </div>
  );
}

export function ImageWithMask() {
  return (
    <div className="relative w-[500px] h-[500px]">
      <img className="absolute inset-0 w-full h-full object-cover mask" src="/MaskTest.png" alt="Background" />
    </div>
  );
}

export function VideoWithClipPath() {
  return (
    <div className="relative w-[640px] h-[360px] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover clip-path-animation"
        src="/background-video.mp4"
        autoPlay
        muted
        loop
      ></video>
      <style jsx>{`
        .clip-path-animation {
          animation: clip-me 4s infinite linear alternate;
          clip-path: circle(20% at 50% 50%);
        }

        @keyframes clip-me {
          to {
            clip-path: circle(50% at 50% 50%);
          }
        }
      `}</style>
    </div>
  );
}

export function VideoWithComplexClipPath() {
  return (
    <div className="relative w-[640px] h-[360px] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover complex-clip-path"
        src="/background-video.mp4"
        autoPlay
        muted
        loop
      ></video>
      <style jsx>{`
        .complex-clip-path {
          clip-path: polygon(
            50% 15%,
            58.8% 18.2%,
            66% 25.5%,
            70% 35.5%,
            70% 50%,
            66% 74.5%,
            58.8% 81.8%,
            50% 85%,
            41.2% 81.8%,
            34% 74.5%,
            30% 64.5%,
            30% 50%,
            34% 35.5%,
            41.2% 28.2%,
            50% 25%
          );
        }
      `}</style>
    </div>
  );
}

export function AnimatedSvgMask({ project }) {
  const [scaleFactor, setScaleFactor] = useState(0.86);
  const [isReveal, setIsReveal] = useState(false);
  const videoRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    anime({
      targets: '.animatedPath',
      d: [
        {
          value:
            'M 21.833 264.401 C 13.998 90.036 295.682 35.596 418.776 142.423 C 540.673 248.212 426.969 429.226 291.878 435.759 C 199.224 440.24 28.055 402.864 21.833 264.401 Z',
        },
        {
          value:
            'M 13.679 241.421 C 54.694 83.681 394.613 -5.722 478.081 134.268 C 547.345 250.435 353.579 423.296 218.488 429.829 C 125.834 434.31 -9.665 331.199 13.679 241.421 Z',
        },
        {
          value:
            'M 18.868 179.892 C 59.883 22.152 359.03 -37.598 442.498 102.392 C 511.762 218.559 307.618 404.763 172.527 411.296 C 79.873 415.777 -4.476 269.67 18.868 179.892 Z',
        },
        {
          value:
            'M 21.833 264.401 C 13.998 90.036 295.682 35.596 418.776 142.423 C 540.673 248.212 426.969 429.226 291.878 435.759 C 199.224 440.24 28.055 402.864 21.833 264.401 Z',
        },
        {
          value:
            'M 38.142 286.64 C 30.307 112.275 210.431 51.905 333.525 158.732 C 455.422 264.521 451.432 390.678 316.341 397.211 C 223.687 401.692 44.364 425.103 38.142 286.64 Z',
        },
        {
          value:
            'M 7.748 264.401 C -0.087 90.036 277.149 46.716 428.413 148.354 C 562.381 238.37 460.568 364.245 328.202 392.022 C 264.459 405.398 13.97 402.864 7.748 264.401 Z',
        },
      ],
      duration: 7000, // Increased the duration to make each morph last longer
      loop: true,
      easing: 'easeInOutQuad',
      direction: 'alternate',
    });
  }, []);

  useEffect(() => {
    // Get video element
    const videoElement = videoRef.current;
    const logoElement = logoRef.current;

    // const switchAnim = gsap
    //   .timeline()
    //   .add(() => {
    //     setIsReveal(true);
    //   })
    //   .to(videoElement, { opacity: 0, duration: 0.5 })
    //   .add(() => {
    //     videoElement.src = `/projects/${project.media}`;
    //     videoElement.load();
    //     setIsReveal(false);
    //   })
    //   .to(videoElement, { opacity: 1, duratoin: 0.5 });
    logoElement.style.transform = 'scale(0.5)';

    const switchAnim = gsap.timeline({
      onComplete: () => {
        logoElement.style.transform = '';
      },
    });

    switchAnim
      .add('start')
      .to(videoElement, { opacity: 0, duration: 0.5, filter: 'blur(25px)', ease: 'power1.out' }, 'start')
      .to(videoElement, { scale: 0.75, duration: 0.5, ease: 'power1.out' }, 'start')
      .to(logoElement, { opacity: 0.75, duration: 0.5 }, 'start')
      .add(() => {
        videoElement.src = `/projects/${project.media}`;
        videoElement.load();
      })
      .set(videoElement, { scale: 0.3 })
      .to(videoElement, { opacity: 1, duration: 0.5, filter: 'blur(0px)', delay: 0.6 })
      .to(videoElement, { scale: 1, duration: 0.75, ease: 'back' }, '<')
      .to(logoElement, { opacity: 0, duration: 0.5 }, '<')
      .fromTo(logoElement, { scale: 0.5 }, { scale: 1, ease: 'power1' }, 0);

    // Update the duration of the logo scaling
    switchAnim.getChildren().forEach((child) => {
      if (child.vars.object === logoElement) {
        child.vars.duration = switchAnim.totalDuration();
      }
    });
  }, [project]);

  const onMouseEnter = () => {
    setScaleFactor(2.45);
  };

  const onMouseLeave = () => {
    setScaleFactor(0.86);
  };

  return (
    <div className="relative w-[640px] h-[360px]" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 500 500">
        <clipPath id="myClip">
          <path
            className="animatedPath"
            d={
              'M 13.679 241.421 C 54.694 83.681 394.613 -5.722 478.081 134.268 C 547.345 250.435 353.579 423.296 218.488 429.829 C 125.834 434.31 -9.665 331.199 13.679 241.421 Z'
            }
            transform={`translate(300 250) scale(${scaleFactor}) translate(-200 -310)`}
          />
        </clipPath>
      </svg>
      <div
        ref={logoRef}
        className="absolute w-64 h-64 bg-center bg-no-repeat m-auto left-0 right-0 top-0 bottom-0 opacity-0 scale-50"
        style={{ backgroundImage: 'url(/Logo_Vimage.png)' }}
      ></div>
      <video
        ref={videoRef}
        className="project-video absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: 'url(#myClip)' }}
        autoPlay
        muted
        loop
      ></video>

      {/* <div
        className={`absolute top-0 left-0 w-full h-full z-5 gradient-overlay ${isReveal ? 'reveal' : ''}`}
        style={{ clipPath: 'url(#myClip)' }}
      > 
      </div>*/}
    </div>
  );
}

export function VideoWithCustomClipPath() {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to('.cls-1', {
      morphSVG:
        'M333.5,338.5c66-226,209-317,482-279s434,31,550,13,431,97,425,298-44.33,585.25-222,573c-203-14-527-98-667-34s-531,105-629-84S267.5,564.5,333.5,338.5Z',
      duration: 4,
    });
  }, []);

  return (
    <div className="relative w-[640px] h-[360px]">
      {/* Embed your SVG */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 640 360" visibility="visible">
        <clipPath id="myClip">
          {/* Your SVG path here */}
          <path
            className="cls-1"
            d="M196.5,377.5c66-226,432-314,705-276s430,19,546,1,374,169,368,370-318,574-468,478-306-105-446-41-486,73-584-116S130.5,603.5,196.5,377.5Z"
            transform="translate(-50 -0) scale(0.33)"
          />
        </clipPath>
      </svg>

      {/* Your video element */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          clipPath: 'url(#myClip)',
        }}
        src="/background-video.mp4"
        autoPlay
        muted
        loop
      ></video>
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 640 360" visibility="visible">
        <path
          className="cls-1"
          d="M196.5,377.5c66-226,432-314,705-276s430,19,546,1,374,169,368,370-318,574-468,478-306-105-446-41-486,73-584-116S130.5,603.5,196.5,377.5Z"
          transform="translate(-50 -0) scale(0.33)"
        />
      </svg>
    </div>
  );
}
export default ScrollSnapExample;
