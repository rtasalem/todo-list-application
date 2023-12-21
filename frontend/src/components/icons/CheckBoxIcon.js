import { BsCheckSquare } from 'react-icons/bs';

const CheckBoxIcon = ({ checkItem, completed }) => {
    const handleClick = () => {
        checkItem();
    };

    return (
        <div
            className={`icon ${completed ? 'completed' : ''}`}
            onClick={handleClick}
        >
            <BsCheckSquare style={{ color: completed ? 'green' : 'inherit' }} />
        </div>
    );
};

export default CheckBoxIcon;
