import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Payment from './Payment';  // for payments made
// import EventReply from './event-reply';  // for calendar replies
import { useDispatch } from 'react-redux';
import { setNotifications } from './api/store/notificationsSlice';
import Head from 'next/head';


const NoticeCenter = () => {
  // const [notifications, setNotifications] = useState([]);
  // const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        dispatch(setNotifications(data.notifications));
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        dispatch(setNotifications(data.notifications));
      } catch (error) {
        console.error(error);
      }
    };
  
  
    fetchNotifications();
  }, [user, dispatch]);

  return (
    <div>
      <Head><title>Notifications</title></Head>
      <h3><span>(0)</span>Notifications</h3>
      {notifications.length > 0 ? (
  notifications.map((notification) => (
    <div key={notification.id}>
      {notification.type === 'event' && (
        <>
          <p>Event: {notification.event.title}</p>
          {notification.videoSent && <p>Video Sent!</p>}
        </>
      )}
      {notification.type === 'payment' && (
        <p>Payment of ${notification.payment.amount} received from {notification.payment.senderName}</p>
      )}
    </div>
  ))
) : (
  <p>No new notifications</p>
      )}
    </div>
  );
};

export default NoticeCenter;


