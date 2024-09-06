'use client';
import React, { useCallback, useState, useEffect, lazy, Suspense, useMemo } from 'react';
import gsap from 'gsap';
import Sidebar from '@/components/Sidebar';
import Header2 from '@/components/Header';
import ChartSeven from '@/components/Charts/ChartSeven';
import MapOne from '@/components/Maps/MapOne';
import ChartTwo from '@/components/Charts/ChartTwo';
import RequestTable from '../tablePages/BookingTable';

const PreviewBooking = lazy(() => import('../previewPages/PreviewBooking'));
const AddBooking = lazy(() => import('../addPages/AddBooking'));

const Bookings = ({ role }) => {
    const [openPreview, setOpenPreview] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

     const toggleOpenCreateModal = useCallback(() => setOpenCreate(prev => !prev), []);
    const toggleOpenPreviewModal = useCallback(() => setOpenPreview(prev => !prev), []);
    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), []);

     useEffect(() => {
        const ctx = gsap.context(() => {
             gsap.fromTo(".chart-container", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
        });

        return () => ctx.revert(); 
    }, []);

     const chartSection = useMemo(() => (
         <div className="flex items-center justify-between flex-wrap flex-col md:flex-row lg:flex-row xl:flex-row gap-4">
            <div className="chart-container flex-1 rounded-lg ps-4">
                <ChartSeven />
            </div>
            <div className="chart-container flex-1 rounded-lg p-4">
                <MapOne />
            </div>
            <div className="chart-container rounded-lg flex-1 dark:bg-gray-dark dark:text-white bg-white shadow-md p-4">
                <h3 className="font-sans text-lg font-bold py-3">
                    Reserved rooms / Empty rooms
                </h3>
                <ChartTwo />
            </div>
        </div>
    ), []);

    return (
        <div className="flex items-center">
            <main className="flex flex-col lg:flex-row w-full p-4 -mt-5">
                <Sidebar />
                <section className="flex-1">
                    <header className="flex justify-between items-center mb-4">
                        <Header2 />
                    </header>

                    {chartSection}

                    <RequestTable
                        openPreview={toggleOpenPreviewModal}
                        openCreate={toggleOpenCreateModal}
                    />

                    <Suspense fallback={<div>Loading...</div>}>
                        {openCreate && <AddBooking closeModal={toggleOpenCreateModal} modal={openCreate} role={role} />}
                        {openPreview && <PreviewBooking closeModal={toggleOpenPreviewModal} />}
                    </Suspense>
                </section>
            </main>
        </div>
    );
};

export default React.memo(Bookings);
