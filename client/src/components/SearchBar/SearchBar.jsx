import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import {getNameProduct} from '../../actions/index'
import s from '../SearchBar/SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [params, setParams] = useSearchParams();
    const [input, setInput] = useState({
        name: ''
    })
    const handleChange = (e) => {
        e.preventDefault(e)
        setInput({
            name: e.target.value
        })
    }
    const handleClick = (e) => {
        e.preventDefault(e)
        dispatch(getNameProduct(input.name))

        params.set("name", input.name);
        setParams(params);

        setInput({
            name: ''
        })
    }
    return (
        <div className={s.container}>
            <input 
                className={s.inputContainer}
                type="text" 
                placeholder='Buscar productos...'
                value={input.name}
                onChange={e => handleChange(e)}
            />
            <button className={s.btn} onClick={e => handleClick(e) }>Buscar</button>
        </div>
    )
}

export default SearchBar