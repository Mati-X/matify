import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Player from "../components/Player";
import HomeView from "../components/HomeView";
const Home = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <main className="flex">
                <Sidebar/>
                <HomeView/>
            </main>

            <div className="z-10 md:ml-[200px] ml-0 lg:ml-[15rem] sticky bottom-0">
                <Player/>
                <Bottombar/>
            </div>
        </div>
    )
}

export default Home
