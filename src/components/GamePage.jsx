import React, { useEffect, useState } from "react";
// import WatchIcon from "../assets/images/clock.png";
// import WinnerIcon from "../assets/images/win.png";
// import RestartIcon from "../assets/images/restart.png";
// import RightArrow from "../assets/images/right-arrow.png";
const winnerConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];
const GamePage = () => {
    const [cross, setCross] = useState([]);
    const [circle, setCircle] = useState([]);
    const [activeUser, setActiveUser] = useState("");
    const [gameEnd, setGameEnd] = useState(false);
    const [winner, setWinner] = useState("");
    const [player1, setPlayer1] = useState("Jagan");
    const [player2, setPlayer2] = useState("Ritima");
    const [points, setPoints] = useState({ player1: 0, player2: 0 });
    const [showIntstallationPopup, setShowIntstallationPopup] = useState(false);
    useEffect(() => {
        setActiveUser(player1);
        window.addEventListener("appinstalled", () => {
            document.getElementById("installation_popup").style.display = "none";
            setShowIntstallationPopup(false);
        });
        // check if the app is installed
        if (!window.matchMedia("(display-mode: standalone)").matches) {
            setShowIntstallationPopup(true);
        }
        setTimeout(() => {
            setShowIntstallationPopup(false);
        }, 60000);
    }, []);
    useEffect(() => {
        // check winner
        if (cross.length + circle.length >= 5) {
            handleCheckWinner();
        }
    }, [cross, circle]);
    const handleClickRestart = () => {
        window.location.reload();
    };
    const handleClickPlayAgain = () => {
        setCross([]);
        setCircle([]);
        setWinner("");
        setGameEnd(false);
        if (winner) {
            if (activeUser === player1) {
                setActiveUser(player2);
            } else {
                setActiveUser(player1);
            }
        }
    };
    const handleCheckWinner = () => {
        for (let item of winnerConditions) {
            const isCrossWinner = item.every((val) => cross.includes(val));
            const isCircleWinner = item.every((val) => circle.includes(val));
            if (isCrossWinner) {
                setWinner(player1);
                setGameEnd(true);
                setPoints({ ...points, player1: points.player1 + 1 });
                break;
            }
            if (isCircleWinner) {
                setWinner(player2);
                setGameEnd(true);
                setPoints({ ...points, player2: points.player2 + 1 });
                break;
            }
        }
    };
    const handleClickSquare = (event) => {
        if (gameEnd) return;
        const id = +event.target.id;
        if ([...cross, ...circle].includes(id)) return;
        if (activeUser === player1) {
            setCross([...cross, id]);
            setActiveUser(player2);
        } else {
            setCircle([...circle, id]);
            setActiveUser(player1);
        }
    };
    const handleInstall = () => {
        window.promptInstallation();
    };

    return (
        <React.Fragment>
            <div className="mobile_frame">
                <div className="mobile_frame__header">
                    <div className="mobile_frame__header__title">
                        <div className="icon">
                            <img src={winner ? "/win.png" : "/clock.png"} alt="Icon" height="70%" width="auto" />
                        </div>
                        <div className="title">
                            <h4 className="m-0">STATUS</h4>
                            <div className="d-flex">
                                <h3 className="m-0" hidden={!!winner}>
                                    Active Player: {activeUser}
                                </h3>
                                <h3 className="m-0" hidden={!winner}>
                                    Winner: {winner}
                                </h3>
                            </div>
                        </div>
                        <div onClick={handleClickRestart} className="restart_button">
                            <button className="icon-btn">
                                <img src={"/restart.png"} alt="Icon" height="100%" width="auto" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile_frame__body">
                    <div className="game_cont">
                        <div className="row row1">
                            <div className="square" onClick={handleClickSquare} id="1">
                                <SquareElement id={1} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="2">
                                <SquareElement id={2} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="3">
                                <SquareElement id={3} cross={cross} circle={circle} />
                            </div>
                        </div>
                        <div className="row row2">
                            <div className="square" onClick={handleClickSquare} id="4">
                                <SquareElement id={4} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="5">
                                <SquareElement id={5} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="6">
                                <SquareElement id={6} cross={cross} circle={circle} />
                            </div>
                        </div>
                        <div className="row row3">
                            <div className="square" onClick={handleClickSquare} id="7">
                                <SquareElement id={7} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="8">
                                <SquareElement id={8} cross={cross} circle={circle} />
                            </div>
                            <div className="square" onClick={handleClickSquare} id="9">
                                <SquareElement id={9} cross={cross} circle={circle} />
                            </div>
                        </div>
                    </div>
                    <div className="play_again">
                        <button onClick={handleClickPlayAgain} className="btn arrow-button">
                            Play Again
                            <img src={"/right-arrow.png"} alt="" />
                        </button>
                    </div>
                </div>
                <div className="mobile_frame__footer">
                    <div className="left">
                        <div className="footer_icon_cont">
                            <div className="cross-icon"></div>
                        </div>
                        <div className="player">
                            <p className="uppercase">Points - {points.player1}</p>
                            <h2 className="m-0">{player1}</h2>
                        </div>
                    </div>
                    <div className="right">
                        <div className="footer_icon_cont">
                            <div className="circle-icon"></div>
                        </div>
                        <div className="player">
                            <p className="uppercase">Points - {points.player2}</p>
                            <h2 className="m-0">{player2}</h2>
                        </div>
                    </div>
                </div>
                {showIntstallationPopup ? (
                    <div id="installation_popup" className="installation_popup">
                        <div className="app_icon">
                            <img src={"/icon.png"} alt="Icon" height="100%" width="auto" />
                        </div>
                        <div className="msg">
                            <h4 className="m-0">Tic Tac Toe Game</h4>
                            <p>Install the app to play offline</p>
                        </div>
                        <button id="install-app" className="btn" onClick={handleInstall}>
                            Install
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <style>{`
        .mobile_frame{
            background-image: url("/mbg.jpeg");
        }
        `}</style>
        </React.Fragment>
    );
};
const SquareElement = ({ id, cross = [], circle = [] }) => {
    if (cross.includes(id)) return <div className="cross-icon"></div>;
    if (circle.includes(id)) return <div className="circle-icon"></div>;
    return <></>;
};

export default GamePage;
