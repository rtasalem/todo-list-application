import { useState } from "react";

import {
  BsCalendar,
  BsFillGearFill,
  BsHouse,
  BsCalendar2Date,
} from "react-icons/bs";
import Icon from "./icons/Icon";
import Modal from "./Modal";

const ListHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    navigateToCalendar,
    navigateToHome,
  } = () => {
    window.location.href = "/calendar";
  };

  return (
    <div className="list-header">
      <h1>📋 Hello. Welcome to your To-Do List.</h1>
      <div className="button-container">
        <Icon icon={BsCalendar2Date} className={"icon"} />
        <Icon icon={BsFillGearFill} className="icon" />

        <a href="/calendar" onClick={navigateToCalendar}>
          <Icon icon={BsCalendar} className="icon" />
        </a>

        <a href="/" onClick={navigateToHome}>
          <Icon icon={BsHouse} className="icon" />
        </a>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  );
};

export default ListHeader;
