import React, { useEffect } from 'react';

function BubbleComponent() {
  useEffect(() => {
    function createBubble() {
      return;
      const bubble = document.createElement('div');
      bubble.classList.add('bubble', 'absolute', '-bottom-96', 'opacity-0');
      bubble.style.left = `${Math.random() * 500}vw`;
      bubble.style.width = `${Math.random() * 500}px`;
      bubble.style.height = bubble.style.width;
      document.getElementById('bubble-container').appendChild(bubble);

      // Remove the bubble after animation
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }

    // Create bubbles at random intervals
    const intervalId = setInterval(createBubble, 1600);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div id="bubble-container" className="fixed w-screen h-screen top-0 left-0 pointer-events-none z-50">
      {/* Bubbles will be appended here */}
    </div>
  );
}

export default BubbleComponent;
