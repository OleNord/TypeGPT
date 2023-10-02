import React, { useState, useEffect, ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import quotes from '../../public/creepy_quotes.json';
import TopMenu from '../app/components/TopMenu';
const TypingGame: React.FC = () => {
  const [textToType, setTextToType] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [highestWPM, setHighestWPM] = useState<number>(0);
  const [listOfWPMs, SetListOfWPMs] = useState<number[]>([10]);
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

    console.log(inputElement)
    if(inputElement) {
      setTimeout(() => {
          inputElement.focus();
      }, 100);
    }
  };

  useEffect(() => {
    if (!startTime) {
        const newListOfWPMs = [wordsPerMinute, ...listOfWPMs];  // Add the new WPM to the beginning
        while (newListOfWPMs.length > 10) {   // Ensure the list doesn't exceed 10 items
            newListOfWPMs.pop();   // Remove the oldest WPM
        }
        SetListOfWPMs(newListOfWPMs);
    }
}, [startTime, wordsPerMinute, listOfWPMs]);

  useEffect(() => {    
    const randomIndex: number = Math.floor(Math.random() * quotes.length);
    const randomQuote: string = quotes[randomIndex];
    setTextToType(randomQuote);
  }, []);
  

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
    setGameFinished(false);
    setUserInput("");
    setStartTime(null);
    setWordsPerMinute(0);

    const randomIndex: number = Math.floor(Math.random() * quotes.length);
    const randomQuote: string = quotes[randomIndex];
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
    <div className="flex-row">
    <TopMenu />
    <div className="flex min-h-screen flex-col items-center font-mono h-48 font-semibold border" >

      {startTime && (
      <h2 style={{fontSize: 20}} className={`fixed top-3 right-3 font-mono`}>Time: {(elapsedTime / 1000).toFixed(1)} seconds</h2>)}
      <h2 style={{fontSize: 20}} className={`fixed bottom-10 right-10 font-mono`}>Highest WPM: {highestWPM.toFixed(0)}</h2>
      <h2 style={{fontSize: 15}} className={`fixed bottom-50 left-10 font-mono`}>List of last 10 scores:<br></br> {listOfWPMs[1]}</h2>
      <h2 className={`text-4xl  mt-20 mb-20 ` }>
        Typing with ChatGPT
      </h2>
      <div>
        <div className="text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5" >
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <div className="mt-20 ">
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
        <p className="mt-5 font-mono">"Real quotes with a creepy twist, by Chat GPT"</p>
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




 