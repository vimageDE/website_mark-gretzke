import { useEffect, useState } from 'react';
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

export function AnimatedSvgMask() {
  useEffect(() => {
    anime({
      targets: '.animatedPath',
      d: [
        {
          value:
            'M420,530c-20-310,220-500,490-460s300,110,480,90c210-22,480,120,370,390c-75,190-30,480-280,560c-200,70-400-30-610,80c-150,70-390,20-500-170C290,850,430,760,420,530Z',
        },
        {
          value:
            'M410,520c-15-310,205-480,470-450s290,100,460,90c190-25,450,110,370,370c-70,190-10,470-250,550c-185,65-380-20-590,60c-130,55-370,15-490-160C280,840,420,750,410,520Z',
        },
        {
          value:
            'M430,540c-18-290,200-490,475-460s295,120,475,100c205-19,460,130,360,385c-60,185-20,460-250,540c-180,63-375-28-585,70c-140,65-385,20-495-155C290,860,440,770,430,540Z',
        },
        {
          value:
            'M420,515c-17-315,215-495,480-460s285,110,465,95c200-23,470,115,360,385c-65,195-25,465-260,565c-190,70-390-25-595,80c-130,60-380,10-500-165C280,835,430,750,420,515Z',
        },
        {
          value:
            'M435,525c-19-305,210-485,470-455s280,105,455,95c210-24,465,125,365,375c-70,180-15,465-255,560c-195,65-385-27-595,75c-135,60-375,18-495-160C300,845,440,760,435,525Z',
        },
      ],
      duration: 5000, // Increased the duration to make each morph last longer
      loop: true,
      easing: 'easeInOutQuad',
      direction: 'alternate',
    });
  }, []);

  const [scaleFactor, setScaleFactor] = useState(0.28);

  const onMouseEnter = () => {
    setScaleFactor(0.75);
  };

  const onMouseLeave = () => {
    setScaleFactor(0.28);
  };

  return (
    <div className="relative w-[640px] h-[360px]" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1642.86 874.06">
        <clipPath id="myClip">
          <path
            className="animatedPath"
            d={`M422.5,520.5c-16-302,211-492,484-454s286,104,466,86c206.77-20.68,469,114,368,380
            c-71.38,187.99-22,468-266,555c-191.66,68.34-386-25-598,75c-139.22,65.67-383.89,19.6-495-162
            C288.5,848.5,434.96,755.61,422.5,520.5z`}
            transform={`translate(300 250) scale(${scaleFactor}) translate(-1000 -900)`}
          />
        </clipPath>
      </svg>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: 'url(#myClip)' }}
        src="/projects/Marko Fast_90_Grad.mp4"
        autoPlay
        muted
        loop
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
