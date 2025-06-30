'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTicketProvider } from '@/context/TicketProvider';
import TicketTimeRemaining from '@/components/TicketTimeRemaining';

const PaymentPage = () => {
    const router = useRouter();
    const {
        selectedSeats,
        numberOfTickets,
        totalPrice,
        selectedBoardingPoint,
        passengersInfo,
        tripDetails,
        setTripDetails,
        timerRemaining,
        selectedPaymentGateway,
        setSelectedPaymentGateway,
        resetAllBookingData,
    } = useTicketProvider();


    const scheduleDetails = ` ${selectedBoardingPoint.name}`; // Dynamic date


    const paymentGateways = [
        { id: 'bKash', icon: '/assets/icon/gateway-bkash.png' },
        { id: 'Nagad', icon: '/assets/icon/gateway-nagad.png' },
        { id: 'Rocket', icon: '/assets/icon/gateway-rocket.png' }, 
        { id: 'MyPocket', icon: '/assets/icon/gateway-pocket.png' },
    ];

    const handleApplyPromo = () => {
        alert('Invalid promo code.');
    };

    const handlePayNow = async () => { // Added async for potential future API calls
        if (timerRemaining <= 0) {
            alert('Your reservation has expired. Please go back and select seats again.');
            return;
        }

        // --- Simulate API Call ---
        // In a real application, you would construct a payload with all booking details
        const bookingData = {
            tripID: tripDetails.tripID,
            fare: totalPrice,
            seats: selectedSeats.map(s => s.id).join(","),
            passenger: passengersInfo.map(p=>p.name)
        };

        try {
            let params = new URLSearchParams(bookingData);

            let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/passenger/purchase.php', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });
            response = await response.json();

            setTripDetails({
                ...tripDetails,
                ticketID: response.ticketID
            })

            router.push('/ticket/book/completed?ticketId=asdfasdf'); 
        } catch (error) {
            console.error('Error during payment processing:', error);
            alert('An error occurred during payment. Please try again.');
        }


    };

    // Handle cases where user might directly navigate or session expired
    if (numberOfTickets === 0 || !passengersInfo || passengersInfo.length === 0 || !selectedBoardingPoint) {
        return (
            <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-lg text-gray-800 mb-4">Your reservation expired. Please restart the booking process.</p>
                    <button
                        onClick={() => router.push('/ticket/book/seat')}
                        className="bg-[#143F40] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to Seat Selection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <header className="flex items-center bg-[#165051] text-white px-4 pt-3 pb-12.5">
                <Link href="/ticket/book/dropping" className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <h4 className="text-[20px] font-semibold text-center w-full">Payment</h4>
            </header>

            <div className="pt-11.5 px-3.5 -mt-7.5 rounded-[35px_35px_0_0] flex flex-col bg-white">
                {/* Reservation Timer Display */}
                <TicketTimeRemaining remainingTime={timerRemaining} />

                {/* Ticket Details Card */}
                <div className="border border-dashed rounded-md shadow-lg p-4 my-5">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-[21px] font-bold">Ticket Details:</h2>
                        <button onClick={() => router.push("/ticket/book/passenger-info")} className="text-blue-600 text-sm font-medium hover:underline">Edit</button>
                    </div>

                    <p className="text-[17px] font-medium mb-2">Passenger Details:</p>
                    {passengersInfo.map(p => (
                        <div key={p.id} className="grid grid-cols-3 gap-5 mb-2">
                            <span>{p.name}</span>
                            <span>{p.contact || "N/A"}</span>
                            <span>{p.gender}</span>
                        </div>
                    ))}

                    <p className="text-[17px] font-medium mt-5">Schedule Details:</p>
                    <div className='grid grid-cols-2'>
                        <span>{tripDetails.departureTime}, {tripDetails.departureDate}</span>
                        <span>{selectedBoardingPoint.name}</span>
                    </div>
                </div>

                {/* Choose Payment Gateway Section */}
                <div>
                    <h2 className="text-[18px] font-semibold my-4">Choose Payment Gateway</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {paymentGateways.map(gateway => (
                            <button
                                key={gateway.id}
                                onClick={() => setSelectedPaymentGateway(gateway.id)}
                                className={`flex flex-col items-center justify-center border rounded-md h-15
                                    ${selectedPaymentGateway === gateway.id ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
                            >
                                <img src={gateway.icon} alt={gateway.name} className="h-10" />
                            </button>
                        ))}
                    </div>
                    
                    <img src="/assets/icon/secure-payment.png" className='my-5 mx-auto' />
                </div>

                {/* Promo Code Section */}
                <div className="border border-gray-200 rounded-md px-4 py-3 mt-5 flex items-center">
                    <img src="/assets/icon/coupon.png" />
                    <input
                        type="text"
                        placeholder="Apply promo code and enjoy discounts"
                        className="flex-grow px-3 py-2 ml-2 border-none rounded-md focus:outline-none bg-gray-100 text-sm"
                    />  
                    <button
                        onClick={handleApplyPromo}
                        className="ml-3 bg-[#143F40] text-white font-semibold py-1.5 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                        Apply
                    </button>
                </div>

                {/* Payment Details Summary */}
                <div className="shadow-lg bg-white border border-gray-200 rounded-xl p-4 pb-6 mt-8">
                    <h2 className="text-lg font-semibold mb-5">Payment Details:</h2>
                    <div className="flex justify-between items-center text-sm mb-2">
                        <p className="text-md text-gray-700">Total Tickets: <br/> <b>({selectedSeats.map(s => s.id).join(', ')})</b></p>
                        <p className="font-medium text-gray-800">{numberOfTickets}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                        <p className="text-md text-gray-700">Ticket Price:</p>
                        <p className="font-medium text-gray-800">{totalPrice} Tk</p>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                        <p className="text-md text-gray-700">Promo Code:</p>
                        <p className="font-medium text-gray-800">{'---'}</p>
                    </div>
                    <div className="flex justify-between items-center text-md font-bold pt-2 border-t border-gray-200 mt-2">
                        <p className="text-md text-gray-800">SUBTOTAL</p>
                        <p className="text-green-700">{totalPrice} tk</p>
                    </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start ml-2 mt-5 mb-5">
                    <input type="checkbox" id="terms" className="mt-1 mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" required />
                    <label htmlFor="terms" className="text-sm text-gray-700">By clicking on it you agree to our <b>terms and conditions</b></label>
                </div>

                {/* Fixed Footer with Pay Now Button */}
                <div className="bg-gradient-to-r from-[#173E3F] to-[#3CA3A5] p-4 my-5 shadow-lg border-t border-gray-200
                            flex justify-between items-center text-white rounded-lg">
                    <p className="text-xl font-bold"><span style={{fontFamily: "sans-serif"}}>৳</span> {totalPrice}</p>
                    <button
                        onClick={handlePayNow}
                        className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-2xl hover:bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={timerRemaining <= 0 || !selectedPaymentGateway}
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </>
        
    );
};

export default PaymentPage;