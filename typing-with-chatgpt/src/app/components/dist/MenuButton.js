"use strict";
exports.__esModule = true;
var MenuButton = function (_a) {
    var name = _a.displayName, onClick = _a.onClick;
    return (React.createElement("button", { onClick: onClick, className: "group rounded-lg items-center text-center border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" },
        React.createElement("h2", { className: 'font-semibold' },
            name,
            ' ')));
};
exports["default"] = MenuButton;
