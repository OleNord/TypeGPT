import React,{ChangeEvent} from "react";
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("it works!")
  };
  return (
    <div className="text-center font-mono font-bold lg:max-w-screen-lg   lg:w-full lg:mb-0 lg:text-center w-0.5" >
        <div>
          <div className="text-to-type items-center">
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
  );
};

export default Character;
