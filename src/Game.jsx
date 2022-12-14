import React, {useState, useEffect} from 'react';
import Card from "./Card";
import Rock from './images/Rock2.png';
import Paper from './images/Paper2.png';
import Scissor from './images/Scissor2.png';

function Game() {
    const [action, setAction] = useState("");
    useEffect(() => {
    });
    return (
        <div style={{width: '100%', height:'100%'}}>
            {(action === "") ?
                <div style={{display: "flex", justifyContent: 'space-evenly', height:'100vh', alignItems: 'center'}}>
                    <img className="Rockimage" src={Rock} onClick={() => {setAction("Rock")}}/>
                    <img className="Paperimage" src={Paper} onClick={() => {setAction("Paper")}}/>
                    <img className="Scissorimage" src={Scissor} onClick={() => {setAction("Scissor")}}/>
                </div>
                : <Card selected = {{setAction, action}}/>
            }
        </div>
    );
}

export default Game;
