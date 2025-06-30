export default function TicketTimeRemaining(props){
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    };
            

    return (
        <>
            <div className="flex flex-col items-center bg-[#e3e3e3] py-5">
                <h4 className="text-[20px] font-medium text-center px-4 mb-3">Your booked seats will be reserved for the next</h4>

                <div className="flex items-center justify-center bg-gradient-to-r from-[#FFB5B5] to-[#FF4141] text-white px-3 py-2 rounded-full ">
                    <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3H14M12 9V13L14 15M20 13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13C4 8.58172 7.58172 5 12 5C16.4183 5 20 8.58172 20 13Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="ml-1">{formatTime(props.remainingTime)}</span>
                </div>
            </div>
        </>
    )
}