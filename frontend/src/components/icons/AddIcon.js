import { BsPlusCircle } from 'react-icons/bs';

const AddIcon = ({ addItem }) => {
    const handleClick = () => {
        addItem();
    };

    return (
        <div className="icon" onClick={handleClick}>
            <BsPlusCircle className="add-icon"/>
        </div>
    );
}

export default AddIcon;