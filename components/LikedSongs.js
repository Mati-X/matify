import {playlistState} from "../atoms/playlistAtom";
import {useRecoilValue} from "recoil";
import Song from "./Song";
import LikedSong from "./LikedSong";

function PlaylistSongs() {
    const playlist = useRecoilValue(playlistState);
    console.log(playlist);
    return (
        <ol>
            {playlist?.map((item,index) => (
                <LikedSong key={index} index={index} item={item}/>

                )
            )}
            </ol>
    );
}

export default PlaylistSongs;