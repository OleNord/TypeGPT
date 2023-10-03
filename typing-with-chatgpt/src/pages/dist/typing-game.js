"use strict";
exports.__esModule = true;
var gameModeContext_1 = require("../app/contexts/gameModeContext");
var react_1 = require("react");
var quotes_json_1 = require("../resources/quotes.json");
var TopMenu_1 = require("../app/components/TopMenu");
var TypingGame = function () {
    var gameMode = gameModeContext_1.useGameMode().gameMode;
    var _a = react_1.useState(""), textToType = _a[0], setTextToType = _a[1];
    var _b = react_1.useState(""), userInput = _b[0], setUserInput = _b[1];
    var _c = react_1.useState(null), startTime = _c[0], setStartTime = _c[1];
    var _d = react_1.useState(0), elapsedTime = _d[0], setElapsedTime = _d[1];
    var _e = react_1.useState(0), wordsPerMinute = _e[0], setWordsPerMinute = _e[1];
    var _f = react_1.useState(false), gameFinished = _f[0], setGameFinished = _f[1];
    var _g = react_1.useState(0), highestWPM = _g[0], setHighestWPM = _g[1];
    var _h = react_1.useState([]), listOfWPMs = _h[0], SetListOfWPMs = _h[1];
    var data = quotes_json_1["default"][0];
    var creepyQuotes = data.quotelist[0];
    var despairQuotes = data.quotelist[1];
    var currentQuotes = gameMode === 'creepyMode' ? creepyQuotes : despairQuotes;
    var charGlobalIndex = 0;
    var handleInputChange = function (e) {
        setUserInput(e.target.value);
        if (!startTime)
            setStartTime(Date.now());
    };
    var handleKeyDown = function (e) {
        var inputElement = document.getElementById('typingInput');
        if (inputElement) {
            inputElement.focus();
        }
    };
    var mouseClick = function (e) {
        console.log("mouse has been clicked");
        var inputElement = document.getElementById('typingInput');
        if (inputElement) {
            setTimeout(function () {
                inputElement.focus();
            }, 100);
        }
    };
    react_1.useEffect(function () {
        if (gameMode === 'creepyMode') {
            currentQuotes = creepyQuotes;
        }
        else if (gameMode === 'despairMode') {
            currentQuotes = despairQuotes;
        }
    });
    react_1.useEffect(function () {
        var randomIndex = Math.floor(Math.random() * currentQuotes.quotes.length);
        var randomQuote = currentQuotes.quotes[randomIndex];
        setTextToType(randomQuote);
    }, [gameMode]);
    react_1.useEffect(function () {
        var intervalId;
        if (userInput.length === textToType.length && userInput === textToType && startTime) {
            setGameFinished(true);
            if (wordsPerMinute > highestWPM) {
                setHighestWPM((wordsPerMinute));
            }
            if (!gameFinished)
                setElapsedTime(Date.now() - startTime);
            clearInterval(intervalId);
        }
        else if (startTime && !gameFinished) {
            intervalId = setInterval(function () {
                setElapsedTime(Date.now() - startTime);
            }, 50);
        }
        return function () {
            if (intervalId)
                clearInterval(intervalId);
        };
    }, [startTime, userInput, textToType]);
    react_1.useEffect(function () {
        document.addEventListener('mousedown', mouseClick);
        return function () {
            document.removeEventListener('mousedown', mouseClick);
        };
    }, []);
    react_1.useEffect(function () {
        if (startTime && !gameFinished) {
            var currentWpm = Math.round((userInput.length / 5) * (60 / (elapsedTime / 1000)));
            setWordsPerMinute(currentWpm);
        }
        else if (!startTime) {
            setWordsPerMinute(0);
        }
    });
    react_1.useEffect(function () {
        var inputElement = document.getElementById('typingInput');
        if (inputElement) {
            inputElement.focus();
        }
    }, []);
    var NewGame = function () {
        console.log("Current quote description: ", currentQuotes.description);
        setGameFinished(false);
        setUserInput("");
        setStartTime(null);
        setWordsPerMinute(0);
        var randomIndex = Math.floor(Math.random() * currentQuotes.quotes.length);
        var randomQuote = currentQuotes.quotes[randomIndex];
        setTextToType(randomQuote);
        var inputElement = document.getElementById('typingInput');
        if (inputElement) {
            setTimeout(function () {
                inputElement.focus();
            }, 100);
        }
    };
    var ReplayGame = function () {
        setGameFinished(false);
        setUserInput("");
        setStartTime(null);
        setWordsPerMinute(0);
        var inputElement = document.getElementById('typingInput');
        if (inputElement) {
            setTimeout(function () {
                inputElement.focus();
            }, 100);
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "flex min-h-screen flex-col items-center h-48 font-semibold border" },
            react_1["default"].createElement(TopMenu_1["default"], null),
            startTime && (react_1["default"].createElement("h2", { style: { fontSize: 20 }, className: "fixed bottom-10 right-10 font-mono" },
                "Time: ",
                (elapsedTime / 1000).toFixed(1),
                " seconds")),
            react_1["default"].createElement("h2", { style: { fontSize: 20 }, className: "fixed items-centered bottom-10 font-mono" },
                "Highest WPM: ",
                highestWPM.toFixed(0)),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5" },
                    react_1["default"].createElement("div", { className: "fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none" },
                        react_1["default"].createElement("div", { className: "mt-40 " }, textToType.split("").map(function (char, charIndex) {
                            var currentChar = userInput[charGlobalIndex] || ""; // fetch char from userInput
                            var color = 'rgb(92, 117, 33)';
                            var displayChar = char;
                            if (char === " ") {
                                displayChar = "_";
                                color = 'transparent';
                            }
                            if (currentChar === '_') {
                                (color = currentChar === char ? 'transparent' : 'red');
                            }
                            else if (currentChar && currentChar != '_') {
                                (color = currentChar === char ? 'rgb(134, 199, 2)' : 'red');
                            }
                            charGlobalIndex++;
                            return (react_1["default"].createElement("span", { key: charIndex, style: { fontSize: "23px", color: color } }, displayChar));
                        }))))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("input", { id: "typingInput", type: "text", value: userInput, onKeyDown: handleKeyDown, onChange: handleInputChange, autoComplete: "off", style: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: '100%',
                        opacity: 0,
                        zIndex: -1,
                        outline: "none",
                        border: "none"
                    } }),
                react_1["default"].createElement("p", { className: "mt-5 font-mono italic" },
                    "\"",
                    currentQuotes.description,
                    "\""),
                react_1["default"].createElement("h2", { style: {
                        color: (wordsPerMinute === 0) ? 'transparent' : undefined,
                        fontSize: '50px'
                    }, id: "wpm", className: "mt-20 mb-10 items-center text-center\n         text-4xl font-semibold" },
                    wordsPerMinute,
                    " ")),
            react_1["default"].createElement("button", { style: { fontSize: "25px" }, onClick: NewGame }, "New Game"),
            react_1["default"].createElement("button", { style: { fontSize: "25px" }, onClick: ReplayGame }, "Replay"))));
};
exports["default"] = TypingGame;
