'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BookingSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ticketId, setTicketId] = useState('');

    useEffect(() => {
        const id = searchParams.get('ticketId');
        if (id) {
            setTicketId(id);
        } else {
            router.push('/');
        }
    }, [searchParams, router]);

    const handleViewTicket = () => {
        if (ticketId) {
            router.push(`/bookings/ticket-details/${ticketId}`);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center font-sans">
            {/* Thank You Image/Illustration */}
            <div className="mb-8">
                <img src="/assets/img/thank-you.png"/>
            </div>

            <h1 className="text-[21px] font-semibold  mb-2">Your selected seats have been booked</h1>
            <p className="text-[17px] mb-8">Enjoy your Trip Safely</p>

            <div className="flex flex-wrap justify-center items-center text-lg mb-15">
                <p className="font-regular">For any query please contact</p>

                <div className="flex">
                    <img src="/assets/icon/customer-service.png" alt="Phone Icon" className="h-6 w-6 ml-2 mr-1" />
                    <span className="font-semibold text-gray-800">0171-5975398</span>
                </div>
            </div>

            <div className="mb-2">
                <span className="text-6xl" role="img" aria-label="Smiling Face">&#128522;</span>
            </div>

            <p className="text-md text-gray-700 mb-8">Make sure to download your ticket by before your travel</p>

            <button
                onClick={handleViewTicket}
                className="bg-green-800 w-full text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
                View Ticket
            </button>

            <button
                onClick={() => router.push('/')}
                className="mt-4 w-full bg-[#e0dddd] text-green-800 font-semibold py-3 px-4 rounded-md hover:underline"
            >
                Back to Home
            </button>
        </div>
    );
};

export default BookingSuccessPage;