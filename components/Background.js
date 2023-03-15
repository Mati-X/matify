import React from "react";
import {useSession} from "next-auth/react";
import useSongInfo from "../hooks/useSongInfo";

function Background() {
    const songInfo = useSongInfo();
    const {data: session, status} = useSession();
    return (<div className="flex flex-col absolute flex-grow w-full  h-full z-[1]">
        <div className="relative">
            <img className="w-full aspect-square brightness-75 lg:brightness-[0.5] blur-md" src={songInfo?.album.images?.[0]?.url}/>
            <div className="absolute w-full aspect-[1/1.1] bg-gradient-to-b from-transparent via-black to-black top-0 z-10"/>
        </div>
    </div>)
}

export default Background;