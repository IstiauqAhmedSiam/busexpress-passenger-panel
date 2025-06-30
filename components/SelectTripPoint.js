import Link from "next/link"
import TicketTimeRemaining from "@/components/TicketTimeRemaining"

export default function SelectTripPoint(props){
    return(
        <>
            <header className="flex items-center bg-[#165051] text-white px-4 py-3 shadow-[0_4px_3px_0_rgba(0,0,0,.25)] relative z-1">
                <Link href={props.backLink} className="bg-[#4C6C6D] p-1.5 transform rotate-[180deg] rounded-full">
                    <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <h4 className="text-[20px] font-semibold ml-2">Select {props.name}</h4>
            </header>

            <TicketTimeRemaining remainingTime={props.remainingTime} />

            <div className="flex-grow bg-white rounded-lg shadow-lg p-4 h-screen">
                <div className="space-y-4">
                    {props.points.map((point) => (
                        <label
                            key={point.id}
                            className={`flex items-center justify-between p-4 border rounded-md cursor-pointer
                                ${props.selectedPoint === point.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="boardingPoint"
                                    value={point.id}
                                    checked={props.selectedPoint === point.id}
                                    onChange={() => props.onClick(point.id)}
                                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                                />
                                <span className="ml-3 text-lg text-gray-800">{point.name}</span>
                            </div>
                            <span className="text-[#646464] text-sm">{point.time}</span>
                        </label>
                    ))}
                </div>
            </div>


        </>
        // <div className="p-4 bg-gray-100 min-h-screen flex flex-col font-sans">
        //     {/* Header */}
            
        //     <div className="bg-white rounded-md shadow-sm p-4 flex items-center mb-4">
        //         <button
        //             onClick={() => router.back()}
        //             className="mr-3 text-gray-600 hover:text-gray-800"
        //             aria-label="Back"
        //         >
        //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                 <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        //             </svg>
        //         </button>
        //         <h1 className="text-xl font-semibold text-gray-800">Select Boarding</h1>
        //     </div>

        //     {/* Boarding Options */}
        //     <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
        //         <div className="space-y-4">
        //             {boardingPoints.map((point) => (
        //                 <label
        //                     key={point.id}
        //                     className={`flex items-center justify-between p-4 border rounded-md cursor-pointer
        //                         ${props.selectedPoint === point.id ? 'border-green-600 ring-2 ring-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
        //                 >
        //                     <div className="flex items-center">
        //                         <input
        //                             type="radio"
        //                             name="boardingPoint"
        //                             value={point.id}
        //                             checked={props.selectedPoint === point.id}
        //                             onChange={() => handleBoardingSelect(point.id)}
        //                             className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
        //                         />
        //                         <span className="ml-3 text-lg text-gray-800">{point.name}</span>
        //                     </div>
        //                     <span className="text-gray-600 text-sm">{point.time}</span>
        //                 </label>
        //             ))}
        //         </div>
        //     </div>

        //     {/* Footer with Selected Tickets, Total Price, and Confirm Button */}
        //     <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200
        //                   flex justify-between items-center sm:flex-row flex-col">
        //         <div className="text-left mb-2 sm:mb-0">
        //             <p className="text-gray-800 text-sm">
        //                 Selected Tickets: <span className="font-bold">{numberOfTickets}</span>
        //             </p>
        //             <p className="text-gray-800 text-lg">
        //                 Total Price: <span className="font-bold">{totalPrice} tk</span>
        //             </p>
        //         </div>
        //         <button
        //             onClick={handleConfirmBooking}
        //             className="bg-green-800 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50
        //                        w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        //             disabled={!props.selectedPoint}
        //         >
        //             Confirm
        //         </button>
        //     </div>
        // </div>
    )
}