"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import UpcomingTrip from "../../components/UpcomingTrip";
import PopularDestination from "../../components/PopularDestination";


const BannerList = [
    { 
        src: "/assets/img/banner/slide_1.png"
    },
    { 
        src: "/assets/img/banner/slide_2.png"
    },
    { 
        src: "/assets/img/banner/slide_3.png"
    }
];

const coupons = [
    {
        "name" : "Eid10",
        "desc" : "Get flat 10% discount on this Eid",
        "validTill" : "7 June",
        "imgPath": "/assets/img/coupon/coupon_1.png"
    },
    {
        "name" : "Summer200",
        "desc" : "BDT 200tk discount on this Summer",
        "validTill" : "12 July",
        "imgPath": "/assets/img/coupon/coupon_2.png"
    },
    {
        "name" : "New100",
        "desc" : "Save up to 100tk on your first trip",
        "validTill" : "",
        "imgPath": "/assets/img/coupon/coupon_1.png"
    },
];

export default function Home() {
    const bannerWrapperElem = useRef(null);

    useEffect(()=>{
        let currentIndex = 0;

        let BannerSlideInterval = setInterval(()=>{
            const imageWidth = window.innerWidth;

            bannerWrapperElem.current.scrollTo({
                left: currentIndex * imageWidth,
                behavior: 'smooth',
            });

            currentIndex = (currentIndex + 1) % BannerList.length;
        }, 5e3);

        return () => clearInterval(BannerSlideInterval);
    });

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-[#143F40] rounded-[0_0_30px_30px] text-white">
                <div className="flex items-center">
                    <Image src="/assets/img/avatar.png" width="55" height="55" alt="User Avatar" />

                    <div className="flex flex-col ml-2">
                        <span className="text-[15px]">Welcome</span>
                        <h3 className="text-[17px] font-[600]">Istiauq Ahmed Siam</h3>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-[#4C6C6D] rounded-full w-10 h-10 flex justify-center items-center">
                        <Image src="/assets/icon/notification.png" width="22" height="22" alt="Notification" />
                    </div>
                    <div className="bg-[#4C6C6D] rounded-full w-10 h-10 flex justify-center items-center">
                        <Image src="/assets/icon/community__white.png" width="32" height="32" alt="Notification" />
                    </div>
                </div>
            </header>

            <section className="flex justify-between items-center m-4 my-6 px-4 py-3 rounded shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] cursor-pointer">
                <div className="flex items-center">
                    <Image src="/assets/icon/pocket.png" width="30" height="30" alt="My Pocket" />
                    <h3 className="bg-gradient-to-r from-[#425DC8] to-[#24E273] bg-clip-text text-transparent text-[16px] font-bold">My Pocket</h3>
                </div>

                <div className="flex items-center">
                    <h3 className="font-semibold text-[13px] leading-2">Pay Safer, Pay Faster</h3>
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </section>


            {/* Services  */}
            <section className="flex flex-col gap-[16px] mx-4 my-6">
                <h2 className="text-[22px] font-bold">Services</h2>

                <div className="grid grid-cols-3 gap-3.5">
                    <Link href="/ticket/search" className="flex flex-col justify-center items-center h-22.5 rounded shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] cursor-pointer">
                        <Image src="/assets/icon/book_ticket.png" width="50" height="50" alt="" />
                        <span className="text-[14px]">Book Ticket</span>
                    </Link>
                    {/* <div className="flex flex-col justify-center items-center h-22.5 rounded shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] cursor-pointer">
                        <div className="h-12.5 flex justify-cente items-center">
                            <Image src="/assets/icon/bus_rent.png" width="60" height="60" alt="" />
                        </div>
                        <span className="text-[14px]">Rent Bus</span>
                    </div>
                    <div className="flex flex-col justify-center items-center h-22.5 rounded shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] cursor-pointer">
                        <Image src="/assets/icon/community.png" width="50" height="50" alt="" />
                        <span className="text-[14px]">Community</span>
                    </div> */}
                </div>
            </section>

            {/* Upcoming Trips */}
            <UpcomingTrip />

            {/* Banner */}
            <section className="flex overflow-x-auto rounded scrollbar-none my-10 gap-7.5 px-4" ref={bannerWrapperElem}>
                {
                    BannerList.map((banner, index)=>(
                        <Image key={index} src={banner.src} width="500" height="50" alt="" className="flex-[0_0_auto] w-screen rounded-lg"/>
                    ))
                }
            </section>

            {/* Popular Destination  */}
            <PopularDestination/>

            {/* Offers */}
            <section className="flex flex-col gap-[16px] my-6">
                <div className="flex justify-between items-center mx-4">
                    <h2 className="text-[22px] font-bold">Offers for you</h2>
                    <button className="text-[#4764F3] font-bold">View all</button>
                </div>

                <div className="flex nowrap gap-6.5 overflow-auto scrollbar-none px-4">
                    {
                        coupons.map((coupon, index)=>(
                            <div key={index} className='flex flex-col justify-between items-start flex-[0_0_auto] px-3 py-4 rounded rounded-2 w-[250px] h-[140px] bg-no-repeat' style={{ backgroundImage: `url(${coupon.imgPath})` }}>
                                <div>
                                    <h3 className="text-[15px] font-bold">{coupon.desc}</h3>
                                    <span className="text-[11px] text-[#616161] font-semibold">{coupon.validTill}</span>
                                </div>
                                <div className="flex items-center bg-white rounded-2xl px-3 py-1">
                                    <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L11.5,3 C11.6326082,3 11.7597852,3.05267842 11.8535534,3.14644661 L20.1564971,11.4493903 C21.2890176,12.5819108 21.2890176,14.4180892 20.1564971,15.5506097 L15.5506097,20.1564971 C14.4180892,21.2890176 12.5819108,21.2890176 11.4493903,20.1564971 L3.14644661,11.8535534 C3.05267842,11.7597852 3,11.6326082 3,11.5 L3,5.5 Z M11.2928932,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,11.2928932 L12.1564971,19.4493903 C12.8984933,20.1913865 14.1015067,20.1913865 14.8435029,19.4493903 L19.4493903,14.8435029 C20.1913865,14.1015067 20.1913865,12.8984933 19.4493903,12.1564971 L11.2928932,4 Z M8,7 C7.44771525,7 7,7.44771525 7,8 C7,8.55228475 7.44771525,9 8,9 C8.55228475,9 9,8.55228475 9,8 C9,7.44771525 8.55228475,7 8,7 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"/>
                                    </svg>
                                    <span className="text-[12px] font-semibold ml-1.5">{coupon.name}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>

        </>
    )
}