"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/character.css");
var Character = function (_a) {
    var textToType = _a.textToType, userInput = _a.userInput, charGlobalIndex = _a.charGlobalIndex;
    var handleInputChange = function (e) {
        console.log("it works!");
    };
    return (react_1["default"].createElement("div", { className: "text-center font-mono font-bold lg:max-w-screen-lg   lg:w-full lg:mb-0 lg:text-center w-0.5" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "text-to-type items-center", onChange: handleInputChange }, textToType.split("").map(function (char, charIndex) {
                var currentChar = userInput[charGlobalIndex++] || "";
                var color = "";
                var displayChar = char;
                if (char === " ") {
                    if (currentChar === " ") {
                        color = "transparent";
                        displayChar = "_";
                    }
                    else if (currentChar !== "") {
                        color = "red";
                        displayChar = "_";
                    }
                    else {
                        color = "transparent";
                        displayChar = "_";
                    }
                }
                else {
                    color =
                        currentChar === char
                            ? "rgb(250, 192, 2)"
                            : currentChar
                                ? "red"
                                : "rgb(156, 66, 2)";
                }
                return (react_1["default"].createElement("span", { key: charIndex, style: { color: color } }, displayChar));
            })))));
};
exports["default"] = Character;
