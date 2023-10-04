interface MenuButtonProps {
    displayName: string;
    onClick: () => void;
  }
  
  const MenuButton: React.FC<MenuButtonProps> = ({displayName: name, onClick}) => {
    return (
      <button
        onClick={onClick}
        className="group rounded-lg items-center text-center border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className={'font-semibold'}>
          {name}{' '}
        </h2>
      </button>
    );
  };
  
  export default MenuButton;