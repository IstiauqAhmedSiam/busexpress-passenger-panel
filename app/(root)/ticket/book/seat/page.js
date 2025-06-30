"use client"

import Image from "next/image"
import { useRouter } from 'next/navigation'; // Import useRouter
import React, { useState, useEffect, useMemo } from "react";
import { useTicketProvider } from '@/context/TicketProvider';

// Max Seat Selection
const MAX_SELECTIONS = 5;

// Seat component for individual seat rendering
const Seat = ({ id, status, onClick }) => {
    let imgSrc = '', cursorClass = '';

    switch (status) {
        case 'available':
            imgSrc = "/assets/icon/seat-available.png"
            cursorClass = 'cursor-pointer';
            break;

        case 'sold':
            imgSrc = "/assets/icon/seat-booked.png"
            cursorClass = 'cursor-not-allowed'; // Indicate not clickable
            break;

        case 'selected':
            imgSrc = "/assets/icon/seat-selected.png"
            cursorClass = 'cursor-pointer';
            break;
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-10 h-10 rounded-md mb-1 ${cursorClass}`}
                onClick={() => status !== 'sold' && onClick(id)} // Only allow click if not sold
            >
                <Image src={imgSrc} width="55" height="57" alt="" />
            </div>
            <span className="text-gray-600 font-medium">{id}</span>
        </div>
    );
};

export default function SeatSelection(){
    const router = useRouter();
    const [tripID, setTripID] = useState(new URL(location.href).searchParams.get('tripID'));
    const { seats, setSeats, setSeatPrice, selectedSeats, totalPrice, toggleSeatStatus, startReservationTimer, setTripDetails, tripDetails} = useTicketProvider();

    const handleConfirm = () => {
        if (selectedSeats.length > 0) {
            startReservationTimer();
            router.push("/ticket/book/boarding");
        } else {
            alert('Please select at least one seat to confirm.');
        }
    };

    // Function to handle seat clicks
    const handleSeatClick = (seatId) => {
        toggleSeatStatus(seatId);
    };

    // Group seats into rows of 4
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
        rows.push(seats.slice(i, i + 4));
    }

    useEffect(()=>{
        async function fetchTripDetails(){
            let tripDetails = await fetch(process.env.NEXT_PUBLIC_API_URL + "/passenger/tripDetails.php", {
                                            headers: {
                                                "Content-Type" : "application/x-www-form-urlencoded"
                                            },
                                            method: "POST",
                                            body: `tripID=${new URL(location.href).searchParams.get('tripID')}`
                                        });
                tripDetails = await tripDetails.json();
                tripDetails.tripID = new URL(location.href).searchParams.get('tripID');


            let seatsData = [
                    { id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }, { id: 'A3', status: 'available' }, { id: 'A4', status: 'available' },
                    { id: 'B1', status: 'available' },      { id: 'B2', status: 'available' }, { id: 'B3', status: 'available' }, { id: 'B4', status: 'available' },
                    { id: 'C1', status: 'available' },  { id: 'C2', status: 'available' }, { id: 'C3', status: 'available' },      { id: 'C4', status: 'available' },
                    { id: 'D1', status: 'available' }, { id: 'D2', status: 'available' }, { id: 'D3', status: 'available' }, { id: 'D4', status: 'available' },
                    { id: 'E1', status: 'available' }, { id: 'E2', status: 'available' }, { id: 'E3', status: 'available' }, { id: 'E4', status: 'available' },
                    { id: 'F1', status: 'available' }, { id: 'F2', status: 'available' }, { id: 'F3', status: 'available' }, { id: 'F4', status: 'available' },
                    { id: 'G1', status: 'available' }, { id: 'G2', status: 'available' }, { id: 'G3', status: 'available' }, { id: 'G4', status: 'available' },
                    { id: 'H1', status: 'available' }, { id: 'H2', status: 'available' }, { id: 'H3', status: 'available' }, { id: 'H4', status: 'available' },
                    { id: 'I1', status: 'available' }, { id: 'I2', status: 'available' }, { id: 'I3', status: 'available' }, { id: 'I4', status: 'available' },
                ];

            seatsData.forEach(seat=>{
                if(tripDetails.seats && tripDetails.seats.indexOf(seat.id) > -1){
                    seat.status = "sold";
                }
            })

            setTripDetails(tripDetails);
            setSeatPrice(tripDetails.fare);
            setSeats(seatsData);
        }

        fetchTripDetails();
    }, []);


    return (
        <>
            {/* Selected Seats & Total Price Display and Confirm Button */}
            <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-[0_-5px_13px_0_rgba(0,0,0,.25)] fixed left-0 bottom-0 w-full">
                <div className="text-left">
                    <p className="text-gray-800 text-base">
                        Selected Seats: <span className="font-bold">{selectedSeats.map(s => s.id).join(', ') || 'N/A'}</span>
                    </p>
                    <p className="text-gray-800 text-lg">
                        Total Price: <span className="font-bold">{totalPrice} tk</span>
                    </p>
                </div>
                <button
                    onClick={handleConfirm}
                    className="bg-[#143F40] text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
                                disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedSeats.length === 0}
                >
                    Confirm
                </button>
            </div>

            <header className="flex justify-between bg-[#165051] text-white px-4 py-3 shadow-[0_4px_3px_0_rgba(0,0,0,.25)] relative z-1">
                <h4 className="text-[20px] font-semibold">Select Seats</h4>
                <svg width="20px" className="p-.5" onClick={()=>{router.back()}} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
            </header>

            <div className="flex flex-col bg-[#143F40] rounded-[0_0_30px_30px] py-5 pb-8 px-4 text-white">
                <div className="flex gap-4">
                    <div>
                        <Image src={tripDetails.busOperatorLogo} width="100" height="30" alt=""/>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-[19px] font-bold">{tripDetails.busOperatorName}</h3>
                        <span className="text-[15px]">{tripDetails.busOperatorClass}</span>
                        <span className="text-[15px]">Coach No. #500</span>
                    </div>
                </div>

                <div className="flex items-center mt-8">
                    <div className="flex flex-col text-left w-1/3">
                        <span className="text-[#A5A5A5] text-[14px] ">Departure</span>
                        <h3 className="font-bold text-[15px]">{tripDetails.departureCity}</h3>
                        <h3 className="font-bold text-[15px]">{tripDetails.departureTime}</h3>
                    </div>
                    <div className="flex flex-col justify-center">
                        <Image src="/assets/icon/direction.png" width="230" height="5" alt=""/>
                        <span className="text-[13px] text-[#A5A5A5] font-semibold text-center">Trip time may delay due to traffic</span>
                    </div>
                    <div className="flex flex-col text-right w-1/3">
                        <span className="text-[#A5A5A5] text-[14px]">Arrival</span>
                        <h3 className="font-bold text-[15px]">{tripDetails.arrivalCity}</h3>
                        <h3 className="font-bold text-[15px]">{tripDetails.arrivalTime}</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center bg-[#F3D00B]/53 py-3 mt-5">
                <span className="text-[17px] font-medium">Maximum <b>5 seats</b> can be selected</span>
            </div>

            <div className="bg-gray-100 flex items-center justify-center py-6 px-4 mb-20">
                <div className="bg-white rounded-2xl shadow-lg py-6 px-4 w-full">
                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                            <span className="text-gray-700 text-sm text-[17px]">Available</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                            <span className="text-gray-700 text-sm text-[17px]">Sold</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-700 rounded-sm"></div>
                            <span className="text-gray-700 text-sm text-[17px]">Selected</span>
                        </div>
                    </div>

                    {/* Seat Layout */}
                    <div className="flex flex-col space-y-4"> {/* Use flex-col for rows stack vertically */}
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-around space-x-4"> {/* space-x-4 for seats horizontally */}
                                {row.map(seat => (
                                    <Seat
                                        key={seat.id}
                                        id={seat.id}
                                        status={seat.status}
                                        onClick={handleSeatClick}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}