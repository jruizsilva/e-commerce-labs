import "./navbar.css";
import notificationIco from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsByUserId } from "../../actions";

const Notification = ({ userId }) => {
  //const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { user, notifications} = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getNotificationsByUserId)
  }, [dispatch]);

  const displayNotification = ({ message }) => {
  
    return (
      <span className="notification">{`${senderName} ${action} your publication.`}</span>
    );
  };

  const handleRead = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={notificationIco} className="iconImg" alt="" />
          {
notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;