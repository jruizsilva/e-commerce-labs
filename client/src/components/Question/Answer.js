import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import style from './Question.module.css';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { addAnswer } from '../../actions';

export default function Answer({ questionId, handleToggle, productId, productName, customerId}) {
  const dispatch = useDispatch();

  return (
    <div className={style.answerContainer}>
      <div>
        <Formik
          initialValues={{
            answer: '',
            questionId,
            productId,
            productName,
            customerId,
          }}
          validate={form => {
            let err = {};
            if (!form.answer) {
              err.answer = 'required';
              document.getElementById('answer').focus();
            }
            return err;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            dispatch(addAnswer(values));
            values.answer = '';
            handleToggle(questionId);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <TextareaAutosize
                id="answer"
                name="answer"
                maxRows={3}
                placeholder="Write your answer..."
                value={values.answer}
                onChange={handleChange}
              />
              <button type="submit">Answer</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
