import { list } from "postcss";
import React, { useState, useEffect } from "react";

interface AverageWpmProps {
  resultWpm: number;
  gameFinished: boolean;
}

// function calcAverage(listOfWpms: number[]) {
//   let averageWpm = 0;
//   if (listOfWpms.length == 1 && listOfWpms[0] == 0) {
//     listOfWpms.pop();
//   }
//   listOfWpms.forEach((element) => {
//     averageWpm = +element;
//   });
//   console.log(listOfWpms)
//   return averageWpm / listOfWpms.length;
// }


const AverageWpm: React.FC<AverageWpmProps> = ({ resultWpm, gameFinished }) => {
  const [averageWpm, setAverageWpm] = useState<number>(0);
  const [listOfWpms, setListOfWpms] = useState<number[]>([]);

  useEffect(() => {
    if (gameFinished) {
      setListOfWpms((prevGames) => {
        const updatedGames = [...prevGames, resultWpm];
        if (updatedGames.length > 20) {
          updatedGames.shift();
        }
        console.log(listOfWpms)
        return updatedGames;
      });
    }
  }, [gameFinished, resultWpm]);

  const calculateAverageWPM = () => {
    if (listOfWpms.length === 0) return 0;
    const total = listOfWpms.reduce((acc, wpm) => acc + wpm, 0);
    return total / listOfWpms.length;
};

const averageWPM = calculateAverageWPM();

  return (
    <div>
      <h2 className="fixed bottom-10 font-mono right-20">
        <span >Average WPM:  </span>
        <span >{averageWPM.toFixed(0)}</span>
      </h2>
    </div>
  );
};

export default AverageWpm;
