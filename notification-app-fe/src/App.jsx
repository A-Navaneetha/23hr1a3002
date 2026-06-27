import { useEffect } from "react";

import { PriorityInbox } from "./pages/PriorityInbox";
import { Log } from "./utils/logger";

export default function App() {
  useEffect(() => {
    Log("frontend", "info", "app", "Application started");
  }, []);

  return <PriorityInbox />;
}


