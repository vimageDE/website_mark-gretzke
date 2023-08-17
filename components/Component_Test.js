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

export default ScrollSnapExample;
