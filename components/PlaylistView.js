import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import PlaylistSongs from "./PlaylistSongs";
import Background from "./Background";

function PlaylistView(props) {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => {
            console.log(err);
        });
    }, [spotifyApi, playlistId]);
    console.log(playlist);
    return (
        <div className="md:relative flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <Background/>
            <div className="flex flex-col relative z-10 ">
                <div className="flex items-end space-x-7 w-full h-1/2 text-white p-5 font-bold text-2xl">
                    <img className="w-40 h-40 rounded-l-md" src={playlist?.images?.[0]?.url}/>
                    <div className="flex flex-col">
                        <p className="text-sm font-normal ">PLAYLIST</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl truncate">{playlist?.name}</h1>
                        <p className="text-sm mb-4">{playlist?.description}</p>
                        <p className="text-sm">{playlist?.owner?.display_name}</p>
                    </div>
                </div>

                <PlaylistSongs/>

            </div>

        </div>
    );
}

export default PlaylistView;