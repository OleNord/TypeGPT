import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";

import Character from "./Character";
import Button from "./Button";
import { useGameMode } from "../contexts/gameModeContext";
import jsonData from "../../resources/quotes.json";
import TopMenu from "./TopMenu";
import "../styles/typing-game.css";
import "../globals.css";
import AverageWPM from '../components/AverageWpm'

interface Quote {
  quotes: string[];
  description: string;
}

interface QuotesData {
  quotelist: Quote[];
}

interface Story {
  storyParagraph: string[];
  title: string;
}
interface StoryData {
  storyList: Story[];
}


interface TypingState {
  textToType: string;
  userInput: string;
  wordsPerMinute: number;
  startTime: number;
  elapsedTime: number;
  lastResults: number[];
}

const DEFAULT_STATE = {
  textToType: "",
  userInput: "",
  wordsPerMinute: 0,
  startTime: 0,
  elapsedTime: 0,
};

const TypingGame: React.FC = () => {
  const { gameMode } = useGameMode();
  const [ts, setTypingState] = useState(DEFAULT_STATE);
  const {
    elapsedTime,
    startTime,
    textToType,
    userInput,
    wordsPerMinute,
  } = ts;
  const [wordsPerMinuteFinal, setWordsPerMinuteFinal] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [highestWPM, setHighestWPM] = useState<number>(0);
  const storyData: StoryData = jsonData[0];
  const story = storyData.storyList[0];
  const data: QuotesData = jsonData[0];
  const creepyQuotes = data.quotelist[0];
  const despairQuotes = data.quotelist[1];
  const lotrStarWarsQuotes = data.quotelist[2];
  const inputRef = useRef<HTMLInputElement>(null);
  let currentQuotes: Quote = creepyQuotes;
  let currentParagraph: Story = story;
  let charGlobalIndex = 0;
  let paragraphIndex = 0;

  getQuotes();
  const onKeyChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab" && event.key !== "Enter") {
      inputRef.current?.focus();
    }
  };

  const NewGame = () => {
    inputRef?.current?.focus();
    setGameFinished(false);
    if(gameMode !== 'storyMode'){
      const randomQuote =
        currentQuotes.quotes[
          Math.floor(Math.random() * currentQuotes.quotes.length)
        ];
      setTypingState((prevState) => ({
        ...prevState,
        textToType: randomQuote,
        userInput: "",
        wordsPerMinute: 0,
        startTime: 0,
      }));
    }else{
      setTypingState((prevState) => ({
        ...prevState,
        textToType: story.storyParagraph[0],
        userInput: "",
        wordsPerMinute: 0,
        startTime: 0,
      }));
    }
  };

  const ReplayGame = () => {
    setTypingState((prevState) => ({
      ...prevState,
      userInput: "",
      wordsPerMinute: 0,
      startTime: 0
    }));
    setGameFinished(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTypingState((prevState) => ({
      ...prevState,
      userInput: e.target.value,
    }));
    if (!startTime) {
      setTypingState((prevState) => ({ ...prevState, startTime: Date.now() }));
    }
  };

  function getQuotes() {
    if (gameMode === "creepyMode") {
      currentQuotes = creepyQuotes;
    } else if (gameMode === "despairMode") {
      currentQuotes = despairQuotes;
    } else if (gameMode === "lotrStarwarsMode") {
      currentQuotes = lotrStarWarsQuotes;
    }else if (gameMode === "storyMode"){
      currentParagraph = story
    }
  }

  useEffect(() => {
    NewGame();
  }, [gameMode]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (
      userInput.length === textToType.length &&
      userInput === textToType &&
      startTime
    ) {
      setGameFinished(true);
      setWordsPerMinuteFinal(wordsPerMinute);
      if(gameMode === 'storyMode'){
        paragraphIndex++;
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: 0,
          userInput: "",
          wordsPerMinute: 0,
          textToType: currentParagraph.storyParagraph[paragraphIndex],
        }));
      }
      if (wordsPerMinute > highestWPM) {
        setHighestWPM(wordsPerMinute);
      }
      if (!gameFinished) {
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: Date.now() - startTime,
        }));
        clearInterval(intervalId);
      }
    } else if (startTime && !gameFinished) {
      intervalId = setInterval(() => {
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: Date.now() - startTime,
        }));
      }, 50);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, userInput, textToType]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (startTime && !gameFinished) {
      let currentWpm = Math.round(
        (userInput.length / 5) * (60 / (elapsedTime / 1000))
      );
      setTypingState((prevState) => ({
        ...prevState,
        wordsPerMinute: currentWpm,
      }));
    } else if (!startTime) {
      setTypingState((prevState) => ({ ...prevState, wordsPerMinute: 0 }));
      intervalId = setInterval(() => {
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: Date.now() - startTime,
        }));
      }, 50);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, gameFinished, userInput.length, elapsedTime]);

  useEffect(() => {
    if (startTime && !gameFinished) {
      let currentWpm = Math.round(
        (userInput.length / 5) * (60 / (elapsedTime / 1000))
      );
      setTypingState((prevState) => ({
        ...prevState,
        wordsPerMinute: currentWpm,
      }));
    } else if (!startTime) {
      setTypingState((prevState) => ({ ...prevState, wordsPerMinute: 0 }));
    }
  }, [userInput]);

  return (
    <div className="content-wrapper">
      <div onKeyDown={onKeyChange} onClick={() => inputRef.current?.focus()}>
        <div>
          <div className="flex min-h-screen flex-col items-center  font-semibold">
            <TopMenu />
            <h2 className={`fixed items-centered bottom-10 font-mono`}>
              <span className="text">Top WPM </span>
              <span className="variable">{highestWPM.toFixed(0)}</span>
            </h2>
            <h2 className="fixed bottom-10 font-mono right-20">
              <AverageWPM resultWpm={wordsPerMinuteFinal} gameFinished={gameFinished}></AverageWPM>
            </h2>
            <div className="mt-40 items-center">
              <p className="description">"{gameMode !== 'storyMode' ? currentQuotes.description: story.title}"</p>
              {
                <Character
                  textToType={textToType}
                  userInput={userInput}
                  charGlobalIndex={charGlobalIndex}
                />
              }
            </div>
            <div>
              <input
                className="typingInput"
                type="text"
                value={userInput}
                ref={inputRef}
                onInput={handleInputChange}
                autoComplete="off"
              />
            </div>
            <h2 className="live-wpm">
              <span
                style={{
                  color:
                    (!gameFinished ? wordsPerMinute : wordsPerMinuteFinal) === 0
                      ? "transparent"
                      : "inherit",
                }}
              >
                {!gameFinished ? wordsPerMinute : wordsPerMinuteFinal}
              </span>
            </h2>
            <div className="mb-32 grid text-center lg:max-w-sm lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
              <Button name="New Game" onClick={NewGame}></Button>
              <Button name="Retry" onClick={ReplayGame}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingGame;
