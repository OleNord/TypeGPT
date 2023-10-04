import React, {useState, useEffect} from 'react';
import '../styles/top-menu.css'
import Logo from '../components/Logo'
import { useGameMode } from '../contexts/gameModeContext';

const TopMenu: React.FC = () => {
    const { setGameMode } = useGameMode();
    const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);

    useEffect(() => {
        document.addEventListener('mousedown', mouseClick);
        return () => {
          document.removeEventListener('mousedown', mouseClick);
        };
      }, []);

    const mouseClick = (e: Event) => {
        toggleDropdownDefault();
    };

    const toggleDropdownDefault = () => {
        let dropdown = document.getElementsByClassName('dropdown');
        if(!dropdown){
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

    return (        
        <div className="top-menu">
            <div className='left-10 top-5 fixed flex'>
                <Logo></Logo>
                <h1 className='title'>Typing_with_ChatGPT</h1>
            </div>
            <div className="logo-title-container flex">
            <ul className="menu-items">
                <li><a href="/typing-game">Home</a></li>
                <li className="dropdown">
                <button onClick={() => toggleDropdown('gameTypes')}>Game types</button>
                    {openedDropdown === 'gameTypes' && (
                        <ul className="dropdown-menu">
                            <li><a onClick={() => (setGameMode("creepyMode"))}>Real quotes, but creepy</a></li>
                            <li><a onClick={() => (setGameMode("despairMode"))}>Quotes of despair</a></li>
                            <li><a onClick={() => (setGameMode("lotrStarwarsMode"))}>LotR by StarWars</a></li>
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