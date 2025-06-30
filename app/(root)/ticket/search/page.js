"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PopularDestination from "@/components/PopularDestination";


export default function SearchTicket() {
    const router = useRouter();

    const [searchData, setSearchData] = useState({
        from: {
            name: "Dhaka",
            shortName: "DHA"
        },
        to: {
            name: "Chittagong",
            shortName: "CTG"
        },
        date: "2025-05-30",
        type: "Any"
    });


    const handleSearch = ()=>{
        router.push(`/ticket/trip?from=${searchData.from.shortName}&to=${searchData.to.shortName}&dep_date=${searchData.date}`)
    }


    return (
        <>
            <div className="bg-[#143F40] rounded-es-2xl rounded-ee-2xl text-white max-h-[335px] h-[70vh] flex flex-col items-start gap-8 px-4 py-3">
                <Link href="/" className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className="flex flex-col gap-2.5 ml-3">
                    <h3 className="text-[28px] font-bold">Where do you want to go?</h3>
                    <h5 className="text-[17px]">Select locations, date and coach.</h5>
                </div>
            </div>

            <div className="flex flex-col gap-5 -mt-22.5 mx-5 mb-10 p-4 rounded-lg shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] bg-white">
                <div className="relative w-full">
                    <input type="text" value={searchData.from.name} onChange={(e)=>{searchData.from.name(e.currentTarget.value)}}  className="border-1 border-[#ADADAD] rounded-md w-full h-17.5 p-3.5 pb-0 outline-none text-[17px] font-semibold peer floating-inputBox"/>
                    <span className="absolute left-3 transform -translate-y-1/2 text-[#777] text-[17px] peer-focus:text-[14px] peer-focus:top-4 duration-300 pointer-events-none">From</span>
                </div>

                <div className="relative w-full">
                    <input type="text" value={searchData.to.name} onChange={(e)=>{searchData.to.name(e.currentTarget.value)}} className="border-1 border-[#ADADAD] rounded-md w-full h-17.5 p-3.5 pb-0 outline-none text-[17px] font-semibold peer floating-inputBox"/>
                    <span className="absolute left-3 transform -translate-y-1/2 text-[#777] text-[17px] peer-focus:text-[14px] peer-focus:top-4 duration-300 pointer-events-none">To</span>
                </div>

                <div className="flex justify-between gap-5">
                    <div className="relative w-1/2">
                        <input type="text" value={searchData.date} onChange={(e)=>{searchData.date(e.currentTarget.value)}}  className="border-1 border-[#ADADAD] rounded-md w-full h-17.5 p-3.5 pb-0 outline-none text-[17px] font-semibold peer floating-inputBox"/>
                        <span className="absolute left-3 transform -translate-y-1/2 text-[#777] text-[17px] peer-focus:text-[14px] peer-focus:top-4 duration-300 pointer-events-none">Departure Date</span>
                    </div>
                    <div className="relative w-1/2">
                        <input type="text" value={searchData.type} onChange={(e)=>{searchData.type(e.currentTarget.value)}}  className="border-1 border-[#ADADAD] rounded-md w-full h-17.5 p-3.5 pb-0 outline-none text-[17px] font-semibold peer floating-inputBox"/>
                        <span className="absolute left-3 transform -translate-y-1/2 text-[#777] text-[17px] peer-focus:text-[14px] peer-focus:top-4 duration-300 pointer-events-none">Coach Type</span>
                    </div>
                </div>

                <div onClick={handleSearch} className="bg-[#1D6B6D] text-[17px] text-center font-bold text-white rounded-lg py-3.5 cursor-pointer">Search Ticket</div>
            </div>

            {/* Popular Destination */}
            <PopularDestination/>
        </>
    )
}