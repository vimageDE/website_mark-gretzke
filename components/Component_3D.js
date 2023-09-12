import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

function Spaceship({ scrollContainerRef }) {
  const gltf = useLoader(GLTFLoader, '/3D/scene.glb');
  const mesh = useRef(null);

  // This is where we'll adjust the material properties.
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // If the object is a mesh, modify its material here.
        child.material.roughness = 0.15; // Adjust to your liking.
      }
    });
  }, [gltf]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.position.set(0, 0, 0);
      mesh.current.rotation.set(0, 0, 0);

      // Create an initial timeline for the startup animation
      /*const initTimeline = gsap.timeline();
      initTimeline.fromTo(
        mesh.current.position,
        { x: 0, y: 0, z: -5 }, // initial position
        { x: 0, y: 0, z: 0, duration: 0.5 } // final position
      );
      initTimeline.fromTo(
        mesh.current.rotation,
        { x: 0, y: 0, z: 0 }, // initial rotation
        { x: 0, y: 0, z: 0, duration: 0.5 },
        '-=1' // final rotation
      ); */

      // Set the new standard position here
      mesh.current.position.set(0, 0, 0);
      mesh.current.rotation.set(0, 0, 0);
      // First animation for skills-section
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top bottom',
          end: 'top top',
          scrub: 6,
          immediateRender: true,
          scroller: scrollContainerRef.current,
        },
      });

      tl1.to(mesh.current.position, {
        x: 2.5,
        y: -8,
        z: 0.4,
        duration: 4,
      });
      // Animate rotation
      tl1.to(
        mesh.current.rotation,
        {
          x: 0,
          y: 0.2,
          z: 0,
          duration: 4,
        },
        '-=4'
      ); // This will make the rotation animation start 2 seconds earlier, which means it will start at the same time as the position animation.

      // Second animation for software-section
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.software-section',
          start: 'top bottom',
          end: 'top top',
          scrub: 2,
          immediateRender: true,
          scroller: scrollContainerRef.current,
        },
      });

      tl2.to(mesh.current.position, {
        x: 0,
        y: -10,
        z: 1,
        duration: 2,
      });
      // Animate rotation
      tl2.to(
        mesh.current.rotation,
        {
          x: 0.6,
          y: -0.5,
          z: 0,
          duration: 2,
        },
        '-=2'
      ); // This will make the rotation animation start 2 seconds earlier, which means it will start at the same time as the position animation.

      // Second animation for software-section
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '.portfolio-section',
          start: 'top bottom',
          end: 'top top',
          scrub: 2,
          immediateRender: true,
          scroller: scrollContainerRef.current,
        },
      });

      tl3.to(mesh.current.position, {
        x: -3.5,
        y: -16,
        z: 1.7,
        duration: 2,
      });
      // Animate rotation
      tl3.to(
        mesh.current.rotation,
        {
          x: 0.5,
          y: -0.05,
          z: 0,
          duration: 2,
        },
        '-=2'
      ); // This will make the rotation animation start 2 seconds earlier, which means it will start at the same time as the position animation.

      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'top top',
          scrub: 2,
          immediateRender: true,
          scroller: scrollContainerRef.current,
        },
      });

      tl4.to(mesh.current.position, {
        x: -8,
        y: -19,
        z: 1.7,
        duration: 2,
      });
      // Animate rotation
      tl4.to(
        mesh.current.rotation,
        {
          x: 0.5,
          y: -0.05,
          z: 0,
          duration: 2,
        },
        '-=2'
      ); // This will make the rotation animation start 2 seconds earlier, which means it will start at the same time as the position animation.
    }
  }, [mesh.current]);

  return <primitive object={gltf.scene} scale={0.8} ref={mesh} />;
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

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'top top', // When the top of the trigger hits the top of the viewport
        // markers: true,
        scrub: 0,
        immediateRender: true,
        scroller: scrollContainerRef.current, // Pass your custom scroller here
      },
    });

    tl1.to(camera.position, {
      x: 0.05,
      y: -6,
      z: 7,
      duration: 2,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.software-section',
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'top top', // When the top of the trigger hits the top of the viewport
        // markers: true,
        scrub: 0,
        immediateRender: true,
        scroller: scrollContainerRef.current, // Pass your custom scroller here
      },
    });

    tl2.to(camera.position, {
      x: 0.05,
      y: -12,
      z: 7,
      duration: 2,
    });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'top top', // When the top of the trigger hits the top of the viewport
        // markers: true,
        scrub: 0,
        immediateRender: true,
        scroller: scrollContainerRef.current, // Pass your custom scroller here
      },
    });

    tl3.to(camera.position, {
      x: 0.05,
      y: -18,
      z: 7,
      duration: 2,
    });

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'top top', // When the top of the trigger hits the top of the viewport
        // markers: true,
        scrub: 0,
        immediateRender: true,
        scroller: scrollContainerRef.current, // Pass your custom scroller here
      },
    });

    tl4.to(camera.position, {
      x: 0.05,
      y: -24,
      z: 7,
      duration: 2,
    });
  }, [camera]);

  return null;
}

export default function WebgiViewer({ scrollPosition, className, scrollContainerRef }) {
  return (
    <div className={className}>
      <Canvas className=" z-50" style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Environment files={'/3D/env.hdr'} />
        <Spaceship scrollContainerRef={scrollContainerRef} />
        <CameraSetup scrollPosition={scrollPosition} scrollContainerRef={scrollContainerRef} />
      </Canvas>
    </div>
  );
}
