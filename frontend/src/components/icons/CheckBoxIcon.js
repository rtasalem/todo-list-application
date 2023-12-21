import { BsCheckSquare } from 'react-icons/bs';

const CheckBoxIcon = ({ checkItem, completed, hoverClassName }) => {
    const handleClick = () => {
        checkItem();
    };

    return (
        <div
            className={`icon ${completed ? 'completed' : ''} ${hoverClassName}`}
            onClick={handleClick}
        >
            <BsCheckSquare className="checkbox-icon" style={{ color: completed ? 'green' : 'inherit' }} />
        </div>
    );
};

export default CheckBoxIcon;
