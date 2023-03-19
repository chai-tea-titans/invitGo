import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Payment from './Payment';  // for payments made
import EventReply from './event-reply';  // for calendar replies


const NoticeCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // TODO: fetch notifications for the current user from server
    const fetchNotifications = async () => {
      // e.g. const response = await fetch("/api/notifications");
      // const data = await response.json();
      // setNotifications(data.notifications);
    };
    fetchNotifications();
  }, [user]);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default NoticeCenter;
