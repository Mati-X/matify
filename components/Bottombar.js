import React, {useEffect, useState} from 'react';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BuildingLibraryIcon,
    HeartIcon,
    RssIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import {useSession} from "next-auth/react";
import {signOut} from "next-auth/react";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";
import Link from "next/link";

function Sidebar(props) {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    return (
        <div>
            <div
                className="bg-black md:z-0 flex w-screen justify-around items-center text-gray-500 text-xs  md:hidden h-24 inline-flex  border-gray-900">
                <Link href={"/"} className="flex flex-col gap-2 items-center justify-around hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </Link>

                <Link href={""} className="flex flex-col gap-2 items-center hover:text-white">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                    <p>Search</p>
                </Link>

                <button className="flex flex-col gap-2 items-center hover:text-white">
                    <img className="w-5 h-5 rounded-md truncate" src={session?.user.image} onClick={() => signOut()}/>
                    <p>{session?.user.name}</p>
                    </button>

                    <Link href={"/liked-songs"} className="flex flex-col gap-2 items-center  hover:text-white">
                        <BuildingLibraryIcon className="h-5 w-5"/>
                        <p>Library</p>
                    </Link>

                    <Link href={"/liked-songs"} className="flex flex-col gap-2 items-center hover:text-white">
                        <HeartIcon className="h-5 w-5"/>
                        <p>Liked</p>
                    </Link>

            </div>
        </div>
);
}

export default Sidebar;