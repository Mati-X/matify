import React from 'react';
import {useSession} from "next-auth/react";
import Background from "./Background";

function HomeView(props) {
    const {data: session, status} = useSession();
    return (
        <div
            className="md:relative flex-grow md:h-[calc(100vh-6rem)] h-[calc(100vh-8rem)] overflow-y-none scrollbar-hide">

            <Background/>
            <div className="flex flex-col relative z-10 ">
                <div className="relative lg:flex lg:justify-center font-bold text-6xl sm:text-8xl text-white top-12 mx-12">
                    <p className="md:relative absolute  font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-100/50 to-transparent">Hello</p>
                    <p className="md:relative absolute top-12 text-right right-0 text-transparent bg-clip-text bg-gradient-to-br from-green-400/70 to-emerald-900">{session?.user.name}</p>
                </div>
            </div>
        </div>
    );
}

export default HomeView;