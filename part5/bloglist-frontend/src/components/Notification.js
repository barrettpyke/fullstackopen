import { useSelector } from 'react-redux'

const Notification = () => {
  
  const message = useSelector(state => state.notifications)
  
  if (message === null) {
    return null;
  }
  return <div className={message.messageClass}>{message.message}</div>;
};

export default Notification;
