"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const generateNextTwentyConsecutiveDaysObj = ()=>{
    let dateObj = new Date();
    let consecutiveDaysObj = [];

    for(var i=1; i<=30; i++){
        consecutiveDaysObj.push({
            date: dateObj.getDate(),
            day: dateObj.getDay(),
            month: dateObj.getMonth()
        });

        dateObj.setDate(dateObj.getDate() + 1)
    }

    return consecutiveDaysObj;
}


let MonthNameList = [
  { shortName: 'JAN', fullName: 'January' },
  { shortName: 'FEB', fullName: 'February' },
  { shortName: 'MAR', fullName: 'March' },
  { shortName: 'APR', fullName: 'April' },
  { shortName: 'MAY', fullName: 'May' },
  { shortName: 'JUN', fullName: 'June' },
  { shortName: 'JUL', fullName: 'July' },
  { shortName: 'AUG', fullName: 'August' },
  { shortName: 'SEP', fullName: 'September' },
  { shortName: 'OCT', fullName: 'October' },
  { shortName: 'NOV', fullName: 'November' },
  { shortName: 'DEC', fullName: 'December' }
];

let DaysNameList = [
  { shortName: 'SUN', fullName: 'Sunday' },
  { shortName: 'MON', fullName: 'Monday' },
  { shortName: 'TUE', fullName: 'Tuesday' },
  { shortName: 'WED', fullName: 'Wednesday' },
  { shortName: 'THU', fullName: 'Thursday' },
  { shortName: 'FRI', fullName: 'Friday' },
  { shortName: 'SAT', fullName: 'Saturday' }
];

