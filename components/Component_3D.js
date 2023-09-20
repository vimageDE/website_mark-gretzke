import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Bloom, EffectComposer, Glitch, Pixelation, SMAA, SSAO } from '@react-three/postprocessing';
import { Globals } from './GlobalVariables';

gsap.registerPlugin(ScrollTrigger);

function Spaceship({ scrollContainerRef }) {
  const gltf = useLoader(GLTFLoader, '/3D/scene.glb');
  const mesh = useRef(null);
  const { mobile } = useContext(Globals);

  // This is where we adjust the material properties.
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Create a new basic material
        const basicMaterial = new THREE.MeshBasicMaterial();

        // Copy over the main texture (the "map") from the existing material to the new one
        if (child.material.map) {
          basicMaterial.map = child.material.map;
        }

        // Replace the material on this child mesh
        child.material = basicMaterial;
        // If the object is a mesh, modify its material here.
        // child.material.roughness = 0.0; // Adjust to your liking.
        // child.material.metalness = 0.0;
      }
    });
  }, [gltf]);

  useEffect(() => {
    if (mesh.current) {
      // Set the new standard position and rotation here
      mesh.current.position.set(0, 0, 0);
      mesh.current.rotation.set(0, 0, 0);

      // Create a master timeline with labels for mesh
      const masterTimeline = gsap
        .timeline()
        .addLabel('start', 0)
        .to(mesh.current.position, { x: mobile ? 1.5 : 2.5, y: mobile ? -4 : -5, z: 0.4, duration: 0.2 })
        .to(mesh.current.rotation, { x: 0, y: 0.2, z: 0, duration: 0.2 }, '<')
        .addLabel('skillsSectionEnd')
        .to(mesh.current.position, { x: 0, y: -10, z: 1, duration: 0.2 })
        .to(mesh.current.rotation, { x: 0.6, y: -0.5, z: 0, duration: 0.2 }, '<')
        .addLabel('softwareSectionEnd')
        .to(mesh.current.position, { x: -3.5, y: -16, z: 1.7, duration: 0.2 })
        .to(mesh.current.rotation, { x: 0.5, y: -0.05, z: 0, duration: 0.2 }, '<')
        .addLabel('portfolioSectionEnd')
        .to(mesh.current.position, { x: -8, y: -19, z: 1.7, duration: 0.2 })
        .to(mesh.current.rotation, { x: 0.5, y: -0.05, z: 0, duration: 0.2 }, '<')
        .addLabel('aboutSectionEnd');

      // Configure ScrollTrigger
      ScrollTrigger.create({
        animation: masterTimeline,
        trigger: '.scroll-section',
        start: 'top top',
        end: 'bottom bottom',
        markers: false,
        scrub: 2,
        immediateRender: true,
        scroller: scrollContainerRef.current,
      });
    }
  }, [mesh.current, scrollContainerRef]);

  return <primitive object={gltf.scene} scale={0.8} ref={mesh} />;
}

function CameraSetup({ scrollPosition, scrollContainerRef, directionalLightRef }) {
  const { camera } = useThree();
  gsap.registerPlugin(ScrollTrigger);
  const { mobile } = useContext(Globals);

  useEffect(() => {
    // console.log('ScrollPosition: ', scrollContainerRef.current.scrollTop);
  }, [scrollPosition]);

  useEffect(() => {
    // Initial camera setup
    camera.position.set(mobile ? 0 : 0.05, 0.7, 7);
    camera.rotation.set(0, 0, 0);
    camera.fov = 50;
    camera.updateProjectionMatrix();

    const masterTimeline = gsap
      .timeline()
      .addLabel('start', 0)
      .to(camera.position, { x: mobile ? 0 : 0.05, y: -6, z: 7, duration: 0.2 })
      .addLabel('skillsSectionEnd')
      .to(camera.position, { x: mobile ? 0 : 0.05, y: -12, z: 7, duration: 0.2 })
      .addLabel('softwareSectionEnd')
      .to(camera.position, { x: mobile ? 0 : 0.05, y: -18, z: 7, duration: 0.2 })
      .addLabel('portfolioSectionEnd')
      .to(camera.position, { x: mobile ? 0 : 0.05, y: -24, z: 7, duration: 0.2 })
      .addLabel('aboutSectionEnd');

    ScrollTrigger.create({
      animation: masterTimeline,
      trigger: '.scroll-section',
      start: 'top top',
      end: 'bottom bottom',
      markers: false,
      scrub: 0.1,
      immediateRender: true,
      scroller: scrollContainerRef.current,
    });
    /*
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-section',
        start: 'top top', // When the top of the trigger hits the top of the viewport
        end: 'bottom bottom', // When the top of the trigger hits the bottom of the viewport
        markers: true,
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
    });*/
  }, [camera, scrollContainerRef]);

  return null;
}

export default function WebgiViewer({ scrollPosition, className, scrollContainerRef }) {
  const directionalLightRef = useRef();

  return (
    <div className={className}>
      <Canvas className=" z-50" style={{ pointerEvents: 'none' }}>
        {/* <EffectComposer> */}
        {/* <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Pixelation granularity={6} /> */}
        {/* <SMAA /> */}
        {/* <SSAO /> */}
        {/* <ambientLight intensity={0.25} /> */}
        <directionalLight position={[1, 1, 1]} intensity={5} ref={directionalLightRef} />
        {/* <Environment files={'/3D/env.hdr'} /> */}
        <Spaceship scrollContainerRef={scrollContainerRef} />
        <CameraSetup
          scrollPosition={scrollPosition}
          scrollContainerRef={scrollContainerRef}
          directionalLightRef={directionalLightRef}
        />
        {/* </EffectComposer> */}
      </Canvas>
    </div>
  );
}
