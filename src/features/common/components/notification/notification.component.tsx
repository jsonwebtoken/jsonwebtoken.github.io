import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './notification.module.scss';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className={styles.container}>
      {message}
    </div>,
    document.body
  );
};

export default Notification;