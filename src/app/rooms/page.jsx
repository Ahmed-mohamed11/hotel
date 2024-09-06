'use client';

import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { FaBell, FaFileExport, FaHandshake } from 'react-icons/fa';
import gsap from 'gsap';
import { Inter } from 'next/font/google';
import RoomTable from '../tablePages/RoomTable';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { LuUserCheck } from 'react-icons/lu';
import { TbScreenShareOff } from 'react-icons/tb';
import Sidebar1 from '@/components/Sidebar';
import Header2 from '@/components/Header';
import ChartTwo from '@/components/Charts/ChartTwo';
 
 const AddBooking = lazy(() => import('../addPages/AddRoom'));
const EditRoom = lazy(() => import('./EditRoom'));
const PreviewRoom = lazy(() => import('../previewPages/PreviewRoom'));
const PreviewRoom2 = lazy(() => import('../previewPages/PreviewRoom2'));

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

const Rooms = ({ role }) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [openPreview2, setOpenPreview2] = useState(false);

     const toggleOpenCreateModal = useCallback(() => setOpenCreate(prev => !prev), []);
    const toggleOpenEditModal = useCallback(() => setOpenEdit(prev => !prev), []);
    const toggleOpenPreviewModal = useCallback(() => setOpenPreview(prev => !prev), []);
    const toggleOpenPreviewModal2 = useCallback(() => setOpenPreview2(prev => !prev), []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".greeting",
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1 }
                );
                gsap.fromTo(
                    ".chart-container",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                );
                gsap.fromTo(".card1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });

            });
            return () => ctx.revert();
        }
    }, []);
    const Card = ({ icon: Icon, label, h1, value, colorClass, colorIcon }) => (
        <div className={`card1 flex flex-col w-36 items-start rounded-lg ps-2 py-2 shadow-md ${colorClass}`}>
            <div className={`h-8 w-8 my-3 flex justify-center items-center rounded-full ${colorIcon}`}>
                <Icon size={20} className="text-white" />
            </div>
            <div>
                <h3 className="font-bold text-red-500">{h1}</h3>
                <p className="-my-1 font-bold font-sans text-gray-500">{label}</p>
                <p className="font-bold font-sans text-sm">{value}</p>
            </div>
        </div>
    );

     const chartOptions = {
        chart: { id: "visitor-insights" },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            title: { text: "Month" },
        },
    };

     const series = [
        { name: "Empty Room", data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 145, 160, 175] },
        { name: "Book Room", data: [20, 30, 25, 40, 45, 50, 55, 65, 80, 95, 105, 115] },
    ];

    return (
        <div className={`flex justify-between font-sans  ${inter.className}`}>
            <Sidebar1/>
            <div className='flex font-sans flex-col w-full'>
                <div>
                    <div className="animate-context">
                        <header className="flex justify-between items-center       mb-4">
                            <Header2 />
                        </header>
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
                    </div>
                    <RoomTable
                        openEdit={toggleOpenEditModal}
                        openPreview={toggleOpenPreviewModal}
                        openCreate={toggleOpenCreateModal}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        {openCreate && <AddBooking closeModal={toggleOpenCreateModal} modal={openCreate} role={role} />}
                        {openEdit && <EditRoom closeModal={toggleOpenEditModal} modal={openEdit} role={role} />}
                        {openPreview && (
                            <PreviewRoom
                                closeModal={() => setOpenPreview(false)}
                                openPreview2={toggleOpenPreviewModal2}
                            />
                        )}
                        {openPreview2 && <PreviewRoom2 closeModal={() => setOpenPreview2(false)} />}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Rooms);
