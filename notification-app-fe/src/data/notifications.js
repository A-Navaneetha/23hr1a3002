const TYPES = ["Placement", "Result", "Event"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTitle(type) {
  switch (type) {
    case "Placement":
      return "Placement drive update";
    case "Result":
      return "Exam result published";
    case "Event":
      return "Campus event notification";
    default:
      return "New notification";
  }
}

function randomDescription(type) {
  switch (type) {
    case "Placement":
      return "Check your eligibility and schedule for upcoming interviews.";
    case "Result":
      return "Your results are now available. Review details in the portal.";
    case "Event":
      return "Join the latest workshop and networking session this week.";
    default:
      return "Details available.";
  }
}

function formatTimestampDateBack(minutesAgo) {
  const now = new Date();
  return new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString();
}

export function seedNotifications(count = 25) {
  const now = new Date();

  const items = [];
  for (let i = 0; i < count; i++) {
    const type = pick(TYPES);
    const unread = Math.random() < 0.6;

    // Spread recency across last ~2 days
    const minutesAgo = randomInt(1, 60 * 48);
    const timestamp = formatTimestampDateBack(minutesAgo);

    items.push({
      id: `seed-${i}-${now.getTime()}`,
      type,
      title: randomTitle(type),
      description: randomDescription(type),
      timestamp,
      unread,
    });
  }

  return items;
}

/**
 * Generate a new random notification, mostly recent.
 */
export function generateRandomNotification() {
  const type = pick(TYPES);
  const unread = Math.random() < 0.75;

  // within last ~3 hours
  const minutesAgo = randomInt(0, 180);

  return {
    id: `live-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    title: randomTitle(type),
    description: randomDescription(type),
    timestamp: formatTimestampDateBack(minutesAgo),
    unread,
  };
}

