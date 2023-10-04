import React, {useState, useEffect, useRef} from 'react';
import '../styles/top-menu.css'
import Logo from '../components/Logo'
import { useGameMode } from '../contexts/gameModeContext';

const TopMenu: React.FC = () => {
    const { setGameMode } = useGameMode();
    const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLLIElement| null>(null);

    const toggleDropdownDefault = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpenedDropdown(null);
        };
    }

    const toggleDropdown = (dropdownName: string) => {
        if (openedDropdown === dropdownName) {
          setOpenedDropdown(null); // If the clicked dropdown is already open, close it
        } else {
          setOpenedDropdown(dropdownName); // Otherwise, open the clicked dropdown and close any other
        }
      };

      const handleButtonClick = ((gameMode: string) => {
        setGameMode(gameMode)
      });

    useEffect(() => {
        document.addEventListener('mousedown', toggleDropdownDefault);
        return () => {
            document.removeEventListener('mousedown', toggleDropdownDefault);
        };
    }, []);

    return (        
        <div className="top-menu">
            <div className='left-10 top-5 fixed flex'>
                <Logo></Logo>
                <h1 className='title'>Typing_with_ChatGPT</h1>
            </div>
            <div className="logo-title-container flex">
            <ul className="menu-items">
                <li><a href="/typing-game">Home</a></li>
                <li className="dropdown" ref= {dropdownRef}>
                <button 
                className='dropdown-gamemode'
                 onClick={() => toggleDropdown('gameTypes')}>Game types</button>
                    {openedDropdown === 'gameTypes' && (
                        <ul className="dropdown-menu">
                            <li><a onClick={() => handleButtonClick('creepyMode')}>Real quotes, but creepy</a></li>
                            <li><a onClick={() => handleButtonClick('despairMode')}>Quotes of despair</a></li>
                            <li><a onClick={() => handleButtonClick("lotrStarwarsMode")}>LotR by StarWars</a></li>
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