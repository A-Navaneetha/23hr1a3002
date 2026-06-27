import { Avatar, Badge, Card, Chip, Stack, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ResultsIcon from "@mui/icons-material/HowToReg";
import EventIcon from "@mui/icons-material/Event";

import { relativeTimeFromNow } from "../utils/timeUtils";

const iconByType = {
  Placement: PlaceIcon,
  Result: ResultsIcon,
  Event: EventIcon,
};

const priorityLabelByType = {
  Placement: "P3",
  Result: "P2",
  Event: "P1",
};

function typeMeta(type) {
  switch (type) {
    case "Placement":
      return { chipColor: "primary" };
    case "Result":
      return { chipColor: "success" };
    case "Event":
      return { chipColor: "warning" };
    default:
      return { chipColor: "default" };
  }
}

export function NotificationCard({ notification }) {
  const { unread, type, title, description, timestamp } = notification;
  const Icon = iconByType[type] ?? PlaceIcon;
  const { chipColor } = typeMeta(type);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
        backgroundColor: unread ? "rgba(25,118,210,0.04)" : "background.paper",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ p: 2 }}>
        <Badge
          color="primary"
          variant="dot"
          overlap="circular"
          invisible={!unread}
        >
          <Avatar sx={{ bgcolor: "rgba(25,118,210,0.12)", color: "primary.main" }}>
            <Icon fontSize="small" />
          </Avatar>
        </Badge>

        <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="subtitle2" fontWeight={800}>
              {type}
            </Typography>
            <Chip
              size="small"
              label={priorityLabelByType[type] ?? "P0"}
              color={chipColor}
              variant="outlined"
              sx={{ fontWeight: 700 }}
            />
            <Typography variant="caption" color="text.secondary">
              {relativeTimeFromNow(timestamp)}
            </Typography>
          </Stack>

          <Typography variant="body1" fontWeight={800} noWrap>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

