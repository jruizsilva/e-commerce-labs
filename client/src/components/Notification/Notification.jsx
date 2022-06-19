import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsByUserId } from "../../actions";
import { Link } from "react-router-dom";

const Notification = () => {
  //const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { user, notifications} = useSelector((state) => state);

  const dispatch = useDispatch();

 const activeNotifications = notifications?.filter(el=> el.state==="true")
   

   useEffect(() => {
    if(user){
        dispatch(getNotificationsByUserId(user.id));
    }
  }, [dispatch,user]);


  const displayNotification = ({ message }) => {
  
    return (
      <span className="notification">{message}</span>
    );
  };

  const handleRead = () => {
    setOpen(false);
  };

  return (
    <div>
      <div >
        <div  onClick={() => setOpen(!open)}>

            <Link to="#" >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "16px", color: "#000" }}
              >
                notifications
              </span>
            </Link>
          {
activeNotifications.length >0 &&
            <div >{activeNotifications.length}</div>
          }
        </div>
      </div>
      {open && (
        <div >
          {notifications.map((n) => displayNotification(n))}
          <button  onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;