import React, {useState} from 'react';
import '../top-menu.css';
import Logo from '../components/Logo'
import { useGameMode } from '../contexts/gameModeContext';

const TopMenu: React.FC = () => {
    const { setGameMode } = useGameMode();
    const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdownName: string) => {
        if (openedDropdown === dropdownName) {
          setOpenedDropdown(null); // If the clicked dropdown is already open, close it
        } else {
          setOpenedDropdown(dropdownName); // Otherwise, open the clicked dropdown and close any other
        }
      };

    return (        
        <div className="top-menu">
            <div className='left-10 top-5 fixed flex'>
                <Logo></Logo>
                <h1 className='title'>Typing with ChatGPT</h1>
            </div>
            <div className="logo-title-container flex">
            <ul className="menu-items">
                <li><a href="/typing-game">Home</a></li>
                <li className="dropdown">
                <button onClick={() => toggleDropdown('gameTypes')}>Game types</button>
                    {openedDropdown === 'gameTypes' && (
                        <ul className="dropdown-menu">
                            <li><a onClick={() => setGameMode("creepyMode")}>Creepy quotes</a></li>
                            <li><a onClick={() => setGameMode("despairMode")}>Quotes of despair</a></li>
                        </ul>
                    )}
                </li>
                <li className="dropdown">
                    <button onClick={() => toggleDropdown('settings')}>Settings</button>
                        {openedDropdown === 'settings' && (
                        <ul className="dropdown-menu">
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/preferences">Preferences</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    </div>
    );
};

export default TopMenu;