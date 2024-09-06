'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Swal from 'sweetalert2';
import { CaretLeft, CaretRight, Eye, PencilSimple, Plus, MagnifyingGlass, Trash } from '@phosphor-icons/react';

export default function RequestTable({ openEdit, openCreate, openPreview }) {
    const dropdownRefs = useRef({});
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;
    const totalPages = 10;

    const initialRoomsData = [
        { id: 1, type: "Deluxe Suite", people: 4, rooms: 2, price: "$250", status: "FULL Reserved" },
        { id: 2, type: "Standard Room", people: 2, rooms: 1, price: "$100", status: "Available" }
    ];

    const [roomsData, setRoomsData] = useState(initialRoomsData);

    const currentSet = useMemo(() => {
        if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const startPage = Math.floor((currentPage - 1) / 6) * 6 + 1;
        return Array.from({ length: 6 }, (_, i) => startPage + i).filter(page => page <= totalPages);
    }, [currentPage, totalPages]);

    const handleClickOutside = useCallback((event) => {
        if (selectedHotelId !== null) {
            const dropdown = dropdownRefs.current[selectedHotelId];
            if (dropdown && !dropdown.contains(event.target) && !event.target.classList.contains("view-button")) {
                setSelectedHotelId(null);
            }
        }
    }, [selectedHotelId]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const handleDelete = useCallback((roomId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this room?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                setRoomsData(prevData => prevData.filter(room => room.id !== roomId));
                Swal.fire('Deleted!', 'The room has been deleted.', 'success');
            }
        });
    }, []);

    const toggleStatus = useCallback((roomId) => {
        Swal.fire({
            title: 'Change Room Status',
            text: "Do you want to change the status of this room?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, keep it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setRoomsData(prevData => prevData.map(room =>
                    room.id === roomId
                        ? { ...room, status: room.status === "Available" ? "FULL Reserved" : "Available" }
                        : room
                ));
                Swal.fire('Status Changed!', 'The room status has been updated.', 'success');
            }
        });
    }, []);

    return (
        <div className="font-sans">
            <section className="p-0 my-4 sm:p-5">
                <div className="mx-auto max-w-screen-xl">
                    <div className="bg-white dark:bg-gray-dark dark:text-white relative shadow-md rounded-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <h4>All Rooms</h4>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <form className="flex items-center justify-between">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlass size={20} weight="bold" className="mx-1 text-gray-500" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="flex items-center align-middle text-gray-900 text-sm rounded-lg w-44 pl-10 py-1 bg-green-100 outline-none border border-gray-500"
                                            placeholder="Search"
                                            required
                                            aria-label="Search"
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </form>
                                <select
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                    aria-label="Sort rooms"
                                >
                                    <option value="" disabled>Sort by: Newest</option>
                                    <option value="City 1">City 1</option>
                                    <option value="City 2">City 2</option>
                                    <option value="City 3">City 3</option>
                                </select>
                                <button
                                    onClick={openCreate}
                                    type="button"
                                    className="flex gap-2 w-full items-center justify-center duration-150 ease-linear text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 bg-green-700"
                                    aria-label="Add room"
                                >
                                    <Plus size={18} weight="bold" />
                                    Add Room
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-md text-gray-700 uppercase text-center">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">Room Type</th>
                                        <th scope="col" className="px-4 py-3">People Number</th>
                                        <th scope="col" className="px-4 py-3">Rooms Number</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomsData.map((room) => (
                                        <tr key={room.id} className="border-b text-center">
                                            <td className="px-4 py-3">{room.type}</td>
                                            <td className="px-4 py-3">{room.people}</td>
                                            <td className="px-4 py-3">{room.rooms}</td>
                                            <td className="px-4 py-3">{room.price}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    className={`py-1 px-3 rounded-lg ${room.status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                                    onClick={() => toggleStatus(room.id)}
                                                    aria-label={`Change status for ${room.type}`}
                                                >
                                                    {room.status}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-center space-x-2">
                                                <button
                                                    className="inline-flex items-center justify-center w-10 text-md font-medium hover:bg-green-100 border p-2 text-green-800 hover:text-gray-800 rounded-lg"
                                                    type="button"
                                                    onClick={openEdit}
                                                    aria-label={`Edit ${room.type}`}
                                                >
                                                    <PencilSimple size={20} weight="bold" />
                                                </button>
                                                <button
                                                    className="inline-flex items-center justify-center w-10 text-md font-medium hover:bg-green-100 border p-2 text-green-800 hover:text-gray-800 rounded-lg"
                                                    type="button"
                                                    onClick={openPreview}
                                                    aria-label={`View ${room.type}`}
                                                >
                                                    <Eye size={20} weight="bold" />
                                                </button>
                                                <button
                                                    className="inline-flex  items-center justify-center w-10 text-md font-medium hover:bg-green-100 border p-2 text-green-800 hover:text-gray-800 rounded-lg"
                                                    type="button"
                                                    onClick={() => handleDelete(room.id)}
                                                    aria-label={`Delete ${room.type}`}
                                                >
                                                    <Trash size={20} weight="bold" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center px-5 py-5">
                            <span className="text-sm font-normal text-gray-500">Showing {itemsPerPage} of {totalPages * itemsPerPage}</span>
                            <div className="inline-flex items-center -space-x-px">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                                    className="h-8 w-8 inline-flex items-center justify-center text-gray-500 border border-gray-200 rounded-l-lg bg-gray-50"
                                    disabled={currentPage === 1}
                                    aria-label="Previous Page"
                                >
                                    <CaretLeft size={18} weight="bold" />
                                </button>
                                {currentSet.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`h-8 w-8 border border-gray-200 text-sm ${currentPage === pageNumber ? "text-blue-600" : "text-gray-500"} bg-white`}
                                        onClick={() => paginate(pageNumber)}
                                        aria-label={`Page ${pageNumber}`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                                    className="h-8 w-8 inline-flex items-center justify-center text-gray-500 border border-gray-200 rounded-r-lg bg-gray-50"
                                    disabled={currentPage === totalPages}
                                    aria-label="Next Page"
                                >
                                    <CaretRight size={18} weight="bold" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
