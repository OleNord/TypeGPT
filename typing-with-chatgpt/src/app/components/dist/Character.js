"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/character.css");
var Character = function (_a) {
    var textToType = _a.textToType, userInput = _a.userInput, charGlobalIndex = _a.charGlobalIndex;
    return (react_1["default"].createElement("div", { className: "text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5" },
        react_1["default"].createElement("div", { className: "fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none" },
            react_1["default"].createElement("div", { className: "", style: { height: 60 } },
                react_1["default"].createElement("div", { className: "text-to-type" }, textToType.split("").map(function (char, charIndex) {
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
                }))))));
};
exports["default"] = Character;
