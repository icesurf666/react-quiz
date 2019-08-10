import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem'
import './AnswersList.sass'

const AnswersList = props =>{
    return(
        <ul className="AnswersList">
            { props.answers.map((answer, index) => {
                return(
                    <AnswerItem
                        state={props.state ? props.state[answer.id] : null}
                        key={index}
                        answer = {answer}
                        onAnswerClick={props.onAnswerClick}
                    />
                )
            })
            }
        </ul>
    )
};
export default AnswersList;
