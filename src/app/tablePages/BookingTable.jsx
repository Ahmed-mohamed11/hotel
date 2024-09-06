'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { CaretLeft, CaretRight, Eye, Plus, MagnifyingGlass } from '@phosphor-icons/react';

// Memoized Pagination Controls
const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-end items-center p-4 gap-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-gray-500 disabled:opacity-50"
            aria-label="Previous page"
        >
            <CaretLeft size={18} weight="bold" />
        </button>
        <div className="space-x-2 hidden md:block">
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                const page = Math.floor((currentPage - 1) / 6) * 6 + i + 1;
                return (
                    page <= totalPages && (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`px-4 py-2 text-sm rounded-md ${page === currentPage
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    )
                );
            })}
        </div>
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-gray-500 disabled:opacity-50"
            aria-label="Next page"
        >
            <CaretRight size={18} weight="bold" />
        </button>
    </div>
);

const RequestTable = ({ openCreate, openPreview }) => {
    const dropdownRefs = useRef({});
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const itemsPerPage = 10;
    const totalPages = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const currentSet = useMemo(() => {
        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const startPage = Math.floor((currentPage - 1) / 6) * 6 + 1;
        return Array.from({ length: 6 }, (_, i) => startPage + i).filter(
            (page) => page <= totalPages
        );
    }, [currentPage, totalPages]);

    const handleClickOutside = useCallback(
        (event) => {
            if (selectedHotelId !== null) {
                const dropdown = dropdownRefs.current[selectedHotelId];
                if (
                    dropdown &&
                    !dropdown.contains(event.target) &&
                    !event.target.classList.contains('view-button')
                ) {
                    setSelectedHotelId(null);
                }
            }
        },
        [selectedHotelId]
    );

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    const toggleEditDropdown = useCallback((hotelId) => {
        setSelectedHotelId((prevHotelId) =>
            prevHotelId === hotelId ? null : hotelId
        );
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    return (
        <div className="font-sans ">
            <section className="p-0 my-4 sm:p-5 dark:text-white">
                <div className="mx-auto max-w-screen-xl">
                    <div className="bg-white relative shadow-md rounded-lg dark:bg-gray-dark dark:text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2 hidden md:block">
                                <h4 className="font-semibold">All Bookings</h4>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3">
                                <form className="flex items-center w-full md:w-auto ">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlass
                                                size={20}
                                                weight="bold"
                                                className="mx-1 text-gray-500"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            className="text-gray-900 text-sm rounded-lg w-full pl-10 py-1 bg-green-100 outline-none border border-gray-500"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            aria-label="Search bookings"
                                        />
                                    </div>
                                </form>
                                <select className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full md:w-auto p-1">
                                    <option value="" disabled>
                                        Sort by: Newest
                                    </option>
                                    <option value="City 1">City 1</option>
                                    <option value="City 2">City 2</option>
                                    <option value="City 3">City 3</option>
                                </select>
                                <button
                                    onClick={openCreate}
                                    className="flex gap-2 items-center text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-4 py-2 duration-150 ease-in-out"
                                >
                                    <Plus size={18} weight="bold" />
                                    Add Booking
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-md text-gray-700 uppercase text-center">
                                    <tr>
                                        <th className="px-4 py-4">Hotel Name</th>
                                        <th className="px-4 py-3">Phone Number</th>
                                        <th className="px-4 py-3">Hotel Email</th>
                                        <th className="px-4 py-3">City</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b text-center">
                                        <td className="px-4 py-3">Hotel California</td>
                                        <td className="px-4 py-3">+1 234 567 890</td>
                                        <td className="px-4 py-3">info@hotelcalifornia.com</td>
                                        <td className="px-4 py-3">Los Angeles</td>
                                        <td className="px-4 py-3">
                                            <button
                                                className="flex items-center text-center justify-end text-green-800 hover:bg-green-100 border p-2 rounded-lg"
                                                onClick={openPreview}
                                                ref={(el) => (dropdownRefs.current[1] = el)}
                                                aria-label="View details"
                                            >
                                                <Eye size={20} weight="bold" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestTable ;
