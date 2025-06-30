'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTicketProvider } from '@/context/TicketProvider';
import SelectTripPoint from '@/components/SelectTripPoint';

const BoardingSelectionPage = () => {
    const router = useRouter();
    const { numberOfTickets, selectedBoardingPoint, setSelectedBoardingPoint, totalPrice, selectedSeats, timerRemaining } = useTicketProvider(); 

    const boardingPoints = [
        { id: 'kallyanpur', name: 'Kallyanpur BRTC Counter', time: '12:00 AM' },
        { id: 'gabtoli', name: 'Gabtoli Bus Counter', time: '12:45 AM' },
        { id: 'sayedabad', name: 'Sayedabad Bus Stand', time: '1:30 AM' },
    ];

    const handleBoardingSelect = (id) => {
        setSelectedBoardingPoint(boardingPoints.find(p => p.id === id));
    };

    const handleConfirmBooking = () => {
        if (selectedBoardingPoint.name) {
            router.push("/ticket/book/dropping")
        } else {
            alert('Please select a boarding point.');
        }
    };

    return (
        <>
            <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-[0_-5px_13px_0_rgba(0,0,0,.25)] fixed left-0 bottom-0 w-full">
                <div className="text-left">
                    <p className="text-gray-800 text-base">
                        Selected {numberOfTickets} Seats: <span className="font-bold">{selectedSeats.map(s => s.id).join(', ') || 'None'}</span>
                    </p>
                    <p className="text-gray-800 text-base">
                        Total Price: <span className="font-bold">{totalPrice} tk</span>
                    </p>
                </div>
                <button
                    onClick={handleConfirmBooking}
                    className="bg-[#143F40] text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
                                disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedBoardingPoint.name}
                >
                    Confirm
                </button>
            </div>
            
            <SelectTripPoint remainingTime={timerRemaining} backLink="/ticket/book/seat" name="Boarding" points={boardingPoints} selectedPoint={selectedBoardingPoint.id} onClick={handleBoardingSelect}/>
        </>
    );
};

export default BoardingSelectionPage;