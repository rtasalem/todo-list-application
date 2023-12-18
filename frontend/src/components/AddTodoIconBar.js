import IconBar from './IconBar';
import { BsCalendar2Date, BsClock, BsUpload, BsListStars, BsPlusCircle } from 'react-icons/bs';

const AddTodoIconBar = () => {
  const iconArray = [BsCalendar2Date, BsClock, BsUpload, BsListStars, BsPlusCircle];

  return (
    <div>
      <IconBar icons={iconArray} />
    </div>
  );
};

export default AddTodoIconBar;