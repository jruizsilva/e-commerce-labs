import React from "react";
import style from "./MessageError.module.css";

const MessageError = ({ msg }) => {
  return <div className={style.error}>{msg}</div>;
};

export default MessageError;
