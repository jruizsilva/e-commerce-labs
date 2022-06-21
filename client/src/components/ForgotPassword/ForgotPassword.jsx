import axios from "axios";
import { useState } from "react";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {

    const [email, setEmail] = useState({
        email: '',
    });
    const [error, setError] = useState({
        email: '',
    });

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function validateInputs(input) {

        let error = {
            email: '',
        };

        if(input.email === '') {
            error.email = "Email can't be empty.";
            console.log("Email vacío");
        } else if(!emailRegex.test(input.email)) {
            error.email = "Invalid email format.";
            console.log("Formato de email inválido");
        } else {
            console.log("Email válido");
            error.email = "";
        };

        return error
    };

    function onChangeHandler(e) {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        });
        let errorResults = validateInputs({
            ...email,
            [e.target.name]: e.target.value
        });
        setError(errorResults);
    };

    function onSubmitHandler(e) {
        e.preventDefault();

        const requirements = {
            email: email.email,
        };

        if(email.email === '') {
            alert("Please introduce your email first.")
        };

        if(email.email !== '' && error.email === '') {
            console.log(`Enviando información: ${email.email}`);
            axios.post('http://localhost:3001/api/forgotpassword/', requirements);
            document.getElementById("submitBtn").className = styles.submitBtnDisabled;
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("submitBtn").innerHTML = "Check your email";
        } else if(error.email !== '') {
            alert("Email inválido");
        };
    };

    return(
        <div>
            <div className={styles.container}>
                <form className={styles.formContainer}>
                    <label htmlFor="Email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Introduce your email..." 
                        onChange={onChangeHandler}
                        className={styles.emailInput}
                        />

                        <button onClick={onSubmitHandler} id="submitBtn" className={styles.submitBtn}>Send restoration email</button>
                </form>
            </div>
        </div>
    );
};