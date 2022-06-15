import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./QuestionsAndAnswers.module.css"
import { addQuestion } from '../../actions';


export default function QuestionsAndAnswers({questions}) {
const { user } = useSelector((state) => state);

console.log('**************',user.id);
console.log('*****++++****---',questions[0].question);
  const dispatch = useDispatch();
  return (
    <div className='questionAndAnswersContainer'> 
          <dl>
            {questions.map(el => {
              return(
                <dt>{el.question}
                      {el.answers.map(el =>{
                        return(
                          <dd>{el.answer}</dd>
                        )
                      })}
                </dt>
               
            )})}
          </dl>

          
    </div>
  )
}