import { useEffect } from "react";
import "./App.css";
import GamePage from "./components/GamePage";
import { Howl } from "howler";
const bgSound1 = new Howl({
    src: ["/bg_music_1.mp3"],
    loop: true,
    volume: 0.1,
});
function App() {
    useEffect(()=>{
        bgSound1.play();
    },[])
    return (
        <div className="App">
            <GamePage />
        </div>
    );
}

export default App;
