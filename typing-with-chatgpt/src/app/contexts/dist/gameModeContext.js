"use strict";
exports.__esModule = true;
exports.useGameMode = exports.GameModeProvider = void 0;
var react_1 = require("react");
var GameModeContext = react_1.createContext(undefined);
exports.GameModeProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState('creepyMode'), gameMode = _b[0], setGameMode = _b[1];
    return (react_1["default"].createElement(GameModeContext.Provider, { value: { gameMode: gameMode, setGameMode: setGameMode } }, children));
};
exports.useGameMode = function () {
    var context = react_1.useContext(GameModeContext);
    if (context === undefined) {
        throw new Error('useGameMode must be used within a GameModeProvider');
    }
    return context;
};
