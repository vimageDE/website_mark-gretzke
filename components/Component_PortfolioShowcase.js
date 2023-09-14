import React, { useEffect, useState } from 'react';

export default function PortfolioShowcase({ project }) {
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);

  const handleMetadataLoaded = (e) => {
    setVideoWidth(e.target.videoWidth);
    setVideoHeight(e.target.videoHeight);
  };

  return (
    <div>
      <div className="w-2/5 flex">
        <div
          key={project.title}
          className="project-slide active relative overflow-hidden my-auto"
          style={{
            width: '100%',
            maxWidth: videoHeight > videoWidth ? '500px' : '1400px',
            height: '25vw',
            maskImage: 'url(/MaskTest.png)',
            webkitMaskImage: 'url(/MaskTest.png)',
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={'/projects/' + project.media}
            alt={project.title}
            autoPlay
            loop
            muted
            onLoadedMetadata={handleMetadataLoaded}
          ></video>
          <img src="/MaskTest.png" className={`h-[500px]`}></img>
        </div>
      </div>
    </div>
  );
}
