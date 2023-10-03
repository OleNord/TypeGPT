"use strict";

exports.__esModule = true;

var react_1 = require("react");

require("../top-menu.css");

var Logo_1 = require("../components/Logo");

var gameModeContext_1 = require("../contexts/gameModeContext");

var TopMenu = function TopMenu() {
  var setGameMode = gameModeContext_1.useGameMode().setGameMode;

  var _a = react_1.useState(null),
      openedDropdown = _a[0],
      setOpenedDropdown = _a[1];

  react_1.useEffect(function () {
    document.addEventListener('mousedown', mouseClick);
    return function () {
      document.removeEventListener('mousedown', mouseClick);
    };
  }, []);

  var mouseClick = function mouseClick(e) {
    toggleDropdownDefault();
  };

  var toggleDropdownDefault = function toggleDropdownDefault() {
    var dropdown = document.getElementsByClassName('dropdown');

    if (!dropdown) {
      setOpenedDropdown(null);
    }
  };

  var toggleDropdown = function toggleDropdown(dropdownName) {
    if (openedDropdown === dropdownName) {
      setOpenedDropdown(null); // If the clicked dropdown is already open, close it
    } else {
      setOpenedDropdown(dropdownName); // Otherwise, open the clicked dropdown and close any other
    }
  };

  return react_1["default"].createElement("div", {
    className: "top-menu"
  }, react_1["default"].createElement("div", {
    className: 'left-10 top-5 fixed flex'
  }, react_1["default"].createElement(Logo_1["default"], null), react_1["default"].createElement("h1", {
    className: 'title'
  }, "Typing with ChatGPT")), react_1["default"].createElement("div", {
    className: "logo-title-container flex"
  }, react_1["default"].createElement("ul", {
    className: "menu-items"
  }, react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    href: "/typing-game"
  }, "Home")), react_1["default"].createElement("li", {
    className: "dropdown"
  }, react_1["default"].createElement("button", {
    onClick: function onClick() {
      return toggleDropdown('gameTypes');
    }
  }, "Game types"), openedDropdown === 'gameTypes' && react_1["default"].createElement("ul", {
    className: "dropdown-menu"
  }, react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    onClick: function onClick() {
      return setGameMode("creepyMode");
    }
  }, "Real quotes, but creepy")), react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    onClick: function onClick() {
      return setGameMode("despairMode");
    }
  }, "Quotes of despair")), react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    onClick: function onClick() {
      return setGameMode("lotrStarwarsMode");
    }
  }, "LotR by StarWars")))), react_1["default"].createElement("li", {
    className: "dropdown"
  }, react_1["default"].createElement("button", {
    onClick: function onClick() {
      return toggleDropdown('settings');
    }
  }, "Settings"), openedDropdown === 'settings' && react_1["default"].createElement("ul", {
    className: "dropdown-menu"
  }, react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    href: "/profile"
  }, "Profile")), react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
    href: "/preferences"
  }, "Preferences")))))));
};

exports["default"] = TopMenu;