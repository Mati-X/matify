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
        <div
            className="flex-col h-screen text-gray-500 text-xs border-r md:inline-flex  hidden border-gray-900 z-10 lg:text-sm w-[200px] lg:w-[15rem]">
            <div
                className="flex-grow text-gray-500 scrollbar-hide p-5  overflow-y-scroll">
                <div className="space-y-4">

                    <button className="flex items-center space-x-2 hover:text-white">
                        <HomeIcon className="h-5 w-5"/>
                        <Link href={"/"}>
                            <p>Home</p>
                        </Link>
                    </button>
                    <button className="flex items-center space-x-2  hover:text-white">
                        <MagnifyingGlassIcon className="h-5 w-5"/>
                        <p>Search</p>
                    </button>
                    <button className="flex items-center space-x-2  hover:text-white">
                        <BuildingLibraryIcon className="h-5 w-5"/>
                        <p>Your Library</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900"/>
                    <button className="flex items-center space-x-2 hover:text-white">
                        <PlusCircleIcon className="h-5 w-5"/>
                        <p>Create Playlist</p>
                    </button>
                    <button className="flex items-center space-x-2  hover:text-white">
                        <HeartIcon className="h-5 w-5"/>
                        <Link href={"/liked-songs"}>
                        <p>Liked Songs</p>
                        </Link>
                    </button>
                    <button className="flex items-center space-x-2  hover:text-white">
                        <RssIcon className="h-5 w-5"/>
                        <p>Your Episodes</p>
                    </button>
                    <hr className="border-t-[0.1px] border-gray-900"/>
                    <div className="space-y-5">
                        {playlists.map((playlist) => (
                            <p>
                            <Link href={`/playlist/${playlist.id}`} key={playlist.id} onClick={() => setPlaylistId(playlist.id)}
                                   className="cursor-pointer hover:text-white truncate">
                                    {playlist.name}
                            </Link></p>
                        ))}
                    </div>
                </div>

            </div>
            <hr className="border-t-[0.1px] border-gray-900 mx-5"/>
            <div className="flex justify-around items-center h-24 space-x-2 p-4 font-semibold">
                <img className="w-12 h-12 rounded-md" src={session?.user.image}/>
                <p className="truncate w-24">{session?.user.name}</p>
                <ChevronUpIcon className="cursor-pointer h-5 w-5 bg-gray-900 text-white rounded-full"
                               onClick={() => signOut()}/>
            </div>
        </div>
    );
}

export default Sidebar;