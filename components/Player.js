import React, {useCallback, useEffect, useState} from 'react';
import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import {
    ArrowPathRoundedSquareIcon,
    ArrowsRightLeftIcon,
    BackwardIcon,
    ForwardIcon, PauseCircleIcon, PauseIcon,
    PlayCircleIcon, PlayIcon, SpeakerWaveIcon,
} from "@heroicons/react/20/solid";
import {debounce} from "lodash";

function Player() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentTrack = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                setCurrentTrackId(data.body?.item.id);
                console.log("Now Playing: ", data.body)

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
        ;
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentTrack();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session]);


    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {
                console.log(err);
            })
        }, 20),
        []
    );


    useEffect(() => {
        if (volume > 0 && volume <= 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);


    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }

    return (
        <div>
            <hr className="border-t-[0.1px] border-gray-900 md:mx-5"/>
            <div className="h-14 md:h-24 bg-black text-white text-md md:grid md:grid-cols-3 pt-2  px-9 md:px-8 md:text-base">

                <div className="float-left md:float-none flex items-center space-x-4">
                    <img className="rounded-md h-12 aspect-square"
                         src={songInfo?.album.images?.[0]?.url}
                         alt="nima"/>
                    <div className="2xl:w-full">
                        <h3 className="md:truncate font-black">{songInfo?.name}</h3>
                        <p className="md:truncate">{songInfo?.artists?.[0]?.name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-evenly space-x-4 float-right md:float-none">
                    <ArrowsRightLeftIcon className="PlayerButton hidden md:block"/>
                    <BackwardIcon className="PlayerButton hidden md:block"/>
                    {isPlaying ? (
                        <PauseCircleIcon onClick={handlePlayPause} className="w-10 h-10 hidden md:inline"/>) : (
                        <PlayCircleIcon onClick={handlePlayPause} className="w-10 h-10 hidden md:inline"/>
                    )}
                    {isPlaying ? (
                        <PauseIcon onClick={handlePlayPause} className="my-2 w-6 h-6 md:hidden"/>) : (
                        <PlayIcon onClick={handlePlayPause} className="my-2 w-6 h-6 md:hidden"/>
                    )}
                    <ForwardIcon className="PlayerButton hidden md:block"/>
                    <ArrowPathRoundedSquareIcon className="PlayerButton hidden md:block"/>
                </div>

                <div className="flex items-center space-x-3 md:space-x-4 md:inline-flex hidden justify-end">
                    <SpeakerWaveIcon className="w-5 aspect-square"
                                     onClick={() => volume > 0 && setVolume(volume - 10)}/>
                    <input type="range" min="0" max="100" value={volume} className="w-14 md:w-28" onChange={(e) => {
                        setVolume(Number(e.target.value));
                    }}/>
                    <SpeakerWaveIcon className="w-7 aspect-square"
                                     onClick={() => volume < 100 && setVolume(volume + 10)}/>

                </div>
            </div>
        </div>
    );
}

export default Player;