import { Software } from './Component_Software';

export default function SoftwareSection() {
  return (
    <div className="h-[500px] flex flex-col justify-center items-center bg-white">
      <h2 className="text-6xl pb-8 text-black">Software & Languages</h2>
      <div className="grid grid-cols-6 text-center py-2 w-full">
        <Software software={'C4D'} />
        <Software software={'After Effects'} />
        <Software software={'Octane'} />
        <Software software={'Unity'} />
        <Software software={'Solidity'} />
        <Software software={'Webdev'} />
      </div>
    </div>
  );
}
