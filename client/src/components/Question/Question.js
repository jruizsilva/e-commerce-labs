import React from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import style from "./Question.module.css";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, getQuestionsWithAnswers } from "../../actions";

export default function Question({ productId, productName, sellerId }) {
  const dispatch = useDispatch();
  const { user, questionsWithAnswers } = useSelector((state) => state);
  const userQuestions = questionsWithAnswers?.filter(
    (el) => el?.userId === user?.id
  );
  useEffect(() => {
    dispatch(getQuestionsWithAnswers(productId));
  }, [dispatch, productId]);

  const renderQuestions = (el) => {
    return (
      <div key={el.id}>
        <p className={style.question}>{el.question}</p>
        <div className={style.answersContainer}>
          {el.answers?.map((el) => {
            return (
              <div className={style.answers} key={el.id}>
                <p className={style.answerText}>
                  {el.answer}{" "}
                  <span className={style.date}>
                    {el.createdAt.slice(0, 10)}
                  </span>{" "}
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
      <Formik
        initialValues={{ question: "", productId: productId, userId: user?.id, productName, sellerId }}
        validate={(form) => {
          let err = {};
          if (!form.question) {
            err.question = "required";
            document.getElementById("question").focus();
          }
          return err;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
          dispatch(addQuestion(values));
          values.question = "";
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
              <button type="submit" disabled>
                Ask
              </button>
            )}
          </Form>
        )}
      </Formik>
      <div className={style.oldAnswersContainer}>
        {userQuestions?.length ? (
          <div>
            <p className={style.title}>Your questions</p>
            <div className={style.userQuestion}>
              {questionsWithAnswers
                ?.filter((el) => el.userId === user.id)
                .map((el) => {
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
                ?.filter((el) => el?.userId !== user?.id)
                .map((el) => {
                  return renderQuestions(el);
                })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
