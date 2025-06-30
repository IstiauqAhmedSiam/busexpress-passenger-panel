import { Inter } from "next/font/google";
import { TicketProvider } from '@/context/TicketProvider';
import "../globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});

export const metadata = {
    title: "Passenger Panel | BusExpress",
    description: "BusExpress is a bus booking platform where you can book ticket for your next trip seamlessly",
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased`}
            >
                
                            <TicketProvider>
                                {children}
                            </TicketProvider>
            </body>
        </html>
    );
}