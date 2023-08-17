export default function About() {
  const aboutImage = '/about_Mark.jpg';

  return (
    <div className="py-64 bg-black">
      <div className="h-[400px]  flex justify-center">
        <div className="w-2/5">
          <div
            className="bg-contain bg-no-repeat h-96 w-96 ml-auto rounded-md"
            style={{ backgroundImage: `url(${aboutImage})` }}
          ></div>
        </div>
        <div className="w-3/5 pl-12 pr-32 text-white">
          <div className="h-full relative flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-3xl mb-4">About</h2>
              <h2 className="text-2xl">Who am I?</h2>
            </div>
            <div className="text-white mx-auto">
              Der Schwerpunkt meiner kreativen Arbeit liegt vor allem auf der Erschaffung von neuen und alternativen
              Realitäten. Mit 3D-Animationen gelingt es, den Zuschauer in eine Welt zu entführen, in der nicht die
              technischen Limitationen, sondern die Fantasie die Grenzen des Möglichen aufzeigen. Das mag in manchen
              Aufgaben nur die Verzerrung der Wirklichkeit bedeuten, in anderen hingegen ist es die Tür in eine neue,
              alternative Welt.
            </div>
            <div className="h-[1px] bg-white my-4"></div>
            <div>
              <div className="flex space-x-2">
                <div className="uppercase font-black">Education:</div>
                <div>Bachelof or Arts - HS Mainz</div>
              </div>
              <div className="flex space-x-2">
                <div className="uppercase font-black">Experience:</div>
                <div>Freelancer over 10 years</div>
              </div>
              <div className="flex space-x-2">
                <div className="uppercase font-black">Also known for:</div>
                <a href="www.vimage.de">Vimage (Design)</a>
                <div>•</div>
                <a href="www.mayfly-games.com">Mayfly-Games (Gamedev)</a>
                <div>•</div>
                <a href="www.mark-gretzke.com">Mark-Gretzke (Coding)</a>
              </div>
              <div className="flex space-x-2">
                <div className="uppercase font-black">place of residence:</div>
                <div>Ludwigshafen am Rhein</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
