import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Background from "./Background";
import LikedSongs from "./LikedSongs";
import useSongInfo from "../hooks/useSongInfo";

function LikedView(props) {



    const songInfo = useSongInfo();
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlist, setPlaylist] = useRecoilState(playlistState);


    useEffect(() => {
        setPlaylist([]);
        async function getAllSavedTracks() {
            let offset = 0;
            let allTracks = [];

            while (true) {
                const data = await spotifyApi.getMySavedTracks({
                    limit: 50,
                    offset: offset
                });

                const tracks = data.body.items.map(item => item.track);
                allTracks = allTracks.concat(tracks);

                if (data.body.next) {
                    offset += 50;
                } else {
                    break;
                }
            }

            setPlaylist(allTracks);
        }

        getAllSavedTracks()
            .catch(error => {
                console.error('Error fetching saved tracks:', error);
            });
    }, [spotifyApi]);
    return (
        <div className="md:relative flex-grow md:h-[calc(100vh-6rem)] h-[calc(100vh-8rem)] overflow-y-scroll scrollbar-hide">
            <Background/>
            <div className="flex flex-col relative z-10 ">
                <div className="flex items-end space-x-7 w-full h-1/2 text-white p-5 font-bold text-2xl">
                    <img className="w-40 h-40 rounded-l-md" src={songInfo?.album.images?.[0]?.url}/>
                    <div className="flex flex-col">
                        <p className="text-sm font-normal ">PLAYLIST</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl truncate">Liked Songs</h1>
                        <p className="text-sm mb-4">This is your liked songs section</p>
                        <p className="text-sm">{session?.user.name}</p>
                    </div>
                </div>

                <LikedSongs/>

            </div>

        </div>
    );
}

export default LikedView;