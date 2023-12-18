import { BsFillGearFill } from 'react-icons/bs';
import Icon from './Icon';

const ListHeader = () => {
    return (
        <div className="list-header">
            <h1>📋 Hello. Welcome to your To-Do List.</h1>
            <div className="button-container">
                <Icon icon={BsFillGearFill} className="icon" />
            </div>
        </div>
    );
};

export default ListHeader;