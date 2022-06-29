import styles from "./EditUserInfo.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";


export default function EditUserInfo() {

    const { userId } = useParams();
    console.log("🚀 ~ file: EditUserInfo.jsx ~ line 7 ~ EditUserInfo ~ userId", userId);

    const user = useSelector(state => state.user);
    // console.log("🚀 ~ file: EditUserInfo.jsx ~ line 11 ~ EditUserInfo ~ user", user);

    const [isEditing, setIsEditing] = useState(false);

    let isOnItsOnwProfile = '';

    if((userId && user.id) && userId === user.id) {
        isOnItsOnwProfile = true;
    } else {
        isOnItsOnwProfile = false;
    }

    // console.log("Está en su propio perfil? ", isOnItsOnwProfile);    

    const [userInfo, setUserInfo] = useState({
        name: user.name,
        // password: null,
        // confirmPassword: null,
        bankAccount: user.bank_account || '',
        mobileNumber: user.phone,
        address: user.address,
    });
    const [errorInfo, setErrorInfo] = useState({
        name: '',
        // password: '',
        // confirmPassword: '',
        bankAccount: '',
        mobileNumber: '',
        address: '',
    });
    const [success ,setSuccess] = useState({
        successMsg: '',
    });

    if(isOnItsOnwProfile) {
    
        const emptyName = "Name input can't be empty.";
        const nameLengthError = "Name can't be longer than 35 characters.";
        const bankAccountError = "Bank account number length has to be shorter than 30.";
        const addressError = "Address length has to be shorter than 30.";
        const mobileNumberError = "Number seems to be too long.";
        const onlyNumbersError = "Only numbers and 'plus' sign ( + ) are allowed.";
        // const cannotBeEmpty = "Password can't be empty.";
        // const passwordRequirements = "Password must be longer than 8, it must have at least one number and one capital letter.";
        // const confirmPassword = "Please, enter your password again here.";
        // const doNotMatch = "Password doesn't match";
        const successMessage = "Profile info was updated successfully.";
        const successErrorMessage = "Check the mistakes before updating."
        const noInfo = "There is no information yet";
    
    
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        const regexMobilePhoneNumber = /^[\d ()+-]+$/
    
        function validateInputs(input) {
        
            let errors = {
                name: '',
                // password: '',
                // confirmPassword: '',
                mobileNumber: '',
                address: '',
                bankAccount: '',
            };
            
            if(input.name === '') {
                errors.name = emptyName;
                // console.log("Nombre vacío");
                document.getElementById("name").className = styles.inputError;
            } else if (input.name.length > 35) {
                errors.name = nameLengthError;
                // console.log("El nombre es muy largo");
                document.getElementById("name").className = styles.inputError;
            } else {
                // console.log("El nombre cumple los requisitos!");
                errors.name = "";
                document.getElementById("name").className = styles.input;
            };

            if(input.bankAccount.length > 30) {
                // console.log("La longitud no debe ser superior a 30. Actual: " + input.bankAccount.length);
                errors.bankAccount = bankAccountError;
                document.getElementById("bankAccount").className = styles.inputError;
            } else {
                errors.bankAccount = "";
                document.getElementById("bankAccount").className = styles.input;
            };
            if(input.address.length > 30) {
                // console.log("La longitud no debe ser superior a 25. Actual: " + input.address.length);
                errors.address = addressError;
                document.getElementById("address").className = styles.inputError;
            } else {
                errors.address = "";
                document.getElementById("address").className = styles.input;
            };
            if(input.mobileNumber !== "" && !regexMobilePhoneNumber.test(input.mobileNumber)){
                // console.log("Sólo números y/o el símbolo 'más' ( + )")
                errors.mobileNumber = onlyNumbersError;
                document.getElementById("mobileNumber").className = styles.inputError;
            } else if(input.mobileNumber.length > 25) {
                // console.log("La longitud no debe ser superior a 25. Actual: " + input.mobileNumber.length);
                errors.mobileNumber = mobileNumberError;
                document.getElementById("mobileNumber").className = styles.inputError;
            } else {
                errors.mobileNumber = "";
                document.getElementById("mobileNumber").className = styles.input;
            };
    
            // if(input.password === '') {
            //     errors.password = cannotBeEmpty;
            //     console.log("Contraseña vacía")
            // } else if (!regexPassword.test(input.password)) {
            //     errors.password = passwordRequirements;
            //     console.log("La contraseña no cumple los requisitos.");
            // } else if(input.confirmPassword === input.password) {
            //     // errors.confirmPassword = "";
            //     console.log("Ahora sí coinciden");
            // } else {
            //     console.log("Password cumple los requisitos!");
            //     errors.password = "";
            // };
    
            // if(input.confirmPassword === '') {
            //     errors.confirmPassword = confirmPassword;
            //     console.log("Confirmación vacía");
            // } else if(input.confirmPassword !== input.password) {
            //     errors.confirmPassword = doNotMatch;
            //     console.log("Confirm password: la contraseña no coincide.");
            // } else if(input.confirmPassword === input.password) {
            //     errors.confirmPassword = "";
            //     console.log("Ahora sí coinciden");
            // };
    
            return errors;
        };
    
        function onChangeHandler(e) {
            setUserInfo({
                ...userInfo,
                [e.target.name]: e.target.value,
            });
    
            let errorResults = validateInputs({
                ...userInfo,
                [e.target.name]: e.target.value
            })
    
            setErrorInfo(errorResults);
        };
    
        async function onSubmitHandler(e) {
            e.preventDefault();
            
            const updatedInformation = {
                name: userInfo.name,
                phone: userInfo.mobileNumber,
                bank_account: userInfo.bankAccount,
                address: userInfo.address
            };
            // console.log("🚀 ~ file: EditUserInfo.jsx ~ line 120 ~ onSubmitHandler ~ updatedInformation", updatedInformation);
            
            if(errorInfo.address !== "") {
                // console.log("Hay un error en la info de la dirección");
                // document.getElementById("address").className = styles.inputError;
                setSuccess({
                    successMsg: successErrorMessage
                })
            } else if(errorInfo.mobileNumber !== "") {
                // console.log("Hay un error en la info del número de celular");
                // document.getElementById("mobileNumber").className = styles.inputError;
                setSuccess({
                    successMsg: successErrorMessage
                })
            } else if(errorInfo.name !== "") {
                // console.log("Hay un error en la info del nombre");
                // document.getElementById("name").className = styles.inputError;
                setSuccess({
                    successMsg: successErrorMessage
                })
            } else if(errorInfo.bankAccount !== "") {
                // console.log("Hay un error en la info del número de cuenta bancaria");
                // document.getElementById("bankAccount").className = styles.inputError;
                setSuccess({
                    successMsg: successErrorMessage
                })
            } else {
                // console.log("Enviando información...");
                document.getElementById("name").className = styles.input;
                document.getElementById("address").className = styles.input;
                document.getElementById("mobileNumber").className = styles.input;
                document.getElementById("name").className = styles.input;
                document.getElementById("submitBtn").className = styles.submitBtnDisabled;
                document.getElementById("submitBtn").disabled = true;
                await axios.put(`/api/users/${userId}/update`, updatedInformation);
                setSuccess({
                    successMsg: successMessage
                })
            };
    
        };

        if(isEditing){
            return(
                <div className={styles.container}>
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
                    <div className={styles.container2}>
                        <form className={styles.formContainer}>
                            <label htmlFor="name">Name (*)</label>
                            {
                                (errorInfo.name === nameLengthError)? 
                                <div className={styles.errorMsg}>{nameLengthError}</div> :
                                null
                            }
                            <input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name (*) ..."
                            defaultValue={user.name}
                            onChange={onChangeHandler}
                            className={styles.input} 
                            />
                            {/* <label htmlFor="newPassword">Password</label>
                            <input
                            type="text" 
                            name="password" 
                            id="password" 
                            placeholder="Introduce your new password..." 
                            onChange={onChangeHandler}
                            className={styles.input}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                            type="text" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm your new password..." 
                            onChange={onChangeHandler}
                            className={styles.input}
                            /> */}
                            <label htmlFor="mobileNumber">Mobile number</label>
                            {
                                (errorInfo.mobileNumber === onlyNumbersError)?
                                <div className={styles.errorMsg}>{onlyNumbersError}</div> :
                                (errorInfo.mobileNumber === mobileNumberError)? 
                                <div className={styles.errorMsg}>{mobileNumberError}</div> :
                                null
                            }
                            <input 
                            type="text"
                            name="mobileNumber"
                            id="mobileNumber"
                            defaultValue={userInfo.mobileNumber}
                            placeholder="Mobile number ..."
                            onChange={onChangeHandler}
                            className={styles.input} 
                            />
                            <label htmlFor="address">Address</label>
                            {
                                (errorInfo.address === addressError)? 
                                <div className={styles.errorMsg}>{addressError}</div> :
                                null
                            }
                            <input 
                            type="text"
                            name="address"
                            id="address"
                            defaultValue={userInfo.address}
                            placeholder="Address ..."
                            onChange={onChangeHandler}
                            className={styles.input} 
                            />
                            <label htmlFor="bankAccount">Bank Account</label>
                            {
                                (errorInfo.bankAccount === bankAccountError)? 
                                <div className={styles.errorMsg}>{bankAccountError}</div> :
                                null
                            }
                            <input 
                            type="number"
                            name="bankAccount"
                            id="bankAccount"
                            defaultValue={userInfo.bankAccount}
                            placeholder="Bank Account ..."
                            onChange={onChangeHandler}
                            className={styles.input} 
                            />
                            {
                                (success.successMsg === successErrorMessage)?
                                <div className={styles.errorMsg}>{successErrorMessage}</div> :
                                null
                            }
                            <button className={styles.submitBtn} id="submitBtn" onClick={onSubmitHandler}>Apply</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            return(
                <div className={styles.container}>
                    <div className={styles.container2}>
                        <form className={styles.formContainer}>
                            <h1>Name</h1>
                            <h3>{user.name}</h3>
                            <h1>E-mail</h1>
                            <h3>{user.email}</h3>
                            <h1>Mobile number</h1>
                            <h3>{user.phone || noInfo}</h3>
                            <h1>Address</h1>
                            <h3>{user.address || noInfo}</h3>
                            <h1>Bank account number</h1>
                            <h3>{user.bank_account || noInfo}</h3>
                            <button 
                            className={styles.submitBtn}
                            onClick={() => {
                                // console.log("Me cambio a modo edición");
                                setIsEditing(true);
                            }}>Edit profile information</button>
                        </form>
                    </div>
                </div>
            )
        }
    } else {
        // console.log("No está en su propio perfil");
        return(
            <div>
                <h1>
                    Denied access (The ID provied on URL is not yours)
                </h1>
            </div>
        )
    }; 
};