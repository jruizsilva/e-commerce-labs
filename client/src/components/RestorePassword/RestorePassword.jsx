import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RestorePassword.module.css";

export default function RestorePassword () {

    let { userId, token } = useParams();
    // console.log("🚀 ~ file: RestorePassword.jsx ~ line 6 ~ RestorePassword ~ token", token);

    const [password, setPassword] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errorInput, setErrorInput] = useState({
        password: '',
        confirmPassword: '',
    });

    const [success ,setSuccess] = useState({
        successMsg: '',
    });

    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    const cannotBeEmpty = "Password can't be empty.";
    const passwordRequirements = "Password must be longer than 8, it must have at least one number and one capital letter.";
    const confirmPassword = "Please, enter your password again here.";
    const doNotMatch = "Password doesn't match";
    const successMessage = "Password was changed successfully";

    function validateInputs(input) {
     
        let errors = {
            password: '',
            confirmPassword: '',
        };
        
        if(input.password === '') {
            errors.password = cannotBeEmpty;
            console.log("Contraseña vacía")
        } else if (!regexPassword.test(input.password)) {
            errors.password = passwordRequirements;
            console.log("La contraseña no cumple los requisitos.");
        } else if(input.confirmPassword === input.password) {
            // errors.confirmPassword = "";
            console.log("Ahora sí coinciden");
        } else {
            console.log("Password cumple los requisitos!");
            errors.password = "";
        };

        if(input.confirmPassword === '') {
            errors.confirmPassword = confirmPassword;
            console.log("Confirmación vacía");
        } else if(input.confirmPassword !== input.password) {
            errors.confirmPassword = doNotMatch;
            console.log("Confirm password: la contraseña no coincide.");
        } else if(input.confirmPassword === input.password) {
            errors.confirmPassword = "";
            console.log("Ahora sí coinciden");
        };

        return errors;
    };

    function onChangeHandler(e) {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });

        let errorResults = validateInputs({
            ...password,
            [e.target.name]: e.target.value
        })

        setErrorInput(errorResults);
    };

    function onsubmitHandler(e) {
        e.preventDefault();

        const newPassword = {
            password: password.password,
            token,
            userId,
        };
        
        if(password.password !== '' && errorInput.password === '' && errorInput.confirmPassword === '') {
            console.log("Enviando datos");
            axios.put("http://localhost:3001/api/forgotpassword/", newPassword);
            document.getElementById("password").className = styles.input;
            document.getElementById("confirmPassword").className = styles.input;
            document.getElementById("submitBtn").className = styles.submitBtnDisabled;
            document.getElementById("submitBtn").disabled = true;
            setSuccess({
                successMsg: successMessage
            });
        } else {
            console.log("Hay errores pendientes.");
            document.getElementById("password").className = styles.inputError;
            document.getElementById("confirmPassword").className = styles.inputError;
            if(password.password === '') {
                setErrorInput({
                    ...errorInput,
                    password: cannotBeEmpty
                });
            };
        };
    };

    return(
        <div>
            {
                (success.successMsg === successMessage)?
                    <div className={styles.successMsgContainer}>
                        <div className={styles.successMsg}>
                            <h3>
                                {successMessage}
                            </h3>
                        </div> 
                    </div> :
                    null
            }
            <div className={styles.container}>
                <form className={styles.formContainer}>
                    <label htmlFor="newPassword">New Password</label>
                    {
                        (errorInput.password === cannotBeEmpty)? 
                        <div>{cannotBeEmpty}</div> :
                        (errorInput.password === passwordRequirements)?
                        <div>{passwordRequirements}</div> : 
                        null
                    }
                    <input 
                    type="text" 
                    name="password" 
                    id="password" 
                    placeholder="Introduce your new password..." 
                    onChange={onChangeHandler}
                    className={styles.input}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {
                        (errorInput.confirmPassword === confirmPassword)?
                        <div>{confirmPassword}</div> :
                        (errorInput.confirmPassword === doNotMatch)?
                        <div>{doNotMatch}</div> :
                        null
                    }
                    <input 
                    type="text" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    placeholder="Confirm your new password..." 
                    onChange={onChangeHandler}
                    className={styles.input}
                    />
                    <button type="submit" onClick={onsubmitHandler} id="submitBtn" className={styles.submitBtn}>Confirm</button>
                </form>
            </div>
        </div>
    );
};