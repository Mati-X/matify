import React from 'react';
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";

const LikedSong = ({item, index}) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(item.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [`spotify:track:${item.id}`]
        }).then(r => {
            console.log(r)
        })
    }

    let seconds = Math.floor(item.duration_ms / 1000) % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    const minutes = Math.floor(item.duration_ms / 1000 / 60);
    const artists = item.artists.map((artist) => artist.name).join(", ");
    return (
        <div className=" mx-5 my-5 text-sm text-gray-500 hover:text-gray-300 md:w-[calc(100vw-240px)]  lg:w-[calc(100vw-280px)] hover:bg-gray-800/20 cursor-pointer"
             onClick={playSong}>
            <p className="flex justify-center items-center w-10 aspect-square float-left relative border-l border-gray-800">{index + 1}.</p>
            <div className="flex rounded-md justify-between items-center" key={item.id}>

                <img className="w-10 aspect-square rounded-md" src={item.album.images[0].url} alt=""/>
                <div className="w-1/4 text-left">
                    <p className="font-bold truncate text-white">{item.name}</p>
                    <p className="truncate">{artists}</p>
                </div>
                <p className="w-1/4 hidden md:inline truncate">{item.album.name}</p>
                <p className="text-center w-10">{minutes}:{seconds}</p>

            </div>
        </div>
    );
};

export default LikedSong;