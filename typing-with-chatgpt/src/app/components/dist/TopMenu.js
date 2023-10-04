"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/top-menu.css");
var Logo_1 = require("../components/Logo");
var gameModeContext_1 = require("../contexts/gameModeContext");
var MenuButton_1 = require("../components/MenuButton");
var TopMenu = function () {
    var setGameMode = gameModeContext_1.useGameMode().setGameMode;
    var _a = react_1.useState(null), openedDropdown = _a[0], setOpenedDropdown = _a[1];
    var dropdownRef = react_1.useRef(null);
    function goToHome() { }
    var toggleDropdownDefault = function (event) {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target)) {
            setOpenedDropdown(null);
        }
    };
    var toggleDropdown = function (dropdownName) {
        if (openedDropdown === dropdownName) {
            setOpenedDropdown(null); // If the clicked dropdown is already open, close it
        }
        else {
            setOpenedDropdown(dropdownName); // Otherwise, open the clicked dropdown and close any other
        }
    };
    var handleButtonClick = function (gameMode) {
        setGameMode(gameMode);
    };
    react_1.useEffect(function () {
        document.addEventListener("mousedown", toggleDropdownDefault);
        return function () {
            document.removeEventListener("mousedown", toggleDropdownDefault);
        };
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "left-10 top-5 fixed flex" },
            react_1["default"].createElement(Logo_1["default"], null),
            react_1["default"].createElement("h1", { className: "title" }, "Typing_with_ChatGPT")),
        react_1["default"].createElement("ul", { className: "menu-items" },
            react_1["default"].createElement("li", { className: "home" },
                react_1["default"].createElement(MenuButton_1["default"], { displayName: "Home", onClick: goToHome })),
            react_1["default"].createElement("li", { className: "dropdown", ref: dropdownRef },
                react_1["default"].createElement(MenuButton_1["default"], { displayName: "Game Types", onClick: function () { return toggleDropdown("gameTypes"); } }),
                openedDropdown === "gameTypes" && (react_1["default"].createElement("ul", { className: "dropdown-menu " },
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { onClick: function () { return handleButtonClick("creepyMode"); } }, "Creepy")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { onClick: function () { return handleButtonClick("despairMode"); } }, "Despair")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { onClick: function () { return handleButtonClick("lotrStarwarsMode"); } }, "LotR - StarWars")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { onClick: function () { return handleButtonClick("storyMode"); } }, "Story Mode"))))),
            react_1["default"].createElement("li", { className: "dropdown" },
                react_1["default"].createElement(MenuButton_1["default"], { displayName: "Settings", onClick: function () { return toggleDropdown("settings"); } }),
                openedDropdown === "settings" && (react_1["default"].createElement("ul", { className: "dropdown-menu" },
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/profile" }, "Profile")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/preferences" }, "Preferences"))))))));
};
exports["default"] = TopMenu;
