import { Stack } from "@mui/material";
import { NotificationCard } from "./NotificationCard";

export function NotificationList({ notifications }) {
  return (
    <Stack spacing={1.5}>
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </Stack>
  );
}

