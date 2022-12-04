import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Congratulation from './images/Celebrations.png'
import Zombie from './images/zombie.png'
import CelebrationAudio from './Claps.wav';
import zombieEatBrains from './zombieeating.mp3';
import Tie from './Tie.png'
import tieAudio from './Tie.mp3';

export default function WinDialog(props) {
    const {isOpen = false, winner, message} = props.winnerDetails;

    const handleClose = () => {
        props.setWinnerDetails({currentIndex: 0, winner: "", isOpen: false, count: 0});
        props.setAction("");
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{backgroundColor: 'antiquewhite'}}>
                    <div
                        className="animate-character">{winner !== 'tie' ? winner ? "Congratulations !!!! You won!!!!! " : "Ooooops !!!!  Zombie ate your brains !!!!!" : "Tieeeeeee"}</div>
                    <div style={{
                        display: 'inline-grid',
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: "Seaweed Script"
                    }}>
                        { winner === "tie" ? <div>
                            <img src={Tie} style={{width: '100%'}}/>
                            <audio controls autoPlay style={{display: 'none'}}>
                                <source src={tieAudio} type="audio/wav"/>
                            </audio>
                        </div> : winner ? <div>
                            <img src={Congratulation} style={{width: '100%'}}/>
                            <audio controls autoPlay style={{display: 'none'}}>
                                <source src={CelebrationAudio} type="audio/wav"/>
                            </audio>
                        </div> : <div><img src={Zombie} style={{width: '100%'}}/>
                            <audio controls autoPlay style={{display: 'none'}}>
                                <source src={zombieEatBrains} type="audio/wav"/>
                            </audio>
                        </div>}
                        <div className="script">{winner === "tie" ? "Tie" : message}</div>
                    </div>
                </DialogTitle>
                <DialogActions style={{justifyContent: 'center', backgroundColor: 'antiquewhite'}}>
                    <Button style={{
                        backgroundColor: '#F48456',
                        color: '#fff',
                        marginBottom: '1%',
                        boxShadow: '4px 4px 2px #E4642F'
                    }} onClick={handleClose}>Play Again</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
