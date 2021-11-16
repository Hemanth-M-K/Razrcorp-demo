import React, { useState } from "react";
import corrections from "../models/Corrections";
import styles from '../styles/AutoCorrector.module.css';

const AutocorrectTextarea: React.FunctionComponent = ():JSX.Element => {
    const [value, setValue] = useState<string>('')

    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        if(value[value.length -1] === ' ') {
            const words = value.substring(0,value.length - 1).split(' ');
            const word = words[words.length-1];
            if(corrections[word]) {
                words.pop();
                words.push(corrections[word]);
            }
            value = words.join(' ')+ ' ';
        }

        setValue(value);
    }
    return (
    <div className='px-3'>
        <h1 className='text-center'>Auto Correct Text</h1>
        <textarea rows={5} onChange={onInputChange} value={value} className={styles.textarea} data-testid="textarea" placeholder='Please Enter Your Data'/>
    </div>)
}

export default AutocorrectTextarea