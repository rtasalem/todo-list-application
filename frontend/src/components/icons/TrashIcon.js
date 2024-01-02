import React from 'react';
import { BsTrash3 } from 'react-icons/bs';

const TrashIcon = ({ deleteItem, className }) => {
    const handleClick = () => {
        deleteItem();
    };

    return (
        <div className={`icon ${className}`} onClick={handleClick}>
            <BsTrash3 className="trash-icon" />
        </div>
    );
};

export default TrashIcon;
