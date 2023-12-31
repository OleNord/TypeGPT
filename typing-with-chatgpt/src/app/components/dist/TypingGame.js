"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Character_1 = require("./Character");
var Button_1 = require("./Button");
var gameModeContext_1 = require("../contexts/gameModeContext");
var quotes_json_1 = require("../../resources/quotes.json");
var TopMenu_1 = require("./TopMenu");
require("../styles/typing-game.css");
require("../globals.css");
var AverageWpm_1 = require("../components/AverageWpm");
var DEFAULT_STATE = {
    textToType: "",
    userInput: "",
    wordsPerMinute: 0,
    startTime: 0,
    elapsedTime: 0
};
var TypingGame = function () {
    var gameMode = gameModeContext_1.useGameMode().gameMode;
    var _a = react_1.useState(DEFAULT_STATE), ts = _a[0], setTypingState = _a[1];
    var elapsedTime = ts.elapsedTime, startTime = ts.startTime, textToType = ts.textToType, userInput = ts.userInput, wordsPerMinute = ts.wordsPerMinute;
    var _b = react_1.useState(0), wordsPerMinuteFinal = _b[0], setWordsPerMinuteFinal = _b[1];
    var _c = react_1.useState(false), gameFinished = _c[0], setGameFinished = _c[1];
    var _d = react_1.useState(0), highestWPM = _d[0], setHighestWPM = _d[1];
    var storyData = quotes_json_1["default"][0];
    var story = storyData.storyList[0];
    var data = quotes_json_1["default"][0];
    var creepyQuotes = data.quotelist[0];
    var despairQuotes = data.quotelist[1];
    var lotrStarWarsQuotes = data.quotelist[2];
    var inputRef = react_1.useRef(null);
    var currentQuotes = creepyQuotes;
    var currentParagraph = story;
    var charGlobalIndex = 0;
    var paragraphIndex = 0;
    getQuotes();
    var onKeyChange = function (event) {
        var _a;
        if (event.key !== "Tab" && event.key !== "Enter") {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    var NewGame = function () {
        var _a;
        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setGameFinished(false);
        if (gameMode !== 'storyMode') {
            var randomQuote_1 = currentQuotes.quotes[Math.floor(Math.random() * currentQuotes.quotes.length)];
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { textToType: randomQuote_1, userInput: "", wordsPerMinute: 0, startTime: 0 })); });
        }
        else {
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { textToType: story.storyParagraph[0], userInput: "", wordsPerMinute: 0, startTime: 0 })); });
        }
    };
    var ReplayGame = function () {
        setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { userInput: "", wordsPerMinute: 0, startTime: 0 })); });
        setGameFinished(false);
    };
    var handleInputChange = function (e) {
        setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { userInput: e.target.value })); });
        if (!startTime) {
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { startTime: Date.now() })); });
        }
    };
    function getQuotes() {
        if (gameMode === "creepyMode") {
            currentQuotes = creepyQuotes;
        }
        else if (gameMode === "despairMode") {
            currentQuotes = despairQuotes;
        }
        else if (gameMode === "lotrStarwarsMode") {
            currentQuotes = lotrStarWarsQuotes;
        }
        else if (gameMode === "storyMode") {
            currentParagraph = story;
        }
    }
    react_1.useEffect(function () {
        NewGame();
    }, [gameMode]);
    react_1.useEffect(function () {
        var intervalId;
        if (userInput.length === textToType.length &&
            userInput === textToType &&
            startTime) {
            setGameFinished(true);
            setWordsPerMinuteFinal(wordsPerMinute);
            if (gameMode === 'storyMode') {
                paragraphIndex++;
                setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { elapsedTime: 0, userInput: "", wordsPerMinute: 0, textToType: currentParagraph.storyParagraph[paragraphIndex] })); });
            }
            if (wordsPerMinute > highestWPM) {
                setHighestWPM(wordsPerMinute);
            }
            if (!gameFinished) {
                setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { elapsedTime: Date.now() - startTime })); });
                clearInterval(intervalId);
            }
        }
        else if (startTime && !gameFinished) {
            intervalId = setInterval(function () {
                setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { elapsedTime: Date.now() - startTime })); });
            }, 50);
        }
        return function () {
            if (intervalId)
                clearInterval(intervalId);
        };
    }, [startTime, userInput, textToType]);
    react_1.useEffect(function () {
        var intervalId;
        if (startTime && !gameFinished) {
            var currentWpm_1 = Math.round((userInput.length / 5) * (60 / (elapsedTime / 1000)));
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { wordsPerMinute: currentWpm_1 })); });
        }
        else if (!startTime) {
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { wordsPerMinute: 0 })); });
            intervalId = setInterval(function () {
                setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { elapsedTime: Date.now() - startTime })); });
            }, 50);
        }
        return function () {
            if (intervalId)
                clearInterval(intervalId);
        };
    }, [startTime, gameFinished, userInput.length, elapsedTime]);
    react_1.useEffect(function () {
        if (startTime && !gameFinished) {
            var currentWpm_2 = Math.round((userInput.length / 5) * (60 / (elapsedTime / 1000)));
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { wordsPerMinute: currentWpm_2 })); });
        }
        else if (!startTime) {
            setTypingState(function (prevState) { return (__assign(__assign({}, prevState), { wordsPerMinute: 0 })); });
        }
    }, [userInput]);
    return (react_1["default"].createElement("div", { className: "content-wrapper" },
        react_1["default"].createElement("div", { onKeyDown: onKeyChange, onClick: function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); } },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "flex min-h-screen flex-col items-center  font-semibold" },
                    react_1["default"].createElement(TopMenu_1["default"], null),
                    react_1["default"].createElement("h2", { className: "fixed items-centered bottom-10 font-mono" },
                        react_1["default"].createElement("span", { className: "text" }, "Top WPM "),
                        react_1["default"].createElement("span", { className: "variable" }, highestWPM.toFixed(0))),
                    react_1["default"].createElement("h2", { className: "fixed bottom-10 font-mono right-20" },
                        react_1["default"].createElement(AverageWpm_1["default"], { resultWpm: wordsPerMinuteFinal, gameFinished: gameFinished })),
                    react_1["default"].createElement("div", { className: "mt-40 items-center" },
                        react_1["default"].createElement("p", { className: "description" },
                            "\"",
                            gameMode !== 'storyMode' ? currentQuotes.description : story.title,
                            "\""),
                        react_1["default"].createElement(Character_1["default"], { textToType: textToType, userInput: userInput, charGlobalIndex: charGlobalIndex })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("input", { className: "typingInput", type: "text", value: userInput, ref: inputRef, onInput: handleInputChange, autoComplete: "off" })),
                    react_1["default"].createElement("h2", { className: "live-wpm" },
                        react_1["default"].createElement("span", { style: {
                                color: (!gameFinished ? wordsPerMinute : wordsPerMinuteFinal) === 0
                                    ? "transparent"
                                    : "inherit"
                            } }, !gameFinished ? wordsPerMinute : wordsPerMinuteFinal)),
                    react_1["default"].createElement("div", { className: "mb-32 grid text-center lg:max-w-sm lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left" },
                        react_1["default"].createElement(Button_1["default"], { name: "New Game", onClick: NewGame }),
                        react_1["default"].createElement(Button_1["default"], { name: "Retry", onClick: ReplayGame })))))));
};
exports["default"] = TypingGame;
