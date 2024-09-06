 'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { CaretLeft, CaretRight, Eye, Plus, MagnifyingGlass, Trash } from '@phosphor-icons/react';

 const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-end items-center p-4 gap-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-gray-500"
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
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretRight size={18} weight="bold" />
        </button>
    </div>
);

const HotelTable = ({ openCreate, openPreview }) => {
    const dropdownRefs = useRef({});
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 10;
    const totalPages = 10;

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
        <div className="font-sans">
            <section className="p-0 my-4 sm:p-5   ">
                <div className="mx-auto max-w-screen-xl">
                    <div className="bg-white relative shadow-md rounded-lg  dark:text-white dark:bg-gray-dark">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2 hidden md:block">
                                <h4 className="fw-bold font-sans">All Hotels</h4>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <form className="flex items-center justify-between w-full md:w-auto">
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
                                            id="simple-search"
                                            className="flex items-center align-middle text-gray-900 text-sm rounded-lg w-full pl-10 py-1 bg-green-100 outline-none border border-gray-500"
                                            placeholder="Search"
                                            required
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </form>
                                <select className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-auto p-1">
                                    <option value="" disabled>
                                        Sort by: Newest
                                    </option>
                                    <option value="City 1">City 1</option>
                                    <option value="City 2">City 2</option>
                                    <option value="City 3">City 3</option>
                                </select>
                                <button
                                    onClick={openCreate}
                                    type="button"
                                    className="flex gap-2 w-full md:w-auto fw-bold font-sans items-center justify-center duration-150 ease-linear text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 bg-green-700"
                                >
                                    <Plus size={18} weight="bold" />
                                    Add Hotel
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-md text-gray-700 uppercase text-center">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">
                                            Hotel Name
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Hotel Email
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            City
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b text-center">
                                        <td className="px-4 py-3">
                                            Hotel California
                                        </td>
                                        <td className="px-4 py-3">
                                            +1 234 567 890
                                        </td>
                                        <td className="px-4 py-3">
                                            +1 234 567 890
                                        </td>
                                        <td className="px-4 py-3">
                                            info@hotelcalifornia.com
                                        </td>
                                        <td className="px-4 py-3">
                                            Los Angeles
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-center gap-2">
                                            <button
                                                className="inline-flex items-center justify-evenly w-20 text-md font-medium hover:bg-red-100 border p-2 text-red-800 hover:text-gray-800 rounded-lg delete-button"
                                                type="button"
                                            >
                                                <Trash
                                                    size={20}
                                                    weight="bold"
                                                />
                                                ban
                                            </button>
                                            <button
                                                className="inline-flex items-center justify-evenly w-20 text-md font-medium hover:bg-green-100 border p-2 text-green-800 hover:text-gray-800 rounded-lg view-button"
                                                type="button"
                                                onClick={openPreview}
                                                ref={(el) =>
                                                (dropdownRefs.current[1] =
                                                    el)
                                                }
                                            >
                                                <Eye
                                                    size={20}
                                                    weight="bold"
                                                />
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

export default HotelTable;