export default function BusTicket(){
    let router = useRouter();
    const [searchResult, setSearchResult] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showSortDrawer, setShowSortDrawer] = useState(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [searchData, setSearchData] = useState({
        from: "",
        to: "",
        dep_date: "",
        price: "",
        time: "",
        coach: ""
    });


    useEffect(()=>{
        let url = new URL(location.href);

        setSearchData({
            ...searchData,
            from: url.searchParams.get("from"),
            to: url.searchParams.get("to"),
            dep_date: url.searchParams.get("dep_date"),
        })
    }, [])


    useEffect(()=>{
        if(!searchData.from) return;

        async function fetchTripData(){
            let params = new URLSearchParams(searchData);
            let tripFetchData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/passenger/searchTrip.php?" + params.toString())
                tripFetchData = await tripFetchData.json();

            setSearchResult(tripFetchData);
        }

        fetchTripData();
    }, [searchData]);



    useEffect(()=>{
        // setSearchResult([
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        //     {company_name: "Green Line Paribahan", company_logo: "/assets/company/greenline.png", starting_point:{time: "08:30 PM", date: "Wed, 30 Apr", place: "Dhaka"}, ending_point: {time: "10:30 AM", date: "Thu, 1 May", place: "Cox's Bazar"}, approx_duration: "8h 0m", price: "1,500", available_seats: 20},
        // ]);

    }, [selectedDate]);


    return (
        <>  
            {/* Sort By Navigation Drawer */}
            <div
                // The backdrop always exists, but its opacity and pointer events are managed
                className={`fixed inset-0 bg-[rgba(0,0,0,.6)] z-20 flex items-end
                            transition-opacity duration-300 ${
                                showSortDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                            }`}
                onClick={() => setShowSortDrawer(false)} // Close when clicking outside
            >
                <div
                    // The inner drawer itself handles the slide animation
                    className={`flex flex-col w-screen h-2/5 bg-white rounded-[20px_20px_0_0] transform
                                transition-transform duration-300 ease-out
                                ${showSortDrawer ? 'translate-y-0' : 'translate-y-full'}`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div className="flex flex-col w-full items-center gap-5 py-3 border-b-1 border-[#D9D9D9]">
                        <span className="w-12.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
                        <span className="font-bold text-[24px]">SORT BY</span>
                    </div>

                    <div className="flex flex-col w-full pt-4">
                        <div className="flex items-center px-5 py-2.5 active:bg-[#cdcbcb]" onClick={()=>{setSearchData({...searchData, price: "lth"}); setShowSortDrawer(false)}}>
                            <Image src="/assets/icon/sort-lth.png" width="15" height="15" alt="Sort Low to High" />
                            <span className="font-semibold text-[17px] ml-2">Low to High</span>
                        </div>
                        <div className="flex items-center px-5 py-2.5 active:bg-[#cdcbcb]" onClick={()=>{setSearchData({...searchData, price: "htl"}); setShowSortDrawer(false)}}>
                            <Image src="/assets/icon/sort-htl.png" width="15" height="15" alt="Sort High to Low" />
                            <span className="font-semibold text-[17px] ml-2">High to Low</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Navigation Drawer */}
            <div
                 className={`fixed inset-0 bg-[rgba(0,0,0,.6)] z-20 flex items-end
                            transition-opacity duration-300 ${
                                showFilterDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                            }`}
                onClick={() => setShowFilterDrawer(false)} // Close when clicking outside
            >
                <div
                    className={`flex flex-col w-screen min-h-3/5 bg-white rounded-[20px_20px_0_0] transform
                                transition-transform duration-300 ease-out
                                ${showFilterDrawer ? 'translate-y-0' : 'translate-y-full'}`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div className="flex flex-col w-full items-center gap-5 py-3 border-b-1 border-[#D9D9D9]">
                        <span className="w-12.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
                        <span className="font-bold text-[24px]">FILTER</span>
                    </div>

                    <div className="flex flex-col justify-between w-full py-4 h-full">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col px-4">
                                <h4 className="text-[19px] font-bold mb-3">COACH TYPE</h4>

                                <div className="flex flex-wrap items-center gap-[.5rem_.8rem]">
                                    {[
                                        { option_name: 'All', icon: '/assets/icon/coach-any.png' },
                                        { option_name: 'AC', icon: '/assets/icon/coach-ac.png' },
                                        { option_name: 'Non AC', icon: '/assets/icon/coach-nonac.png' },
                                    ].map((el, index) => (
                                        <div key={index} className="flex items-center bg-[#E6E5E5] rounded-md px-4 py-2">
                                            <Image src={el.icon} width="15" height="15" alt={el.option_name} />
                                            <span className="text-[15px] font-semibold ml-2">{el.option_name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col px-4 mb-8">
                                <h4 className="text-[19px] font-bold mb-3">TIME</h4>

                                <div className="flex flex-wrap items-center gap-[.5rem_.8rem]">
                                    {[
                                        { option_name: '04 am - 12 pm', icon: '/assets/icon/time-morning.png' },
                                        { option_name: '12 pm - 06 pm', icon: '/assets/icon/time-midday.png' },
                                        { option_name: '06 pm - 03 am', icon: '/assets/icon/time-night.png' },
                                    ].map((el, index) => (
                                        <div key={index} className="flex items-center bg-[#E6E5E5] rounded-md px-4 py-2">
                                            <Image src={el.icon} width="15" height="15" alt={el.option_name} />
                                            <span className="text-[15px] font-semibold ml-2">{el.option_name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="text-white text-[17px] font-bold bg-[#1D6B6D] rounded px-3 py-2 mx-3">
                            APPLY FILTERS
                        </button>
                    </div>
                </div>
            </div>


            {/* Floating Sort-Filter button */}
            <div className="flex bg-[#1a1a1a] text-white rounded-full justify-center items-center fixed left-1/2 bottom-5 transform -translate-x-1/2 px-3 py-3 z-1">
                <div className="flex items-center justify-center border-r-1 pr-2 mr-2" onClick={() => setShowSortDrawer(true)}>
                    <Image src="/assets/icon/sort.png" width="25" height="16" alt=""/>
                    <span className="ml-2">Sort</span>
                </div>
                <div className="flex items-center justify-center" onClick={() => setShowFilterDrawer(true)}>
                    <Image src="/assets/icon/filter.png" width="25" height="16" alt=""/>
                    <span className="ml-2">Filter</span>
                </div>
            </div>




            <div className="bg-[#143F40] bg-[url(/assets/icon/world_map.png)] bg-center bg-no-repeat rounded-[0_0_50px_50px] text-white flex flex-col items-start gap-8 px-4 py-3 pb-15">
                <Link href="/ticket/search" className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                <div className="flex justify-center w-full px-5 overflow-hidden">
                    <h3 className="text-[23px] font-semibold mt-10 -mr-6 text-right w-[35%]">{searchData.from}</h3>
                    <Image src="/assets/icon/bus_route.png" width="232" height="38" alt="" className="h-[45px]"/>
                    <h3 className="text-[23px] font-semibold mt-10 -ml-6 text-left w-[35%]">{searchData.to}</h3>
                </div>

                <div className="flex justify-center items-center w-full">
                    <h5 className="text-[17px] font-medium">{DaysNameList[selectedDate.getDay()].fullName}, {selectedDate.getDate()} {MonthNameList[selectedDate.getMonth()].fullName}</h5>
                    <svg fill="#fff" width="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/></svg>
                </div>
            </div>

            <div className="flex overflow-x-auto scrollbar-none gap-4 px-3 py-5">
                {
                    generateNextTwentyConsecutiveDaysObj().map((date, index)=>(
                        <div key={index} className={`${selectedDate.getDate() == date.date ? "active": ""} [&.active]:border-[#1D6B6D] group border-2 border-[transparent] flex flex-col flex-[0_0_auto] justify-start bg-[#F1F5F9] shadow-[0_2px_7px_0_rgba(0,0,0,.25)] rounded-md w-15 h-20 pl-2 py-2 relative`} onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(), date.month, date.date)); setSearchData({...searchData, dep_date: `${selectedDate.getFullYear()}-${String(date.month).padStart(2,0)}-${String(date.date).padStart(2,0)}`})}}>
                            <span className="text-[13px] font-medium text-[#6B7280] group-[.active]:text-[#1D6B6D] group-[.active]:font-bold">{MonthNameList[date.month].shortName}</span>
                            <span className="text-[17px] font-semibold text-[#1E293B] group-[.active]:text-[#1D6B6D] group-[.active]:font-bold">{date.date}</span>
                            <span className="text-[13px] font-medium text-[#6B7280] group-[.active]:text-[#1D6B6D] group-[.active]:font-bold">{DaysNameList[date.day].shortName}</span>

                            <Image src="/assets/icon/date__selected_state.png" width='15' height='15' alt="" className="absolute right-0 bottom-0 group-[.active]:visible invisible" />
                        </div>
                    ))
                }
            </div>
            
            <div className="flex flex-col items-center gap-10 w-full p-4 pt-7 mb-10">
                {
                    searchResult.map((result, index)=>(
                        <div key={index} className="flex flex-col w-full border-1 border-[#BABABA] rounded-md overflow-hidden">
                            <div className="flex items-center border-b-1 border-[#BABABA] py-3 px-3">
                                <Image src={result.company_logo} width="50" height="50" alt="" className="w-12.5 aspect-square"/>

                                <div className="flex flex-col ml-3">
                                    <h3 className="text-[21px] font-semibold">{result.company_name}</h3>
                                    <span className="text-[#9CA3AF] text-[15px]"><b>Route:</b> {result.starting_point.place} - {result.ending_point.place}</span>
                                </div>
                            </div>
                            <div className="flex justify-between px-3 py-5">
                                <div className="flex flex-col justify-center">
                                    <span className="text-[17px] font-bold">{result.starting_point.time}</span>
                                    <span className="text-[#9CA3AF] text-[15px] font-medium">{result.starting_point.date}</span>
                                    <span className="text-[#9CA3AF] text-[15px] font-medium">{result.starting_point.place}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-medium text-[15px] text-[#999]">{result.approx_duration}</span>
                                    <Image src="/assets/icon/trip_dist.png" width="90" height="20" alt="" className="w-22.5 h-5"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[17px] font-bold">{result.ending_point.time}</span>
                                    <span className="text-[#9CA3AF] text-[15px] font-medium">{result.ending_point.date}</span>
                                    <span className="text-[#9CA3AF] text-[15px] font-medium">{result.ending_point.place}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-[#EAEAEA] px-3 py-5">
                                <h4 className="text-[22px] font-bold ">
                                    <span style={{fontFamily: "sans-serif"}}>&#2547;</span> 
                                    {result.price}
                                </h4>
                                <div className="flex flex-col">
                                    <button className="text-white text-[18px] font-bold bg-[#1D6B6D] rounded px-3 py-2" onClick={()=>{router.push(`/ticket/book/seat?tripID=${result.tripID}`)}}>BOOK TICKET</button>
                                    <span className="text-[#38A207] text-[15px] mt-2"><b>{result.available_seats}</b> Seat(s) available</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}