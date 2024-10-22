import { useEffect, useState } from 'react';

const drumPads = [
  {
    key: 'Q',
    text: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    key: 'W',
    text: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    key: 'E',
    text: 'Heater 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    key: 'A',
    text: 'Heater 4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    key: 'S',
    text: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    key: 'D',
    text: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    key: 'Z',
    text: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    key: 'X',
    text: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    key: 'C',
    text: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const App = () => {
  const [displayText, setDisplayText] = useState('');

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      const pad = drumPads.find((p) => p.key === key);
      setDisplayText(pad.text);

      // Add visual feedback
      const element = document.getElementById(`pad-${key}`);
      if (element) {
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 100);
      }
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const pad = drumPads.find((p) => p.key === key);
    if (pad) {
      playSound(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependencies array is empty since handleKeyPress doesn't depend on any props or state

  return (
    <main>
      <div id="drum-machine" className="container">
        <h1>Drum Machine App</h1>
        <div id="display">{displayText}</div>
        <div className="drum-pad-container">
          {drumPads.map(({ key, url }) => (
            <button
              className="drum-pad"
              key={key}
              id={`pad-${key}`}
              onClick={() => playSound(key)}
            >
              {key}
              <audio className="clip" id={key} src={url}></audio>
            </button>
          ))}
        </div>
      </div>
      <p>By Kholid</p>
    </main>
  );
};

export default App;
