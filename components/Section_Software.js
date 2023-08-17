import { Software } from './Component_Software';

export default function SoftwareSection() {
  return (
    <div className="h-[500px] flex flex-col justify-center items-center bg-white animate__animated animate__fadeIn">
      <h2 className="text-6xl pb-8 text-black">Software & Languages</h2>
      <div className="grid grid-cols-6 text-center py-2 w-full">
        <Software software={'C4D'} className="animate__animated animate__bounce" />
        <Software software={'After Effects'} className="animate__animated animate__shakeX" />
        <Software software={'Octane'} className="animate__animated animate__pulse" />
        <Software software={'Unity'} className="animate__animated animate__rubberBand" />
        <Software software={'Solidity'} className="animate__animated animate__tada" />
        <Software software={'Webdev'} className="animate__animated animate__wobble" />
      </div>
    </div>
  );
}
