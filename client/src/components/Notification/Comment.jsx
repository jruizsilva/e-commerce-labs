import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Notification.module.css';
import TextareaAutosize from "react-textarea-autosize";

const Comment = ({
  n,
  currentProduct,
  closeNotifications,
  eliminateNotification,
}) => {
  const { user } = useSelector(state => state);

  let { message, productId } = n;
  return (
    <div className={styles.content}>
      <Link
        to={`/details/${productId}`}
        className={styles.link}
        onClick={() => closeNotifications()}
      >
        <div className={styles.notificationContainer}>
          <div>
          <img
            src={currentProduct?.image}
            className={styles.image}
            alt={`${currentProduct?.name}`}
          />
          </div>
          <TextareaAutosize className={styles.notification} value={message}/>
        </div>
      </Link>
      <div className={styles.container}>
        <Link className={styles.eliminate} to={'#'} onClick={() => eliminateNotification(n.id, user.id)}>
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Comment;
