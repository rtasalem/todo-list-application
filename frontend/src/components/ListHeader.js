import { useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import Icon from './Icon';
import Modal from './Modal';

const ListHeader = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="list-header">
            <h1>📋 Hello. Welcome to your To-Do List.</h1>
            <div className="button-container">
                {/* <button onClick={() => setShowModal(true)}>ADD NEW</button> */}
                <Icon icon={BsFillGearFill} className="icon" />
            </div>
            {showModal && <Modal mode={'create'} setShowModal={setShowModal} />}
        </div>
    );
};

export default ListHeader;