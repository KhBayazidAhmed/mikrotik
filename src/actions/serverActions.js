"use server";
const rosRest = require("ros-rest");

export async function runMikrotik() {
  const clientRosRest = rosRest({
    host: "1.1.1.1",
    user: "biz",
    password: "biz",
    port: 443, // default 443
    secure: false, // default false
  });
  try {
    let systemInfo = await clientRosRest.print("system/resource");
    let log = await clientRosRest.print("log");
    const systemInfoShow = [
      systemInfo.data["cpu-load"],
      systemInfo.data["free-memory"],
      systemInfo.data["uptime"],
    ];

    systemInfoShow[1] =
      Math.floor(parseInt(systemInfoShow[1]) / 1024 / 1024) + " MB";
    const response = {
      system: systemInfoShow,
      log: log.data.slice(-5),
    };
    return response;
  } catch (err) {
    return err.message;
  }
}
