/**
 * Produce a friendly relative time string.
 * Examples:
 * - Just now
 * - 2 minutes ago
 * - 1 hour ago
 * - Yesterday
 */

export function relativeTimeFromNow(timestamp) {
  const t = new Date(timestamp);
  const now = new Date();

  const diffMs = now.getTime() - t.getTime();
  if (!Number.isFinite(diffMs)) return "";

  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 30) return "Just now";

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";

  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

