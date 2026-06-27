import { postLog } from "../api/logging";

/**
 * Log to backend logging service.
 * Never throws to the UI.
 */
export async function Log(
  stack,
  level,
  packageName,
  message,
  component,
  api,
  hook,
  page,
  utils,
  auth
) {
  const payload = {
    stack, // frontend | backend
    level, // debug|info|warn|error|fatal
    package: packageName, // package
    component,
    api,
    hook,
    page,
    utils,
    auth,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    await postLog(payload);
  } catch {
    // Never crash the application if logging fails.
    // eslint-disable-next-line no-console
    console.error("Logging failed");
  }
}



