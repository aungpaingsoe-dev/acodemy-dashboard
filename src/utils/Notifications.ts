import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement =
  | "topLeft"
  | "top"
  | "topRight"
  | "bottom"
  | "bottomLeft";

export const customNotification = (
  type: NotificationType,
  placement: NotificationPlacement,
  message: string,
  description: any
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};
