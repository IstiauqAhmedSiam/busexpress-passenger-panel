'use client'; 

import React, { createContext, useState, useContext, useMemo, useCallback, useEffect, use } from 'react';

const TicketContext = createContext();

const MAX_SELECTIONS = 5;   // Maximum Seat Selection Per Passenger
const RESERVATION_TIME_SECONDS = 5*60;  // Selected seat will be reserved for Upto 5mins

// Temporary static data. 
// Later will be replaced by API Data
const SEAT_PRICE = 800; // Define price here or pass as prop if dynamic
const TRIP_DETAILS = {
        busOperatorName: 'Hanif Intercity',
        busOperatorLogo: '/assets/company/hanif.png',
        busOperatorClass: 'Business Class, AC',
        busNumber: '801-DA-90',
        departureCity: 'Dhaka',
        arrivalCity: 'Cox Bazar',
        departureDate: '30 Apr',
        departureTime: '12:00 AM', 
        arrivalTime: '8:30 AM', 
    };




export const TicketProvider = ({ children }) => {
    const [seatPrice, setSeatPrice] = useState();
    const [seats, setSeats] = useState([]);

    const selectedSeats = useMemo(() => {
        return seats.filter(seat => seat.status === 'selected');
    }, [seats]);

    const numberOfTickets = useMemo(() => selectedSeats.length, [selectedSeats]);
    const totalPrice = useMemo(() => numberOfTickets * seatPrice, [numberOfTickets]);

    // Timer state
    const [timerRemaining, setTimerRemaining] = useState(RESERVATION_TIME_SECONDS);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Trip Details
    const [tripDetails, setTripDetails] = useState(TRIP_DETAILS);

    // Trip Point State
    const [selectedBoardingPoint, setSelectedBoardingPoint] = useState({id: "", name: "", time: ""});
    const [selectedDroppingPoint, setSelectedDroppingPoint] = useState({id: "", name: "", time: ""});

    // Passenger Info
    const [passengersInfo, setPassengersInfo] = useState([]);

    // Payment Gateway
    const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('');

    const toggleSeatStatus = (seatId) => {
        setSeats(prevSeats =>
            prevSeats.map(seat => {
                if (seat.id === seatId) {
                    if (seat.status === 'available' && selectedSeats.length >= MAX_SELECTIONS) {
                        alert(`You can select a maximum of ${MAX_SELECTIONS} seats.`);
                        return seat;
                    }
                    if (seat.status === 'available') {
                        return { ...seat, status: 'selected' };
                    } else if (seat.status === 'selected') {
                        return { ...seat, status: 'available' };
                    }
                }
                return seat;
            })
        );
    };

    // Function to release selected seats when timer expires or cancelled
    const releaseSeats = useCallback(() => {
        setSeats(prevSeats =>
            prevSeats.map(seat =>
                seat.status === 'selected' ? { ...seat, status: 'available' } : seat
            )
        );

        setIsTimerActive(false);
        setTimerRemaining(RESERVATION_TIME_SECONDS); // Reset timer for next selection
        alert('Your reserved seats have been released due to time expiration.');
    }, []);


    const startReservationTimer = useCallback(() => {
        if (selectedSeats.length > 0 && !isTimerActive) {
            setTimerRemaining(RESERVATION_TIME_SECONDS);
            setIsTimerActive(true);
        }
    }, [selectedSeats.length, isTimerActive]);


    useEffect(() => {
        let timerInterval;
        if (isTimerActive && timerRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimerRemaining(prevTime => prevTime - 1);
            }, 1000);
        } else if (timerRemaining === 0 && isTimerActive) {
            // Timer expired
            clearInterval(timerInterval);
            // releaseSeats(); // Release seats
        }

        return () => clearInterval(timerInterval);
    }, [timerRemaining, isTimerActive, releaseSeats]); 



    const resetAllBookingData = useCallback(() => {
        return;
        seatPrice(0);
        setSeats([]);
        setTripDetails();
        setIsTimerActive(false);
        setTimerRemaining(RESERVATION_TIME_SECONDS); 
        setPassengersInfo([]);
        setSelectedPaymentGateway("");
        setSelectedBoardingPoint({id: "", name: "", time: ""});
        setSelectedDroppingPoint({id: "", name: "", time: ""});
    }, []);



    // Value provided by the context
    const contextValue = useMemo(() => ({
        seatPrice,
        setSeatPrice,

        // Trip Details
        tripDetails,
        setTripDetails,

        // Seat Selection
        seats,
        setSeats,
        selectedSeats,
        numberOfTickets,
        totalPrice,
        toggleSeatStatus,

        // Boarding point state
        selectedBoardingPoint,
        setSelectedBoardingPoint,

        // Dropping Point State
        selectedDroppingPoint,
        setSelectedDroppingPoint,

        // Seat Reservation
        startReservationTimer, 
        timerRemaining,  
        isTimerActive, 
        releaseSeats,

        // Passenger Info
        passengersInfo,
        setPassengersInfo,

        // Payment Gateway
        selectedPaymentGateway,
        setSelectedPaymentGateway,

        resetAllBookingData
    }), [seats, selectedSeats, numberOfTickets, totalPrice, toggleSeatStatus, selectedBoardingPoint, startReservationTimer,
        timerRemaining, isTimerActive, releaseSeats]);

    return (
        <TicketContext.Provider value={contextValue}>
            {children}
        </TicketContext.Provider>
    );
};


export const useTicketProvider = () => {
    return useContext(TicketContext);
};