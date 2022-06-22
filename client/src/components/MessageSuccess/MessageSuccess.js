import React from "react";
import style from "./MessageSuccess.module.css";

const MessageSuccess = ({ msg }) => {
  return <div className={style.success}>{msg}</div>;
};

export default MessageSuccess;
