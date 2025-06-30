import Image from "next/image"

export default function UpcomingTrip(){
    return (
        <section className="flex flex-col gap-[16px] mx-4 my-6">
            <div className="flex justify-between items-center">
                <h2 className="text-[22px] font-bold">Upcoming Trips</h2>
                <button className="text-[#4764F3] font-bold">View all</button>
            </div>

            <div className="flex flex-col px-4 py-3 rounded shadow-[2px_3px_11px_0px_rgba(0,0,0,.17)] cursor-pointer">
                <div className="flex justify-between items-center">
                    <span className="text-[13px]">30th Apr, 09:45 pm</span> 
                    <span className="text-[13px]">01 May, 12:00 am</span> 
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-[18px]">DHK</h2>
                    <Image src="/assets/icon/bus_route.png" width="150" height="33" alt=""/>
                    <h2 className="font-semibold text-[18px]">CXB</h2>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[15px]">Dhaka</span>
                    <span className="text-[15px]">Coxs Bazar</span>
                </div>
            </div>
        </section>
    )

}
