import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";


import { Log } from "../utils/logger";
import { getTopUnreadByPriority } from "../utils/priority";
import { NotificationList } from "../components/NotificationList";
import { DashboardStats } from "../components/DashboardStats";
import { SearchBar } from "../components/SearchBar";
import { TopSelector } from "../components/TopSelector";

import { seedNotifications, generateRandomNotification } from "../data/notifications";

const typeFilters = ["All", "Placement", "Result", "Event"];

export function PriorityInbox() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [topN, setTopN] = useState(10);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    Log("frontend", "info", "priority-inbox", "PriorityInbox mounted");
    const seeded = seedNotifications(25);
    setAllNotifications(seeded);
    Log("frontend", "info", "priority-inbox", "Notifications loaded");
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const next = generateRandomNotification();
      setAllNotifications((prev) => [next, ...(prev ?? [])]);
      Log("frontend", "info", "priority-inbox", "Live notification received");
    }, 8000);

    return () => {
      clearInterval(t);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();

    return (allNotifications ?? []).filter((n) => {
      if (n?.unread !== true) return false;
      if (type !== "All" && n?.type !== type) return false;
      if (q && !(n?.title ?? "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [allNotifications, query, type]);

  const topUnread = useMemo(() => {
    const sorted = getTopUnreadByPriority(filtered, topN);
    return sorted;
  }, [filtered, topN]);

  useEffect(() => {
    Log("frontend", "info", "priority-inbox", "Search performed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    Log("frontend", "info", "priority-inbox", "Filter changed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    Log("frontend", "info", "priority-inbox", "Top N changed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topN]);

  const unreadCount = useMemo(
    () => (allNotifications ?? []).filter((n) => n?.unread === true).length,
    [allNotifications]
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0} color="primary">
        <ToolbarHeader unreadCount={unreadCount} />
      </AppBar>

      <Container sx={{ py: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
          Priority Inbox
        </Typography>

        <DashboardStats total={(allNotifications ?? []).length} unread={unreadCount} displayed={topUnread.length} />

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 4,
            p: 2,
            mb: 2,
            bgcolor: "rgba(255,255,255,0.6)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800 }}>
                  Top N
                </Typography>
                <TopSelector value={topN} onChange={setTopN} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <SearchBar value={query} onChange={setQuery} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Select
                fullWidth
                size="small"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {typeFilters.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t === "All" ? "All Types" : t}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ mb: 2 }} />

        {topUnread.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
            <Typography fontWeight={800}>No unread notifications match your filters.</Typography>
          </Paper>
        ) : (
          <NotificationList notifications={topUnread} />
        )}
      </Container>
    </Box>
  );
}

function ToolbarHeader({ unreadCount }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 2, py: 1.2 }}>
      <Badge badgeContent={unreadCount} color="secondary" max={99}>
        <NotificationsIcon sx={{ fontSize: 30 }} />
      </Badge>
      <Box>
        <Typography variant="h6" fontWeight={900}>
          Campus Notification System
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Unread: {unreadCount}
        </Typography>
      </Box>
    </Stack>
  );
}

