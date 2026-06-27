import axios from "axios";

const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmF2YW5lZXRoYXNhbmthckBnbWFpbC5jb20iLCJleHAiOjE3ODI1Mzk2MzAsImlhdCI6MTc4MjUzODczMCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjJlMzA1M2M0LTU1ZDQtNDViMi04ZTc3LWQ5MmQ1NTgxOTE2MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImEubmF2YW5lZXRoYSIsInN1YiI6IjQ0MjU4MTczLTg3YmMtNDViYS1hMWY0LTEyYWUyYmNhODA0OSJ9LCJlbWFpbCI6ImFuYXZhbmVldGhhc2Fua2FyQGdtYWlsLmNvbSIsIm5hbWUiOiJhLm5hdmFuZWV0aGEiLCJyb2xsTm8iOiIyM2hyMWEzMDAyIiwiYWNjZXNzQ29kZSI6ImFUa3licyIsImNsaWVudElEIjoiNDQyNTgxNzMtODdiYy00NWJhLWExZjQtMTJhZTJiY2E4MDQ5IiwiY2xpZW50U2VjcmV0IjoiRFhSSnF4TWV3WmdLWWVmZyJ9.IUfQ9MZcuqfA8zBCj-6pe5Mnuq2OMtzCZ6_cG1YSuhM";


export async function postLog(payload) {
  try {
    const res = await axios.post(LOG_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      timeout: 5000,
    });

    return res.data;
  } catch (error) {
    console.error("Logging failed", error.response?.data || error.message);
    return null;
  }
}