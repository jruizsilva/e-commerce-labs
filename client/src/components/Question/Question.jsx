import React from 'react'
import { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import style from './Question.module.css'
import {Formik, Form} from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { addQuestion,getQuestionsWithAnswers } from '../../actions';


export default function Question({productId}) {
  const { user, questionsWithAnswers } = useSelector((state) => state);
console.log(questionsWithAnswers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsWithAnswers(productId))
  },[]);

// const handleClick =(e)=>{
  
// }
 
 
  return (
    <div className={style.questionContainer}> 
      <Formik
        initialValues={{question:''}}
        validate={(form) => {
          let err ={}
          if(!form.question) {
            err.question="required"
            document.getElementById("question").focus();
          }
          return err
        }}
        onSubmit={(values,{setSubmitting})=>{
          setSubmitting(false);
          console.log(values)
          dispatch(addQuestion({...values,productId,userId: user.id}))
        }}
      >
          {({
            values,
            handleChange,
          }) => (
        <Form>
          <TextareaAutosize  id='question' name='question' maxRows={3} placeholder='Write your question...' value={values.question} onChange={handleChange}/>
          {user.id ? (
          <button type='submit' >Ask</button>
          ):(
           <button type='submit' disabled >Ask</button>
          )}
        </Form>
          )}
      </Formik>
        <div className={style.oldAnswersContainer}>
            <p>Other Questions</p>
            
            {questionsWithAnswers?.map(el => {
              return(
                <div className={style.question} key={el.id}><p>{el.question}</p>
                    <div className={style.section}>
                      {el.answers?.map(el =>{
                        return(
                          <div className={style.answer} key={el.id}>{el.answer}</div>
                        )
                      })}
                    </div>
                </div>
            )})}
          
        </div>
      
    </div>
  )
}
