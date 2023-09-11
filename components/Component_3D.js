import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

function Spaceship() {
  const gltf = useLoader(GLTFLoader, '/3D/scene.glb');
  const mesh = useRef(null);
  return <primitive object={gltf.scene} scale={1} ref={mesh} />;
}

function CameraSetup({ scrollPosition, scrollContainerRef }) {
  const { camera } = useThree();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Initial camera setup
    camera.position.set(0.05, 0.7, 7);
    camera.rotation.set(0, 0, 0);
    camera.fov = 50;
    camera.updateProjectionMatrix();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'top top', // When the top of the trigger hits the top of the viewport
        markers: true,
        scrub: 2,
        immediateRender: true,
        scroller: scrollContainerRef.current, // Pass your custom scroller here
      },
    });

    tl.to(camera.position, {
      x: 0.05,
      y: 3,
      z: 7,
      duration: 2,
    });
  }, [camera]);

  return null;
}

export default function WebgiViewer({ scrollPosition, className, scrollContainerRef }) {
  return (
    <div className={className}>
      <Canvas className="object-cover z-50 h-screen" style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={5} />
        <Spaceship />
        <CameraSetup scrollPosition={scrollPosition} scrollContainerRef={scrollContainerRef} />
      </Canvas>
    </div>
  );
}
