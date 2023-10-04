"use strict";
exports.__esModule = true;
var Button = function (_a) {
    var name = _a.name, onClick = _a.onClick;
    return (React.createElement("button", { onClick: onClick, className: "group rounded-lg items-center text-center border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" },
        React.createElement("h2", { className: 'text-xl font-semibold' },
            name,
            ' ',
            React.createElement("span", { className: "inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" }, "->"))));
};
exports["default"] = Button;
