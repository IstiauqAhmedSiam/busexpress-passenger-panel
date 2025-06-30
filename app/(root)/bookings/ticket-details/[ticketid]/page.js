'use client';

import React, { useEffect, useState, useRef } from 'react'; 
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas'; 
import { useTicketProvider } from '@/context/TicketProvider';

const TicketDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const {
        selectedSeats,
        numberOfTickets,
        totalPrice,
        selectedBoardingPoint,
        passengersInfo,
        tripDetails,
        timerRemaining,
        selectedPaymentGateway,
        setSelectedPaymentGateway,
        resetAllBookingData,
    } = useTicketProvider();
    const { ticketId } = {ticketId: "TICKET-ABCXYZ"};

    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ticketCardRef = useRef(null); // Create a ref for the ticket card element

    // Dummy API call function to simulate fetching ticket details
    const fetchTicketDetails = async (id) => {

        return new Promise((resolve) => {
            setTimeout(() => { // Simulate network delay
                if (id) {
                    resolve({
                        id: 'A3D3SFE',
                        busOperator: 'Hanif Intercity',
                        busOperatorLogo: '/assets/company/hanif.png',
                        busType: 'AC',
                        busNumber: '801-DA-90',
                        departureTime: '12:00 am',
                        departureCity: 'Dhaka',
                        arrivalTime: '09:45 am',
                        arrivalCity: 'Cox Bazar',
                        totalPassengers: 2,
                        passengers: [
                            { name: 'Istiauq Ahmed Siam'},
                            { name: 'Mahadi Hasan'},
                        ],
                        fare: 2000,
                        seatsSelected: ['E1', 'E2'],
                        boardingPoint: 'Sayedabad, Dhaka',
                    });
                } else {
                    resolve(null); // Simulate not found
                }
            }, 500);
        });
    };

    useEffect(() => {
        const getTicket = async () => {
            if (ticketId) {
                setLoading(true);
                try {
                    const data = await fetchTicketDetails(ticketId);
                    if (data) {
                        setTicketData(data);
                    } else {
                        setError('Ticket not found or invalid ID.');
                    }
                } catch (err) {
                    setError('Failed to fetch ticket details.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No ticket ID provided.');
                setLoading(false);
            }
        };
        getTicket();
    }, [ticketId]);

    const handleDownloadTicket = async () => {
        if (!ticketCardRef.current) {
            alert("Ticket content not found for download.");
            return;
        }

        try {
            // Use html2canvas to capture the content of the div with ref 'ticketCardRef'
            const canvas = await html2canvas(ticketCardRef.current, {
                useCORS: true, // Important if you have images from different origins (e.g., CDN)
                scale: 2, // Increase scale for better quality (e.g., 2 for 2x resolution)
                // backgroundColor: null, // Set to null if you want a transparent background outside the ticket card
            });

            // Get the image data as a PNG URL
            const image = canvas.toDataURL('image/png');

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = image;
            link.download = `ticket-${ticketData.id}.png`; // Set the download filename

            // Programmatically click the link to trigger the download
            document.body.appendChild(link); // Append to body is good practice for programmatic clicks
            link.click();
            document.body.removeChild(link); // Clean up the temporary link
console.log(tripDetails);
        } catch (err) {
            console.error('Error during ticket download:', err);
            alert('Failed to download ticket. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f6f3f4] font-sans">
                <p className="text-[#364153] text-lg">Loading ticket details...</p>
            </div>
        );
    }

    if (error || !ticketData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f3f4] p-4 font-sans text-center">
                <p className="text-red-600 text-xl mb-4">{error || 'Could not load ticket details.'}</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="relative  flex flex-col py-6">
            {/* Background Overlay */}
            <div className='absolute left-0 top-0 bg-[#143F40] w-full h-1/2 -z-1 rounded-[0_0_20px_20px]'></div>

            {/* Header */}
            <div className="w-full flex justify-between items-center px-4 py-3 text-white">
                <Link href="/ticket/book/dropping" className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <h1 className="text-[20px] font-semibold">Your Ticket</h1>
                <button className="text-white hover:text-gray-200" aria-label="Share">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.882 13.064 9 12.724 9 12c0-.724-.118-1.064-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                </button>
            </div>

            {/* Ticket Card - Assign the ref here */}
            <div
                ref={ticketCardRef} // Assign the ref to the ticket card div
                className="bg-white rounded-[20px_20px_0_0] shadow-xl p-6 my-6 relative mx-6"
            >

                {/* Bus Operator Info */}
                <div className="flex items-center justify-between border-b pb-4 mb-7.5 border-dashed border-[#d1d5dc]">
                    <div className="flex items-center">
                        <img src={ticketData.busOperatorLogo} alt="Hanif Enterprise Logo" className="h-10 w-auto mr-3" />
                    </div>
                    <span className="text-sm"><b className='text-[#4a5565]'>ID</b> {tripDetails.ticketID}</span>
                </div>

                {/* Departure & Arrival Times */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-left -mr-12.5">
                        <p className="text-[17px] font-bold text-[#1e2939]">{tripDetails.departureTime}</p>
                        <p className="">{tripDetails.departureCity}</p>
                    </div>
                    <div className="flex flex-col items-center text-[#6a7282] text-sm">
                        <img src="/assets/icon/bus_route.png" alt="Route" className="h-10 w-auto" />
                        <span className="mt-1"></span>
                    </div>
                    <div className="text-right -ml-12.5">
                        <p className="text-[17px] font-bold text-[#1e2939]">{tripDetails.arrivalTime}</p>
                        <p className="">{tripDetails.arrivalCity}</p>
                    </div>
                </div>

                {/* Total Passengers & Bus Type */}
                <div className="flex justify-between items-center pb-8 mb-6 border-b-2 border-dashed border-[#d1d5dc] relative">
                    <div className="text-left">
                        <p className="text-[#6a7282]">Total Passengers</p>
                        <p className="text-lg font-semibold text-[#1e2939]">{numberOfTickets}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[#6a7282]">Bus Type</p>
                        <p className="text-lg font-semibold text-[#1e2939]">{ticketData.busType}</p>
                    </div>

                    
                    {/* Decorative cutouts */}
                    <div className="absolute bg-[#143e3f] -left-6 top-full -ml-3 h-6 w-6 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute bg-[#143e3f] -right-6 top-full -mr-3 h-6 w-6 rounded-full transform -translate-y-1/2"></div>
                </div>

                {/* Passenger Info */}
                <div className="mb-6">
                    <p className="text-lg font-semibold text-[#1e2939] mb-3">Passenger Info.</p>
                    {passengersInfo.map((passenger, index) => (
                        <div key={index} className="flex justify-between items-center text-[#364153] py-2 border-b border-[#f6f3f4] last:border-b-0">
                            <div className="flex flex-col">
                                <p className="text-md">Passenger {index + 1}</p>
                                <p className="text-md font-medium">{passenger.name}</p>
                            </div>
                            <p className="text-md font-medium text-[#4a5565]">{selectedSeats[index].id}</p>
                        </div>
                    ))}
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center pt-4 border-t-2 border-dashed border-[#d1d5dc]">
                    <div className="p-2 bg-white border border-[#6a7282] rounded-md shadow-sm">
                        <QRCode
                            value={JSON.stringify({
                                ticketId: "AE4FSA",
                                passengers: ticketData.passengers,
                                busNumber: ticketData.busNumber,
                                departureTime: ticketData.departureTime
                            })}
                            size={160}
                            level="H"
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            className="max-w-full h-auto"
                        />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#4a5565]">Bus Number: {ticketData.busNumber}</p>
                </div>

                <img src="/assets/icon/ticket-bottom-curve.png" className="absolute -bottom-5 left-0 w-full"/>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownloadTicket}
                className="bg-gradient-to-r from-[#173E3F] to-[#3CA3A5] text-white font-semibold py-4 mx-4 mt-4 rounded-md shadow-md"
            >
                Download Ticket
            </button>
        </div>
    );
};

export default TicketDetailsPage;