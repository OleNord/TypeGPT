"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
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
var AverageWpm = function (_a) {
    var resultWpm = _a.resultWpm, gameFinished = _a.gameFinished;
    var _b = react_1.useState(0), averageWpm = _b[0], setAverageWpm = _b[1];
    var _c = react_1.useState([]), listOfWpms = _c[0], setListOfWpms = _c[1];
    react_1.useEffect(function () {
        if (gameFinished) {
            setListOfWpms(function (prevGames) {
                var updatedGames = __spreadArrays(prevGames, [resultWpm]);
                if (updatedGames.length > 20) {
                    updatedGames.shift();
                }
                console.log(listOfWpms);
                return updatedGames;
            });
        }
    }, [gameFinished, resultWpm]);
    var calculateAverageWPM = function () {
        if (listOfWpms.length === 0)
            return 0;
        var total = listOfWpms.reduce(function (acc, wpm) { return acc + wpm; }, 0);
        return total / listOfWpms.length;
    };
    var averageWPM = calculateAverageWPM();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h2", { className: "fixed bottom-10 font-mono right-20" },
            react_1["default"].createElement("span", null, "Average WPM:  "),
            react_1["default"].createElement("span", null, averageWPM.toFixed(0)))));
};
exports["default"] = AverageWpm;
