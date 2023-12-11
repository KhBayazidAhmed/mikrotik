"use client";
import React, { useEffect, useState } from "react";
import { runMikrotik } from "@/actions/serverActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faMemory,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [displayData, setDisplayData] = useState();
  const loadingAnimation = {
    system: [1, 2, 3],
    log: [1, 2, 3, 4, 5],
  };
  const system = [
    {
      label: "CPU Load",
      icon: faMicrochip,
      color: "text-orange-500",
    },

    {
      label: "Free Memory",
      icon: faMemory,
      color: "text-green-500",
    },
    {
      icon: faClock,
      color: "text-yellow-500",
      label: "Uptime",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setDisplayData(await runMikrotik("i"));
    };

    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetchData();
      }, 5000);
    };
    console.log(displayData);
    fetchDataWithDelay();
  }, [displayData]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 text-white">System Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayData
          ? displayData.system?.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p
                  className={`flex items-center ${system[index].color} mb-4 text-xl`}
                >
                  <FontAwesomeIcon icon={system[index].icon} className="mr-2" />
                  <span className="text-white">{system[index].label}</span>
                </p>
                <p className="text-3xl font-bold text-white">{item}</p>
              </div>
            ))
          : loadingAnimation.system.map((item, i) => (
              <div key={i} className="bg-gray-800   p-6 rounded-lg shadow-md">
                <p
                  className={`flex items-center  ${system[i].color}  mb-4 text-xl`}
                >
                  <FontAwesomeIcon icon={system[i].icon} className="mr-2 " />
                  <span className="text-white">{system[i].label}</span>
                </p>
                <p className="text-3xl  font-bold text-white">...</p>
              </div>
            ))}
      </div>
      <div className="w-1/2 pt-4">
        <h1 className="text-sm font-bold mb-4">Log Entries</h1>
        <ul className="  pt-4">
          {displayData
            ? displayData.log?.map((log) => (
                <li key={log[".id"]} className="mb-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="text-gray-200">
                      <span className="font-bold">Message:</span> {log.message}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-bold">Time:</span> {log.time}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-bold">Topics:</span> {log.topics}
                    </p>
                  </div>
                </li>
              ))
            : loadingAnimation.log.map((i) => (
                <li
                  key={i}
                  className=" w-[640px] h-[120px] flex items-center justify-center bg-gray-800 rounded mb-4"
                >
                  loading...
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
