import React from "react";
import '../styles/character.css'

interface CharacterProps {
  textToType: string;
  userInput: string;
  charGlobalIndex: number;
}

const Character: React.FC<CharacterProps> = ({
  textToType,
  userInput,
  charGlobalIndex,
}) => {
  return (
    <div className="text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5" >
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <div className="" style={{ height: 60 }}>
          <div className="text-to-type">
            {textToType.split("").map((char, charIndex) => {
              const currentChar = userInput[charGlobalIndex++] || "";
              let color = "";
              let displayChar = char;
              if (char === " ") {
                if (currentChar === " ") {
                  color = "transparent";
                  displayChar = "_";
                } else if (currentChar !== "") {
                  color = "red";
                  displayChar = "_";
                } else {
                  color = "transparent";
                  displayChar = "_";
                }
              } else {
                color =
                  currentChar === char
                    ? "rgb(250, 192, 2)"
                    : currentChar
                    ? "red"
                    : "rgb(156, 66, 2)";
              }

              return (
                <span key={charIndex} style={{ color: color }}>
                  {displayChar}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
