import { FC, useState, useEffect } from "react";

//style
import {
  AdminMessageNotificationContentHolder,
  MessageHolder,
  AdminMessageNotificationn,
} from "./style/AdminMessageNotification.style";

//redux
import { fetchAdminNotification } from "redux/Pages/AdminNotification/AdminNotificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { useParams } from "react-router-dom";

const AdminMessageNotification: FC<{}> = () => {
  const [message, setMessage] = useState<any>(null);

  const { id } = useParams<{ id: string }>();

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userId && id) {
      dispatch(fetchAdminNotification({ userId }))
        .then((result: any) => {
          if (fetchAdminNotification.fulfilled.match(result)) {
            const selectedNotification = result.payload
              .flat()
              .find((item: any) => item.id === parseInt(id));
            setMessage(selectedNotification);
          } else {
            console.error("Message not found.");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [dispatch, userId, id]);

  console.log(id);
  return (
    <AdminMessageNotificationContentHolder>
      <AdminMessageNotificationn>
        {message && (
          <MessageHolder
            dangerouslySetInnerHTML={{
              __html: message.notificationMessage,
            }}
          />
        )}
      </AdminMessageNotificationn>
    </AdminMessageNotificationContentHolder>
  );
};

export default AdminMessageNotification;
