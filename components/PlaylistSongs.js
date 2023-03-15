import {playlistState} from "../atoms/playlistAtom";
import {useRecoilValue} from "recoil";
import Song from "./Song";

function PlaylistSongs() {
    const playlist = useRecoilValue(playlistState);
    return (
        <ol>
            {playlist?.tracks?.items?.map((item,index) => (
                <Song key={index} index={index} item={item}/>

                )
            )}
            </ol>
    );
}

export default PlaylistSongs;