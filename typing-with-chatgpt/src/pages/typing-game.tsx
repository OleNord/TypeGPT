
interface Quote {
  quotes: string[];
  description: string;
}

interface QuotesData {
  quotelist: Quote[];
}
import { useGameMode } from '../app/contexts/gameModeContext';
import React, { useState, useEffect, ChangeEvent, KeyboardEvent} from "react";
import jsonData from '../resources/quotes.json';
import TopMenu from '../app/components/TopMenu';

const TypingGame: React.FC = () => {
  const { gameMode } = useGameMode();
  const [textToType, setTextToType] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [wordsPerMinuteFinal, setWordsPerMinuteFinal] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [highestWPM, setHighestWPM] = useState<number>(0);
  const data: QuotesData = jsonData[0];
  const creepyQuotes = data.quotelist[0];
  const despairQuotes = data.quotelist[1];
  const lotrStarWarsQuotes = data.quotelist[2];
  let currentQuotes = gameMode === 'creepyMode' ? creepyQuotes : despairQuotes;
  let charGlobalIndex = 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (!startTime) setStartTime(Date.now());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputElement = document.getElementById('typingInput');
    if(inputElement) {
      inputElement.focus();
    }
  };

  const mouseClick = (e: Event) => {
    const inputElement = document.getElementById('typingInput');
    if(inputElement) {
      setTimeout(() => {
          inputElement.focus();
      }, 100);
    }
  };

  useEffect(() =>{
    if(gameMode === 'creepyMode'){
      currentQuotes = creepyQuotes;
    }else if(gameMode === 'despairMode'){
      currentQuotes = despairQuotes;
    }else if (gameMode === 'lotrStarwarsMode'){
      currentQuotes = lotrStarWarsQuotes;
    }
  });

  useEffect(() => {    
    NewGame();
  }, [gameMode]);
  

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (userInput.length === textToType.length && userInput === textToType && startTime) {
      setGameFinished(true);
      setWordsPerMinuteFinal(wordsPerMinute);
      if (wordsPerMinute > highestWPM){
        setHighestWPM((wordsPerMinute))
      }

      if (!gameFinished) setElapsedTime(Date.now() - startTime);
      clearInterval(intervalId);

    } else if (startTime && !gameFinished) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, userInput, textToType]);

  useEffect(() =>{
    if(startTime && !gameFinished){
      let currentWpm = Math.round((userInput.length / 5) * (60 / (elapsedTime / 1000)));
      setWordsPerMinute(currentWpm);
    }else if(!startTime){
      setWordsPerMinute(0)
    }
  })

  useEffect(() => {
    const inputElement = document.getElementById('typingInput');
    if(inputElement) {
      inputElement.focus();
    }
  }, []);

  
  const NewGame = () =>{
    console.log("Current quote description: ",currentQuotes.description)
    
    setGameFinished(false);
    setUserInput("");
    setStartTime(null);
    setWordsPerMinute(0);

    const randomIndex: number = Math.floor(Math.random() * currentQuotes.quotes.length);
    const randomQuote: string = currentQuotes.quotes[randomIndex];
    setTextToType(randomQuote);

    const inputElement = document.getElementById('typingInput');
    if(inputElement) {
      setTimeout(() => {
          inputElement.focus();
      }, 100);
    }
  }

  const ReplayGame = () =>{
    setGameFinished(false);
    setUserInput("");
    setStartTime(null);
    setWordsPerMinute(0);
    const inputElement = document.getElementById('typingInput');
    if(inputElement) {
      setTimeout(() => {
          inputElement.focus();
      }, 100);
    }
  }

  return (
    <div>
    <div className="flex min-h-screen flex-col items-center h-48 font-semibold border" >
    <TopMenu />

      {startTime && (
      <h2 style={{fontSize: 20}} className={`fixed bottom-10 right-10 font-mono`}>Time: {(elapsedTime / 1000).toFixed(1)} seconds</h2>)}
      <h2 style={{fontSize: 20}} className={`fixed items-centered bottom-10 font-mono`}>Highest WPM: {highestWPM.toFixed(0)}</h2>
      <div>
        <div className="text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5" >
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <div className="mt-40" style={{height: 70 }}>
            {textToType.split("").map((char, charIndex) => {
              const currentChar = userInput[charGlobalIndex] || "";  // fetch char from userInput

              let color = 'rgb(186, 84, 11)'; 
              let displayChar = char; 

              if (char === " ") {
                if (currentChar === " ") {
                  color = 'transparent';  // Make space transparent when correctly typed
                  displayChar = "_";  // Still using underscore for layout but it'll be invisible
                } else if (currentChar !== "") {
                  color = 'red';  // Make underscore red when space is incorrectly typed
                  displayChar = "_";
                } else {
                  color = 'transparent';  // User hasn't reached this character yet
                  displayChar = "_";
                }
              } else {
                color = currentChar === char ? 'rgb(250, 192, 2)' : (currentChar ? 'red' : 'rgb(245, 109, 12)');
              }
              
              charGlobalIndex++;

              return (
                <span key={charIndex} style={{ fontSize: "20px", color: color }}>
                  {displayChar}
                </span>
              );
            })
            }
            </div>
          </div>
        </div>
      </div>
      <div>
        <input
          id="typingInput"
          type="text"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          autoComplete="off"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: "100%",
            height: '100%',
            opacity: 0,
            zIndex: -1,
            outline: "none",
            border: "none"
          }}
        />
        <p className="mt-5 font-mono italic">"{currentQuotes.description}"</p>
        <h2 
        style={{ 
          color: (wordsPerMinute === 0) ? 'transparent' : 'rgb(250, 192, 2)',
          fontSize: '50px'
      }}
        id="wpm" className={`mt-10 mb-10 items-center text-center
         text-4xl font-semibold`}>
          {!gameFinished ? wordsPerMinute : wordsPerMinuteFinal}{" "}
        </h2>
      </div>
      <button style={{fontSize: "25px"}} onClick={NewGame}>New Game</button>
      <button style={{fontSize: "25px"}} onClick={ReplayGame}>Replay</button>
    </div>
  </div>
  );
};
export default TypingGame;




 