export default function Hero() {
  const clientsImage = '/Clients_all.png';

  return (
    <div className="relative h-[800px] bg-black bg-opacity-10 flex flex-col">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10 blur-lg">
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text more readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="h-full relative flex flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-9xl">Mark Gretzke</h2>
          <h2 className="text-2xl">Design & Code</h2>
        </div>
        <div className="absolute bottom-0">
          <div className="pl-8 text-xs text-left text-white -mb-6">worked on projects for:</div>
          <div
            className="bg-contain h-40 w-screen text-white"
            style={{ backgroundImage: `url(${clientsImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function HeroImage() {
  const heroImage = '/background-image1.jpg';
  const heroVideo = '/background-video.mp4';
  const clientsImage = '/Clients_all.png';

  return (
    <div
      className="bg-cover h-[800px] bg-black bg-opacity-10 bg-fixed flex flex-col"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="h-full relative flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-9xl">Mark Gretzke</h2>
          <h2 className="text-2xl">Design & Code</h2>
        </div>
        <div className="absolute bottom-0">
          <div className="pl-8 text-xs text-left text-white -mb-6">worked on projects for:</div>
          <div
            className="bg-contain h-40 w-screen text-white"
            style={{ backgroundImage: `url(${clientsImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
