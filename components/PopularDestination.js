import Image from "next/image";

export default function PopularDestination(){
    const desintaitons = [
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Chittagong",
            imgPath: "/assets/img/destination/ctg_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
        {
            name: "Rajshahi",
            imgPath: "/assets/img/destination/rajshahi_dest.png"
        },
        {
            name: "Cox's Bazar",
            imgPath: "/assets/img/destination/cxb_dest.png"
        },
    ]


    return (
        <section className="flex flex-col gap-[16px] my-6">
            <h2 className="text-[22px] font-bold ml-4">Popular Destination</h2>

            <div className="flex nowrap gap-3 overflow-auto scrollbar-none px-4">
                {
                    desintaitons.map((destination, index)=>(
                        <div className="relative rounded-xl overflow-hidden flex-[0_0_auto]" key={index}>
                            {/* overlay */}
                            <div className="absolute top-0 left-0 w-full h-full bg-black/25 flex items-end pl-4 pb-2">
                                <span className="text-white text-[17px] font-semibold">{destination.name}</span>
                            </div>
                            <Image src={destination.imgPath} width="150" height="200" alt="" className="h-[200px]"/>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}