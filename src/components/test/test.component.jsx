import { useEffect, useState, useContext } from 'react';
import { SetupContext } from '../../context/setup.context';
import { useNavigate } from 'react-router';
import keySound from '../../assets/key.mp3';
import './test.style.css';

const countWords = (str) => {
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    return str.split(' ').length;
}

const Test = () => {
    let { text, minutes } = useContext(SetupContext);
    const RANDOM_TEXT  = " " + text;
    const randomTextArray = RANDOM_TEXT.split('');
    const [ currentCaracter, setCurrentCaracter ] = useState(0);
    const [ letterToType, setLetterToType ] = useState(1);
    const [ typedLetter, setTypedLetter ] = useState('');
    const [ isGameOver, setIsGameOver ] = useState(false);
    const [ accuracy, setAccuracy] = useState(0);
    const [ points, setPoints ] = useState(0);
    const [ wordsPerMinute, setWordsPerMinute ] = useState(0);
    const [ countForward, setCountForward ] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        let countDownTag = document.getElementById("countDown");
        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            let interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
    
                display.textContent = minutes + ":" + seconds;
                setCountForward(((minutes * 60) + seconds) / 60);             
        
                if (--timer < 0) {
                    setIsGameOver(true);
                    clearInterval(interval);
                }
            }, 1000);
        }
        startTimer(minutes * 60, countDownTag);
    },[minutes])
    
    useEffect(()=>{
        const handleKeydown = (event) => {
            let wrongs = document.getElementsByClassName('incorrect').length;
            let right = document.getElementsByClassName('correct').length;            
            setAccuracy(Math.round(right / (right + wrongs) * 100));
            setPoints(right);
            let typedWords = randomTextArray.filter((c, idx)=> idx < currentCaracter).join("").toString();            
            let numberOfTypedWords = countWords(typedWords);
            setWordsPerMinute(Math.round(Math.abs(numberOfTypedWords / (countForward - minutes))));
            
            if(currentCaracter >= (randomTextArray.length - 2)){
                setIsGameOver(true);
                return null;
            }        
            let audio = new Audio(keySound);
            if(event.key === "Shift" || event.key === "Alt" || event.key === "Dead" || isGameOver) {
                return null;
            }
            if(letterToType % 30 === 0){
                document.getElementById("textContainer").scrollTop += 45;
            }   
            if(event.key !== 'Backspace'){
                audio.play();
                setCurrentCaracter(prevCurrentCaracter => prevCurrentCaracter + 1);
                setLetterToType(prevLetterToType => prevLetterToType + 1);
            }
            setTypedLetter(event.key);
        }
        window.addEventListener('keydown', handleKeydown);
        
        document.getElementById(letterToType).classList.add('active');

        return () => window.removeEventListener('keydown', handleKeydown);
    },[
        letterToType, 
        currentCaracter, 
        isGameOver, 
        minutes, 
        randomTextArray, 
        countForward
    ])

    useEffect(()=>{
        document.getElementsByClassName('active')[0].classList.remove('active');
        document.getElementById(letterToType).classList.add('active');
        let currentCaracterLetter = document.getElementById(`${currentCaracter}`).innerHTML;
        if(currentCaracter !== 0){
        if(currentCaracterLetter === typedLetter){
            document.getElementById(currentCaracter).classList.add('correct');
            document.getElementById(currentCaracter).classList.remove('incorrect');
        }else{
            document.getElementById(currentCaracter).classList.remove('correct');
            document.getElementById(currentCaracter).classList.add('incorrect');
        }
        }
        
    }, [
        currentCaracter, 
        letterToType, 
        typedLetter, 
    ]);  

    const textSpan = [];

    for(let i = 0; i <= randomTextArray.length; i++){
        let caracter = randomTextArray[i];
        textSpan.push(<span id={i} key={i}>{caracter}</span>)
    } 

    return (
        <>
            <div className='container' id='textContainer'>
                <h2 id='countDown' className='countdown'>{}</h2>
                <p className='sample-text'>{textSpan}</p>      
            </div>
            <div className={`${isGameOver?'active':''} game-over`} >
                <div className={`${isGameOver?'active':''} game-over-content`}  >
                    <h1 className="test-score">Your test score</h1>
                    <div className="test-score-container">
                        <div className="typing-speed">
                                <div className="typing-speed-result">
                                    <span>{wordsPerMinute}</span>
                                    <span>WPM</span>
                                </div>
                                <p>Typing speed</p>
                        </div>
                        <div className="typing-speed">
                                <div className="typing-speed-result">
                                    <span>{accuracy}%</span>
                                </div>
                                <p>Accuracy</p>
                        </div>
                        <div className="typing-speed">
                                <div className="typing-speed-result">
                                    <span>{points}</span>
                                </div>
                                <p>Points</p>
                        </div>
                    </div>
                    <button className="btn-retake" onClick={() => navigate('/')}>Retake test</button>
                </div>

            </div>        
        </>
    )
}

export default Test;