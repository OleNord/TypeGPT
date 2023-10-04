import React, { useState, useEffect, useRef } from "react";
import "../styles/top-menu.css";
import Logo from "../components/Logo";
import { useGameMode } from "../contexts/gameModeContext";
import MenuButton from "../components/MenuButton";

const TopMenu: React.FC = () => {
  const { setGameMode } = useGameMode();
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  function goToHome() {}

  const toggleDropdownDefault = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenedDropdown(null);
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    if (openedDropdown === dropdownName) {
      setOpenedDropdown(null); // If the clicked dropdown is already open, close it
    } else {
      setOpenedDropdown(dropdownName); // Otherwise, open the clicked dropdown and close any other
    }
  };

  const handleButtonClick = (gameMode: string) => {
    setGameMode(gameMode);
  };

  useEffect(() => {
    document.addEventListener("mousedown", toggleDropdownDefault);
    return () => {
      document.removeEventListener("mousedown", toggleDropdownDefault);
    };
  }, []);

  return (
    <div>
      <div className="left-10 top-5 fixed flex">
        <Logo></Logo>
        <h1 className="title">Typing_with_ChatGPT</h1>
      </div>
        <ul className="menu-items">
          <li className="home">
            <MenuButton displayName="Home" onClick={goToHome}></MenuButton>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <MenuButton displayName="Game Types" onClick={() => toggleDropdown("gameTypes")}></MenuButton>
            {openedDropdown === "gameTypes" && (
              <ul className="dropdown-menu ">
                <li>
                  <a onClick={() => handleButtonClick("creepyMode")}>
                    Creepy
                  </a>
                </li>
                <li>
                  <a onClick={() => handleButtonClick("despairMode")}>
                    Despair
                  </a>
                </li>
                <li>
                  <a onClick={() => handleButtonClick("lotrStarwarsMode")}>
                    LotR - StarWars
                  </a>
                </li>
                <li>
                  <a onClick={() => handleButtonClick("storyMode")}>
                    Story Mode
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="dropdown">
          <MenuButton displayName="Settings" onClick={() => toggleDropdown("settings")}></MenuButton>
            {openedDropdown === "settings" && (
              <ul className="dropdown-menu">
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/preferences">Preferences</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
  );
};

export default TopMenu;
