import React, {useState, useEffect} from "react";
import Rock from './images/zombierock.png'
import Paper from './images/zombiepaper.png'
import Scissor from './images/zombiescissor.png'
import WinDialog from "./WinDialog";

const imageNames = { Rock, Paper, Scissor};
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

    useEffect(() => {
        if(winnerDetails.count<4) {
            const timer = setTimeout(() =>
                setWinnerDetails({winner: "", isOpen:false,  currentIndex: (winnerDetails.currentIndex + 1) % 3, count: winnerDetails.count+1}), 1000);
            return () => {
                clearTimeout(timer);
            };
        }
        else if(winnerDetails.winner === ""){
            const randomNumber = Math.round(Math.random() * 2);
            const winner = findWinner(selected.action, GameCards[randomNumber]);
            setWinnerDetails({currentIndex: randomNumber, ...winner, isOpen: true, count: winnerDetails.count});
        }
    });
    return (
        <div style={{width: '30%'}}>
            <img src={imageNames[GameCards[winnerDetails.currentIndex]]} className={"ImageSelectedRight"}/>
            <WinDialog winnerDetails={winnerDetails} setAction={selected.setAction} setWinnerDetails={setWinnerDetails}/>
        </div>
    );
}

export default Card;
