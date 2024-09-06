"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import MapOne from "../Maps/MapOne";
import ChartOne from "@/components/Charts/ChartOne";
import { FaFileExport } from "react-icons/fa";
import { LuUserCheck } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbScreenShareOff } from "react-icons/tb";
 import ChartSix from "../Charts/ChartSix";
import ChartSeven from "../Charts/ChartSeven";
import Card from "./Card";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-4 px-4 lg:flex-row xl:flex-row">
        <div className="flex-1">
          <div className="rounded-3xl bg-white py-5 pe-8 ps-2 shadow-md dark:bg-gray-dark  xl:w-[47vw]">
            <div className="flex justify-between py-4">
              <div>
                <h1 className="fw-bold font-sans text-2xl text-black dark:bg-gray-dark dark:text-white ">
                  Today’s Sales
                </h1>
                <h2 className="fw-bold font-sans text-gray-400">
                  Sales Summary
                </h2>
              </div>
              <button className="flex h-full w-28 items-center justify-around gap-3 rounded-3xl border-2 border-blue-300 px-3 py-2">
                <FaFileExport /> Export
              </button>
            </div>
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                icon={AiOutlineUsergroupAdd}
                label="Total Sales"
                h1="1k$"
                value="+8% from yesterday"
                colorClass="bg-red-100"
                colorIcon="bg-[#FA5A7D]"
              />
              <Card
                icon={LuUserCheck}
                label="Total Booking"
                h1="300$"
                value="+5% from yesterday"
                colorClass="bg-[#FFF4DE]"
                colorIcon="bg-[#FF947A]"
              />
              <Card
                icon={AiOutlineUsergroupAdd}
                label="Cancel Booking"
                h1="5$"
                value="+3% from yesterday"
                colorClass="bg-[#F8B5B5]"
                colorIcon="bg-red-500"
              />
              <Card
                icon={TbScreenShareOff}
                label="New Booking"
                h1="400$"
                value="+2% from yesterday"
                colorClass="bg-[#F3E8FF]"
                colorIcon="bg-[#BF83FF]"
              />
            </div>
          </div>
        </div>
        <div className="w-[90vw] rounded-2xl bg-white px-3 pt-3 shadow-md dark:bg-gray-dark dark:text-white  md:w-[80vw] md:px-8 lg:w-[30vw] lg:px-2 xl:w-[30vw] xl:px-5">
          <h3 className="font-sans text-lg font-bold">
            Reserved rooms / Empty rooms
          </h3>
          <ChartTwo />
        </div>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-between gap-4 md:flex-row lg:flex-row xl:flex-row">
        <div className="flex-1 rounded-lg   p-3  ">
          <MapOne />
        </div>
        <div className="flex-1 rounded-lg   py-8  ">
          <ChartSix />
        </div>
        <div className="flex-1 rounded-lg   py-8  ">
          <ChartSeven />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row lg:flex-row xl:flex-row">
        <div className="w-full rounded-lg   p-3   md:w-1/2 xl:w-1/2">
          <ChartThree />
        </div>
        <div className="w-full rounded-lg  p-3  md:w-1/2 xl:w-1/2">
          <ChartOne />
        </div>
      </div>
    </>
  );
};

export default React.memo(ECommerce);
 