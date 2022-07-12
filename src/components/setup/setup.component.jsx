
import { useState, useContext } from 'react';
import { SetupContext } from '../../context/setup.context';
import { useNavigate } from "react-router-dom";
import './setup.style.css';


const defaultFormValues = {
    minutes: 1,
    text: 'random'
}

const Setup = () => {
    const [ isCustomTime, setIsCustomTime ] = useState(false);
    const [ isCustomText, setIsCustomText ] = useState(false);
    const [ formValues , setFormValues ] = useState(defaultFormValues);

    const { setMinutes, addText } = useContext(SetupContext);

    let navigate = useNavigate();

    const handleTimeOption = (event) => {
        const option = event.target.value;
        if(option === "custom"){
            setIsCustomTime(true);
        }else{
            setIsCustomTime(false);
            setFormValues({...formValues, minutes: parseInt(option)});
        }
    }
    const handleTextOption = (event) => {
        const option = event.target.value;
        if(option === "custom"){
            setIsCustomText(true);
        }else{
            setIsCustomText(false);
            setFormValues({...formValues, text: option});
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setMinutes(formValues.minutes);
        addText(formValues.text);
        navigate('test');
    }
    const onChange = (event) => {
        // console.log(event.target.value);
        let {name, value} = event.target;
        if(name === "minutes"){
            value = parseInt(value);
        }
        setFormValues({...formValues, [name]: value });
    }
    return (
        <>
            <div className='container-setup'>
                <h1 className='title-setup'>Check your typing speed now!</h1>
                <form onSubmit={handleSubmit}>
                    <select className='selection-setup' onChange={handleTimeOption}>
                        <option value="1">1 min</option>
                        <option value="2">2 min</option>
                        <option value="5">5 min</option>
                        <option value='custom'>custom</option>
                    </select>
                    {isCustomTime ?
                        <input className='input-setup'
                        placeholder='custom time' 
                        required
                        name='minutes'
                        min='1' 
                        max='30' 
                        type='number'
                        onChange={onChange}/>
                    :null}

                    <select className='selection-setup' onChange={handleTextOption}>
                        <option value="random">Random text</option>
                        <option value="custom">Custom text</option>
                    </select>
                    {isCustomText ?
                        <textarea 
                        className='input-setup textarea' 
                        required
                        name="text" 
                        placeholder='Type your custom text here...'
                        minLength="100"
                        onChange={onChange}></textarea>
                    :null}

                    <button className='start-test-btn' type='submit'>Start Test</button>
                
                </form>
                
            </div>           
        </>
        
    )
}

export default Setup;