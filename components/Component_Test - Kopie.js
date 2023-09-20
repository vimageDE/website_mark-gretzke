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
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isReveal, setIsReveal] = useState(false);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      function handleResize() {
        const { width, height } = videoElement.getBoundingClientRect();
        const scale = videoRef.current.clientWidth / 750;

        setVideoWidth(width);
        setVideoHeight(height);

        setScaleFactor(0.5);

        // Adjust for scaleFactor if needed
        const translateX = 0.78 * width - 450;

        const adjustedWidth = 330; // 135 bei 750 / -35 bei 220;
        const adjustedHeight = 0;
        setTranslate({ x: translateX, y: adjustedHeight / 2 });

        if (videoRef != null) {
          console.log('Video Width: ', videoRef.current.clientWidth);
          console.log('Video Height: ', videoRef.current.clientHeight);
        }
      }

      handleResize();

      // Attach event listener for resize events
      window.addEventListener('resize', handleResize);

      // Clean up event listener
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleMetadataLoaded = (event) => {
    // setVideoWidth(event.target.videoWidth);
    // setVideoHeight(event.target.videoHeight);
  };

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

    return;

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
    setScaleFactor(3);
  };

  const onMouseLeave = () => {
    setScaleFactor(1);
  };

  return (
    <div className="relative bg-white h-full w-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="">
        <svg width={'500'} height={'0'}>
          <defs>
            <clipPath id="myClip">
              <path
                className="animatedPath origin-center"
                d={
                  'M 13.679 241.421 C 54.694 83.681 394.613 -5.722 478.081 134.268 C 547.345 250.435 353.579 423.296 218.488 429.829 C 125.834 434.31 -9.665 331.199 13.679 241.421 Z'
                }
                transform={`translate(${translate.x}, ${translate.y}) scale(${scaleFactor})`}
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div
        ref={logoRef}
        className="absolute w-64 h-64 bg-center bg-no-repeat m-auto left-0 right-0 top-0 bottom-0 opacity-0 scale-50"
        style={{ backgroundImage: 'url(/Logo_Vimage.png)' }}
      ></div>
      <video
        ref={videoRef}
        className="project-video origin-center w-fit right-0 object-cover pointer-events-none"
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

export function TestClip({ project }) {
  const videoRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [scaleFactor, setScaleFactor] = useState(1);

  const handleMetadataLoaded = (event) => {
    setVideoWidth(event.target.videoWidth);
    setVideoHeight(event.target.videoHeight);
  };

  useEffect(() => {
    const scaleX = videoWidth > videoHeight ? videoHeight / videoWidth : 1;
    const scaleY = videoHeight > videoWidth ? videoWidth / videoHeight : 1;
    setScale({ x: scaleX, y: scaleY });
  }, [videoWidth, videoHeight]);

  useEffect(() => {
    // Get video element
    const videoElement = videoRef.current;
    videoElement.src = `/projects/${project.media}`;
  }, [project]);

  const onMouseEnter = () => {
    setScaleFactor(3);
  };

  const onMouseLeave = () => {
    setScaleFactor(1);
  };

  useEffect(() => {
    anime({
      targets: '.animatedPath',
      d: [
        {
          value:
            'M 0.043666 0.528802 C 0.027996 0.180072 0.591364 0.071192 0.837552 0.284846 C 1.081346 0.496424 0.853938 0.858452 0.583756 0.871518 C 0.398448 0.88048 0.05611 0.805728 0.043666 0.528802 Z',
        },
        {
          value:
            'M 0.027358 0.482842 C 0.109388 0.167362 0.789226 -0.011444 0.956162 0.268536 C 1.09469 0.50107 0.707158 0.846592 0.436976 0.859658 C 0.251668 0.86862 -0.01933 0.662398 0.027358 0.482842 Z',
        },
        {
          value:
            'M 0.037736 0.359784 C 0.119766 0.044304 0.71806 -0.075196 0.884996 0.204784 C 1.023524 0.437318 0.615236 0.809526 0.345054 0.822592 C 0.159746 0.831554 -0.008952 0.53934 0.037736 0.359784 Z',
        },
        {
          value:
            'M 0.043666 0.528802 C 0.027996 0.180072 0.591364 0.071192 0.837552 0.284846 C 1.081346 0.496424 0.853938 0.858452 0.583756 0.871518 C 0.398448 0.88048 0.05611 0.805728 0.043666 0.528802 Z',
        },
        {
          value:
            'M 0.076284 0.57328 C 0.060614 0.22455 0.420862 0.10381 0.66705 0.317464 C 0.910844 0.529042 0.902864 0.781356 0.632682 0.794422 C 0.447374 0.803384 0.088728 0.850206 0.076284 0.57328 Z',
        },
        {
          value:
            'M 0.015496 0.528802 C -0.000174 0.180072 0.554298 0.093432 0.856826 0.296708 C 1.124762 0.47674 0.921136 0.72849 0.656404 0.784044 C 0.528918 0.810796 0.02794 0.805728 0.015496 0.528802 Z',
        },
      ],
      duration: 7000, // Increased the duration to make each morph last longer
      loop: true,
      easing: 'easeInOutQuad',
      direction: 'alternate',
    });
  }, []);

  return (
    <div className="" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg width={'0'} height={'0'}>
        <defs>
          {/* Note the clipPathUnits attribute */}
          <clipPath id="myClip" clipPathUnits="objectBoundingBox">
            {/* The path here would have to be specified in terms of a unit square */}
            <path
              className="animatedPath origin-center"
              d={
                'M 0.015496 0.528802 C -0.000174 0.180072 0.554298 0.093432 0.856826 0.296708 C 1.124762 0.47674 0.921136 0.72849 0.656404 0.784044 C 0.528918 0.810796 0.02794 0.805728 0.015496 0.528802 Z'
              }
              transform={`translate(.5, .5) scale(${scale.x * scaleFactor} ${
                scale.y * scaleFactor
              }) translate(-.5 -.5)`}
            />
          </clipPath>
        </defs>
      </svg>
      <video
        ref={videoRef}
        className="object-cover pointer-events-none"
        style={{ clipPath: 'url(#myClip)' }}
        autoPlay
        muted
        loop
        onLoadedMetadata={handleMetadataLoaded}
      ></video>
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
