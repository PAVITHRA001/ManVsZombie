import React, {useState, useEffect} from "react";
import ZombieRock from './images/zombierock.png'
import ZombiePaper from './images/zombiepaper.png'
import ZombieScissor from './images/zombiescissor.png'
import HumanRock from './images/Rock2.png';
import HumanPaper from './images/Paper2.png';
import HumanScissor from './images/Scissor2.png';
import WinDialog from "./WinDialog";
import HumanHand from "./images/HumanHand.png";
import RockPaperScissor from "./RockPaperScissor.mp3";

const humanImages = [ HumanRock, HumanPaper, HumanScissor];
const zombieImages = [ ZombieRock, ZombiePaper, ZombieScissor ];

const GameCards = [ "Rock", "Paper", "Scissor"];
const GameActions = [ "Hits", "Crushes", "Cuts"];

const winnerArray = [[ 0 , 1 , 0 ], [ 1, 1, 2 ], [0, 2, 2]];

function findWinner(userSelected, computerSelected) {
  if(userSelected === computerSelected) {
      return {
          winner: "tie",
          message: `${userSelected} and ${computerSelected} ties`
      }
  } else {
      const userSelectedIndex = GameCards.findIndex(ele => ele === userSelected);
      const computerSelectedIndex = GameCards.findIndex(ele => ele === computerSelected);
      const winnerIndex = winnerArray[userSelectedIndex][computerSelectedIndex];
      const winner = GameCards[winnerIndex] === userSelected;
      console.log(winnerIndex);
      return {
         winner,
         message: `${GameCards[winnerIndex]} ${GameActions[winnerIndex]} ${winner ? computerSelected : userSelected} `
      }
  }

}


function Card(userSelectedDetails) {
    const {selected} = userSelectedDetails;
    const [winnerDetails, setWinnerDetails] = useState({currentIndex: 0, winner: "", isOpen: false, count:0});
    const {winner} = winnerDetails;
    const selectedIndex = GameCards.findIndex((element) => element === selected.action );

    useEffect(() => {
        if(winnerDetails.count<3) {
            const timer = setTimeout(() =>
                setWinnerDetails({winner: "", isOpen:false, currentIndex: 0, count: winnerDetails.count+1}), 1500);
            return () => {
                clearTimeout(timer);
            };
        }
        else if(winnerDetails.winner === ""){
            const randomNumber = Math.round(Math.random() * 2);
            const winner = findWinner(selected.action, GameCards[randomNumber]);
            setWinnerDetails({currentIndex: randomNumber, ...winner, isOpen: false, count: winnerDetails.count});
        }
        else if(!winnerDetails.isOpen) {
            setTimeout(()=>
            setWinnerDetails({...winnerDetails, isOpen:true}), 3000);
        }
    });
    return (
        <div style={{display: 'flex', height: '100vh', alignItems: 'center'}}>
            <audio controls autoPlay style={{display: 'none'}}>
                <source src={RockPaperScissor} type="audio/wav"/>
            </audio>
            <img src={winner!=="" ? humanImages[selectedIndex] : HumanHand} className={winner!=="" ? "ImageSelectedLeft": "ImageLeft"}/>
            <img src={zombieImages[winnerDetails.currentIndex]} className={winner!=="" ? "ImageSelectedRight": "ImageRight"}/>
            <WinDialog winnerDetails={winnerDetails} setAction={selected.setAction} setWinnerDetails={setWinnerDetails}/>
        </div>
    );
}

export default Card;
