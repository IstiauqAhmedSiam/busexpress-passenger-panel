"use client"

import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTicketProvider } from '@/context/TicketProvider';
import TicketTimeRemaining from "@/components/TicketTimeRemaining";

export default function PassengerInfo() {
    const router = useRouter();
    const {
        tripDetails,
        numberOfTickets,
        totalPrice,
        selectedSeats,
        timerRemaining,
        releaseSeats,
        selectedBoardingPoint,
        passengersInfo,
        setPassengersInfo
    } = useTicketProvider();

    // Initialize passenger data state from context or create new if context is empty
    useEffect(() => {
        if (!passengersInfo || passengersInfo.length === 0 || passengersInfo.length !== numberOfTickets) {
            setPassengersInfo(
                Array.from({ length: numberOfTickets }, (_, index) => ({
                    id: index + 1,
                    name: '',
                    contact: '',
                    gender: '', // 'Male' or 'Female'
                }))
            );
        }
    }, []);


    // Handle input changes for each passenger
    const handlePassengerInputChange = (index, field, value) => {
        setPassengersInfo(prevPassengers => {
            const newPassengers = [...prevPassengers];
            newPassengers[index] = { ...newPassengers[index], [field]: value };
            return newPassengers;
        });
    };

    const handleSubmitPassengerInfo = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic validation (e.g., check required fields)
        const allFieldsFilled = passengersInfo.every(p =>
            p.name.trim() !== '' && p.gender !== ''
        );

        if (!allFieldsFilled) {
            alert('Please fill in all required fields (First Name, Last Name, Gender) for all passengers.');
            return;
        }

        if (timerRemaining <= 0) {
            alert('Your reservation has expired. Please go back and select seats again.');
            releaseSeats(); // Ensure seats are released and redirect
            return;
        }
    };


    // If no tickets selected (e.g., user navigated directly or timer expired)
    if (numberOfTickets === 0 || !passengersInfo) { // Added !passengersInfo check
        return (
            <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-lg text-gray-800 mb-4">No seats selected or reservation expired.</p>
                    <button
                        onClick={() => router.push('/ticket/book/seat')}
                        className="bg-[#1D6B6D] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to Seat Selection
                    </button>
                </div>
            </div>
        );
    }


    return (
        <>
            <header className="flex items-center bg-[#165051] text-white px-4 py-3 shadow-[0_4px_3px_0_rgba(0,0,0,.25)] relative z-1">
                <Link href="/ticket/book/dropping" className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <h4 className="text-[20px] font-semibold text-center w-full">Passenger Information</h4>
            </header>

            {/* TimeRemaining Components */}
            <TicketTimeRemaining remainingTime={timerRemaining} />

            <form onSubmit={handleSubmitPassengerInfo} className="flex-grow p-6 space-y-6">
                {/* Dynamically generated Passenger Info sections */}
                {passengersInfo.map((passenger, index) => ( // Use passengersInfo from context
                    <div key={passenger.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            Passenger {passenger.id}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                <input
                                    type="text"
                                    id={`firstName-${index}`}
                                    value={passenger.name}
                                    onChange={(e) => handlePassengerInputChange(index, 'name', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-100"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor={`contact-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Contact No.</label>
                                <input
                                    type="tel"
                                    id={`contact-${index}`}
                                    value={passenger.contact}
                                    onChange={(e) => handlePassengerInputChange(index, 'contact', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-100"
                                />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-1">Gender: *</span>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerInputChange(index, 'gender', 'Male')}
                                        className={`py-2 px-4 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out
                                            ${passenger.gender === 'Male' ? 'bg-[#1D6B6D] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        MALE
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerInputChange(index, 'gender', 'Female')}
                                        className={`py-2 px-4 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out
                                            ${passenger.gender === 'Female' ? 'bg-[#1D6B6D] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        FEMALE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </form>

            <div className="flex-grow border border-gray-200 rounded-lg p-4 bg-white shadow-sm p-4 mx-6 mt-15 mb-30">
                <div className="flex justify-center items-center w-full pb-3 mb-8 border-b-1 border-gray-200">
                    <h3 className="text-[20px] font-bold text-[#2d9a9d]">Final Confirmation</h3>
                </div>

                <div className="flex items-start mb-6 pb-4">
                    <img src={tripDetails.busOperatorLogo} alt="Hanif Enterprise Logo" className="max-h-10 w-auto max-w-25 mr-4" /> {/* You'll need to add a logo to your public folder */}
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{tripDetails.busOperatorName}</h2>
                        <p className="text-[15px] text-[#A5A5A5]">{tripDetails.busOperatorClass}</p>
                        <p className="text-[15px] text-[#A5A5A5]"><b className="font-semibold">Bus Detail:</b> {tripDetails.busNumber}</p>
                    </div>
                </div>

                
                <div className="flex justify-between mb-6">
                    <div className="text-left">
                        <p className="text-[17px] text-[#A5A5A5]">FARE</p>
                        <p className="text-[15px] font-bold text-green-700">{totalPrice} Tk</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[17px] text-[#A5A5A5]">Seats</p>
                        <p className="text-[15px] font-bold text-green-700">{numberOfTickets}</p>
                    </div>
                </div>

                <div className="flex items-center mt-8">
                    <div className="flex flex-col text-left w-1/3">
                        <span className="text-[#A5A5A5] text-[14px]">Departure</span>
                        <h3 className="font-bold text-[15px]">{tripDetails.departureCity}</h3>
                        <h3 className="font-bold text-[15px]">{tripDetails.departureTime}</h3>
                    </div>
                    <div className="flex flex-col justify-center">
                        <img src="/assets/icon/direction.png" width="230" height="5" alt=""/>
                        <div className="flex flex-col items-center mt-2">
                            <p className="text-[#A5A5A5] text-[14px]">Boarding Point</p>
                            <p className="text-sm font-semibold text-green-700">{selectedBoardingPoint.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col text-right w-1/3">
                        <span className="text-[#A5A5A5] text-[14px]">Arrival</span>
                        <h3 className="font-bold text-[15px]">{tripDetails.arrivalCity}</h3>
                        <h3 className="font-bold text-[15px]">{tripDetails.arrivalTime}</h3>
                    </div>
                </div>
            </div>

            {/* Fixed Footer with Proceed to Payment Button for Final Confirmation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200
                                  flex justify-center items-center shadow-[-5px_-2px_20px_5px_rgba(0,0,0,.2)]">
                <button
                    onClick={() => { router.push("/ticket/book/payment") }}
                    className="bg-[#143F40] text-white font-semibold py-4 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
                                       w-full max-w-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={timerRemaining <= 0 || !passengersInfo.every(p =>p.name.trim() !== '' && p.gender !== '')}
                >
                    PROCEED TO PAYMENT
                </button>
            </div>
        </>
    )
}

{/* 
    
    // app/passenger-info/page.jsx
'use client';

import React, { useState, useEffect } from 'react'; // useEffect is added for initial state setup
import { useRouter } from 'next/navigation';
import { useTicketSelection } from '../context/TicketContext';

const PassengerInfoPage = () => {
    const router = useRouter();
    const {
        numberOfTickets,
        totalPrice,
        selectedSeats,
        timerRemaining,
        releaseSeats,
        // New: Consume passengersInfo and its setter from context
        passengersInfo,
        setPassengersInfo
    } = useTicketSelection();

    // Initialize passenger data state from context or create new if context is empty
    // This useEffect ensures that if the page is refreshed or navigated to directly,
    // and context has no passenger data, it initializes based on numberOfTickets.
    // However, if context already has data (e.g., user went back), it uses that.
    useEffect(() => {
        if (!passengersInfo || passengersInfo.length === 0 || passengersInfo.length !== numberOfTickets) {
            setPassengersInfo(
                Array.from({ length: numberOfTickets }, (_, index) => ({
                    id: index + 1,
                    firstName: '',
                    lastName: '',
                    contact: '',
                    gender: '', // 'Male' or 'Female'
                }))
            );
        }
    }, [numberOfTickets, passengersInfo, setPassengersInfo]);


    // Handle input changes for each passenger
    const handlePassengerInputChange = (index, field, value) => {
        setPassengersInfo(prevPassengers => {
            const newPassengers = [...prevPassengers];
            newPassengers[index] = { ...newPassengers[index], [field]: value };
            return newPassengers;
        });
    };

    // Format remaining time for display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}m:${secs.toString().padStart(2, '0')}s`;
    };

    const handleSubmitPassengerInfo = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic validation (e.g., check required fields)
        const allFieldsFilled = passengersInfo.every(p =>
            p.firstName.trim() !== '' && p.lastName.trim() !== '' && p.gender !== ''
        );

        if (!allFieldsFilled) {
            alert('Please fill in all required fields (First Name, Last Name, Gender) for all passengers.');
            return;
        }

        if (timerRemaining <= 0) {
            alert('Your reservation has expired. Please go back and select seats again.');
            releaseSeats(); // Ensure seats are released and redirect
            return;
        }

        console.log('Passenger Information Submitted:', passengersInfo);
        console.log('Selected Seats:', selectedSeats.map(s => s.id));
        console.log('Total Price:', totalPrice);

        alert('Passenger information submitted! (This is a demo. Next step would be payment.)');
        // In a real app, you would send this data to your backend,
        // then navigate to a payment page or confirmation.
        // For this demo, let's just go back to the home page and reset.
        releaseSeats(); // Release seats for the demo after "submission"
        router.push('/');
    };

    // If no tickets selected (e.g., user navigated directly or timer expired)
    if (numberOfTickets === 0 || !passengersInfo) { // Added !passengersInfo check
        return (
            <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-lg text-gray-800 mb-4">No tickets selected or reservation expired.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to Seat Selection
                    </button>
                </div>
            </div>
        );
    }

};

export default PassengerInfoPage;
    
    
    */}