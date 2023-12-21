import IconBar from "./icons/IconBar";
import { BsFlag, BsCalendar2Date, BsClock, BsUpload, BsListStars } from "react-icons/bs";
import AddIcon from "./icons/AddIcon";

const AddTodoIconBar = ({ addItem }) => {
  const iconArray = [
    BsFlag,
    BsCalendar2Date,
    BsClock,
    BsUpload,
    BsListStars,
  ];

  return (
    <div className="icon-bar-container">
      <IconBar icons={iconArray} />
      <AddIcon addItem={addItem} className="icon" />
    </div>
  );
};

export default AddTodoIconBar;
