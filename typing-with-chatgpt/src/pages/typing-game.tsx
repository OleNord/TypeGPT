
interface Quote {
  quotes: string[];
  description: string;
}

interface QuotesData {
  quotelist: Quote[];
}
import { useGameMode } from '../app/contexts/gameModeContext';
import React, { useState, useEffect, ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import jsonData from '../resources/quotes.json';
import TopMenu from '../app/components/TopMenu';

const TypingGame: React.FC = () => {
  const { gameMode } = useGameMode();
  const [textToType, setTextToType] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [highestWPM, setHighestWPM] = useState<number>(0);
  const [listOfWPMs, SetListOfWPMs] = useState<number[]>([]);
  const data: QuotesData = jsonData[0];
  const creepyQuotes = data.quotelist[0];
  const despairQuotes = data.quotelist[1];
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
    console.log("mouse has been clicked");

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
    }
  });

  useEffect(() => {    
    const randomIndex: number = Math.floor(Math.random() * currentQuotes.quotes.length);
    const randomQuote: string = currentQuotes.quotes[randomIndex];
    setTextToType(randomQuote);
  }, [gameMode]);
  

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (userInput.length === textToType.length && userInput === textToType && startTime) {
      setGameFinished(true);
      
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

  useEffect(() => {
    document.addEventListener('mousedown', mouseClick);
    return () => {
      document.removeEventListener('mousedown', mouseClick);
    };
  }, []);

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
            <div className="mt-40 ">
            {
              textToType.split("").map((char, charIndex) => {
                const currentChar = userInput[charGlobalIndex] || "";  // fetch char from userInput

                let color = 'rgb(92, 117, 33)'; 
                let displayChar = char; 

                if (char === " ") {
                  displayChar = "_";  
                  color = 'transparent'
                }
                if(currentChar === '_') {
                  (color = currentChar === char ? 'transparent' : 'red')
                }
                else if(currentChar && currentChar != '_') {
                  (color = currentChar === char ? 'rgb(134, 199, 2)' : 'red')
                }
                charGlobalIndex++; 

                return (
                  <span key={charIndex} style={{ fontSize: "23px", color: color }}>
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
          color: (wordsPerMinute === 0) ? 'transparent' : undefined,
          fontSize: '50px'
      }}
        id="wpm" className={`mt-20 mb-10 items-center text-center
         text-4xl font-semibold`}>
          {wordsPerMinute}{" "}
        </h2>
      </div>
      <button style={{fontSize: "25px"}} onClick={NewGame}>New Game</button>
      <button style={{fontSize: "25px"}} onClick={ReplayGame}>Replay</button>
    </div>
  </div>
  );
};
export default TypingGame;




 