export default function About() {
  const aboutImage = '/about_Mark.jpg';

  return (
    <div>
      <div className="h-[250px] bg-black flex flex-col">
        <div className="h-full relative flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl">About</h2>
            <h2 className="text-2xl">the story behind</h2>
          </div>
        </div>
      </div>
      <div className="h-[400px] bg-black flex justify-center">
        <div className="w-2/5">
          <div
            className="bg-contain bg-no-repeat h-96 w-96 ml-auto rounded-md"
            style={{ backgroundImage: `url(${aboutImage})` }}
          ></div>
        </div>
        <div className="w-3/5">
          <div className="text-white mx-auto"> description text about me</div>
        </div>
      </div>
    </div>
  );
}
