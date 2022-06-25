import React from 'react';
import { useEffect, useRef,useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import style from './Question.module.css';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, getQuestionsWithAnswers, getUserPublications } from '../../actions';
import { Link } from 'react-router-dom';
import Answer from './Answer';

export default function Question({ productId, productName, sellerId }) {
  const dispatch = useDispatch();
  const refs = useRef([])

  const [isOpen, setIsOpen] = useState(false);
  const [lastTag, setLastTag] = useState(null);
  const { user, questionsWithAnswers, userPublications } = useSelector(state => state);

  const userQuestions = questionsWithAnswers?.filter(
    el => el?.userId === user?.id
  );
 
  const isUserPublication = userPublications?.filter(el=>el.userId===user?.id)  

  useEffect(() => { 
    if(user){
      dispatch(getUserPublications(user?.id,""))
    }
    dispatch(getQuestionsWithAnswers(productId));
  }, [dispatch, productId, user]);

  const handleToggle = (id) => {  
    if(!isOpen){
      setLastTag(refs.current[id])
      refs.current[id].className = refs.current[id].className === style.show ? style.hidden : style.show;
      setIsOpen(true);
    }else if(isOpen && lastTag === refs.current[id]){
      refs.current[id].className = refs.current[id].className === style.show ? style.hidden : style.show;
      setIsOpen(false)
    }
  };
 
  const renderQuestions = el => {
    return (
      <div key={el.id}>
        <p className={style.question}>
          {el.question}{' '}
          <span className={style.date}>{el.createdAt.slice(0, 10)}</span>{' '}{ isUserPublication?.length ? (
          <Link to='#' onClick={()=>handleToggle(el.id)} className={style.answerLink}>Answer</Link>) : null }
        </p>
        
        <div className={style.hidden} ref={(element) => {refs.current[el.id] = element}}>
          <Answer questionId={el.id} handleToggle={handleToggle} productId={productId} productName={productName} customerId={el.userId}></Answer>
        </div>
        <div className={style.answersContainer}>
          {el.answers?.map(el => {
            return (
              <div className={style.answers} key={el.id}>
                <p className={style.answerText}>
                  {el.answer}{' '}
                  <span className={style.date}>
                    {el.createdAt.slice(0, 10)}
                  </span>{' '}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={style.questionContainer}>
      { !isUserPublication?.length ? (
      <Formik
        initialValues={{
          question: '',
          productId: productId,
          userId: user?.id,
          productName,
          sellerId,
        }}
        validate={form => {
          let err = {};
          if (!form.question) {
            err.question = 'required';
            document.getElementById('question').focus();
          }
          return err;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          dispatch(addQuestion(values));
          values.question = '';
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextareaAutosize
              id="question"
              name="question"
              maxRows={3}
              placeholder="Write your question..."
              value={values.question}
              onChange={handleChange}
            />
            {user ? (
              <button type="submit">Ask</button>
            ) : (
              <div className={style.tooltip} >
                <button type="submit" disabled>
                  Ask 
                <span className={style.tooltiptext}>You should sign in</span>
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      ): (null)}
      <div className={style.oldAnswersContainer}>
        {userQuestions?.length ? (
          <div>
            <p className={style.title}>Your questions</p>
            <div className={style.userQuestion}>
              {questionsWithAnswers
                ?.filter(el => el.userId === user.id)
                .map(el => {
                  return renderQuestions(el);
                })}
            </div>
          </div>
        ) : null}

        {questionsWithAnswers?.length ? (
          <div>
            <p className={style?.title}>Last Questions</p>
            <div className={style.OtherUserQuestion}>
              {questionsWithAnswers
                ?.filter(el => el?.userId !== user?.id)
                .map(el => {
                  return renderQuestions(el);
                })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
