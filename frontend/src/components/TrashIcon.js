import { BsTrash3 } from 'react-icons/bs';

const TrashIcon = ({ deleteItem }) => {
    const handleClick = () => {
        // Trigger delete action
        deleteItem();
    };

    return (
        <div className="icon" onClick={handleClick}>
            <BsTrash3 />
        </div>
    );
}

export default TrashIcon;