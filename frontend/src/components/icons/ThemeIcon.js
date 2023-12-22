import { BsSun } from 'react-icons/bs';

const ThemeIcon = ({ toggleTheme }) => {
    const handleClick = () => {
        toggleTheme();
    };

    return (
        <div className="icon" onClick={handleClick}>
            <BsSun className="theme-icon"/>
        </div>
    );
}

export default ThemeIcon;