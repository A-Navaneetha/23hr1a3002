import { Card, CardContent, Stack, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export function DashboardStats({ total, unread, displayed }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ mb: 2 }}>
      <Card variant="outlined" sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MailOutlineIcon color="primary" />
              <Typography variant="h6" fontWeight={800}>
                {total}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Total Notifications
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FiberManualRecordIcon color="error" fontSize="small" />
              <Typography variant="h6" fontWeight={800}>
                {unread}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Unread Notifications
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              {displayed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Displayed (Top N)
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

