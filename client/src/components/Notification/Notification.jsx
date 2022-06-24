import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotificationsByUserId,
  updateNotificationsByUserId,
  getAllProducts,
  updateNotificationsByProduct,
} from '../../actions';
import { Link } from 'react-router-dom';
import styles from './Notification.module.css';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const { user, notifications, allProductsCopy } = useSelector(state => state);

  const dispatch = useDispatch();

  const activeNotifications = notifications?.filter(el => el.state === 'true');

  // document.addEventListener('click', function handleClickOutsideBox(event) {
  //   const box = document.getElementById('notifications');
  //   if (!box.contains(event.target)) {
  //     closeNotifications();
  //   }
  // });

  useEffect(() => {
    dispatch(getAllProducts(window.location.search));
    if (user) {
      dispatch(getNotificationsByUserId(user.id));
    }
  }, [dispatch, user]);

  const displayNotification = (n, currentProduct) => {
    let { message, productId } = n;
    return (
      <div>
        <Link
          to={`/details/${productId}`}
          className={styles.link}
          onClick={() => closeNotifications()}
        >
          <div className={styles.notificationContainer}>
            <img
              src={currentProduct?.image}
              className={styles.image}
              alt={`${currentProduct?.name}`}
            />
            <Link
              to={'#'}
              onClick={() => eliminateNotification(productId, user.id)}
            >
              Eliminate
            </Link>
            <div className={styles.notification}>{message}</div>
          </div>
        </Link>
      </div>
    );
  };

  const closeNotifications = () => {
    setOpen(false);
  };
  const handleRead = () => {
    setOpen(false);
    dispatch(updateNotificationsByUserId(user.id));
  };
  const eliminateNotification = (product, user) => {
    dispatch(updateNotificationsByProduct(product, user));
  };

  return (
    <div id="notifications">
      <div className={styles.icon} onClick={() => setOpen(!open)}>
        <span
          className="material-symbols-rounded"
          style={{ fontSize: '16px', color: '#000' }}
        >
          notifications
        </span>
        {activeNotifications.length > 0 && (
          <div className={styles.counter}>{activeNotifications.length}</div>
        )}
      </div>
      {open && (
        <div className={styles.notifications}>
          <span className={styles.notificationTitle}>Notifications</span>
          <hr className={styles.line}></hr>
          <hr></hr>

          {notifications.length ? (
            <div>
            {notifications?.map(n => {
              let currentProduct = allProductsCopy?.find(
                el => el.id === n.productId
              );
              return displayNotification(n, currentProduct);
            })}
              <button className={styles.nButton} onClick={handleRead}>
                Mark as read
              </button>
            </div>
          ) : (
            <span>You don't have any notification.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
