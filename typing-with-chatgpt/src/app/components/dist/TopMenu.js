"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../top-menu.css");
var TopMenu = function () {
    return (react_1["default"].createElement("div", { className: "top-menu" },
        react_1["default"].createElement("ul", { className: "menu-items" },
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("a", { href: "/" }, "Home")),
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("a", { href: "/about" }, "About")),
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("a", { href: "/contact" }, "Contact")),
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("a", { href: "/faq" }, "FAQ")))));
};
exports["default"] = TopMenu;
