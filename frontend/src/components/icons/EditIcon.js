import { BsPencilSquare } from 'react-icons/bs';

const EditIcon = ({ editItem }) => {
    const handleClick = () => {
        editItem();
    };

    return (
        <div className="icon" onClick={handleClick}>
            <BsPencilSquare />
        </div>
    );
}

export default EditIcon;
