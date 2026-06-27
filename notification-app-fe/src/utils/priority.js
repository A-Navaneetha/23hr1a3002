/**
 * Priority Inbox logic.
 *
 * Weight rules:
 * - Placement = 3
 * - Result = 2
 * - Event = 1
 *
 * If weights tie, newer (larger timestamp) comes first.
 */

const weightByType = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getWeight(type) {
  return weightByType[type] ?? 0;
}

/**
 * @param {Array} notifications
 * @param {number} topN
 * @returns {Array}
 */
export function getTopUnreadByPriority(notifications, topN = 10) {
  const unread = (notifications ?? []).filter((n) => n?.unread === true);

  const sorted = [...unread].sort((a, b) => {
    const wa = getWeight(a.type);
    const wb = getWeight(b.type);

    if (wb !== wa) return wb - wa; // higher weight first

    const ta = new Date(a.timestamp).getTime();
    const tb = new Date(b.timestamp).getTime();

    // newer first
    return tb - ta;
  });

  return sorted.slice(0, topN);
}

