import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalculatorQuestions, setQuestion } from '../../features/calculatorQuestionsSlice';
import './Question.css'

function Question({ title, description, callback, type, style, options, id, value }) {

    /*// Redux State for Questions
    const dispatch = useDispatch();
    const questions = useSelector(selectCalculatorQuestions);

    // Updates Redux State for a Question
    const updateQuestion = (boolean) => {
        dispatch(setQuestion({index: `Q${props.number}`, value: boolean}));
    }

    // Checks if a Question has sub-Question
    const checkSubQuestion = () => {
        if (props.number.includes('a') || props.number.includes('b')) return true;
        return false;
    }

    // Updates Dropdowns
    const updateDropdown1 = (event) => {
        dispatch(setQuestion({index: `Q${props.number}`, value: event.target.value}));
        props.changeDropdown1(event);
    }

    const updateDropdown2 = (event) => {
        dispatch(setQuestion({index: `Q${props.number}`, value: event.target.value}));
        props.changeDropdown2(event);
    }

    // Special Case for a Dropdown on Question 4a
    if (props.number === '4a') {
        return (
            <div className='question-wrapper dropdown-wrapper' style={checkSubQuestion() && !props.shown ? {display: 'none'} : {}}>
                <p><span className='question-title'>{checkSubQuestion() ? '' : `Question ${props.number}:`}</span> {props.description}</p>
                <select className='Q4a-dropdown' onChange={updateDropdown1} value={props.dropdown1}>
                    <option value='select'>Select an option</option>
                    <option value='orads2'>All solid tissue in the lesion is HOMOGENOUSLY dark in signal</option>
                    <option value='some'>Some or all solid tissue is intermediate or high in signal</option>
                </select>
            </div>
        )
    }

    // Special Case for Question 4ab
    if (props.number === '4ab') {
        return (
            <div className='question-wrapper dropdown-wrapper' style={checkSubQuestion() && !props.shown ? {display: 'none'} : {}}>
                <p><span className='question-title'>{checkSubQuestion() ? '' : `Question ${props.number}:`}</span> {props.description}</p>
                <select className='Q4a-dropdown' onChange={updateDropdown2} value={props.dropdown2}>
                    <option value='select'>Select an option</option>
                    <option value='orads4'>Hypo/isoenhancing to myometrium at 30-40s on non-DCE MRI</option>
                    <option value='orads5'>Hyperenhancing to myometrium at 30-40s on non-DCE MRI</option>
                    <option value='orads3'>Low risk TIC on DCE MRI</option>
                    <option value='orads4'>Intermediate risk TIC on DCE MRI</option>
                    <option value='orads5'>High risk TIC on DCE MRI</option>
                </select>
            </div>
        )
    }

    // Special Case for Question 4b
    if (props.number === '4b') {
        return (
            <div className='question-wrapper' style={checkSubQuestion() && !props.shown ? {display: 'none'} : {}}>
                <p><span className='question-title'>{checkSubQuestion() ? '' : `Question ${props.number}:`}</span> {props.description}</p>
                <button className={questions[`Q${props.number}`] ? 'question-4b-button question-button question-yes' : 'question-4b-button question-button'} onClick={() => updateQuestion(true)}>Unilocular</button>
                <button className='question-4b-button question-button' onClick={() => updateQuestion(false)}>Multi-locular</button>
            </div>
        )
    }

    // Default Question Display
    /*return (
        <div className='question-wrapper' style={checkSubQuestion() && !props.shown ? {display: 'none'} : {}}>
            <p><span className='question-title'>{checkSubQuestion() ? '' : `Question ${props.number}:`}</span> {props.description}</p>
            <button className={questions[`Q${props.number}`] ? 'question-yes question-button btn-yes' : 'question-button btn-yes'} onClick={() => updateQuestion(true)}>yes</button>
            <button className={questions[`Q${props.number}`] === false ? 'question-no question-button btn-no' : 'question-button btn-no'} onClick={() => updateQuestion(false)}>no</button>
        </div>
    )*/
    
     

    return (
        <div className='question' id={id} style={style?.div !== undefined ? style.div : null} >
            <p className='question-title' style={style?.p !== undefined ? style.p : null}>{title}<span className='question-description' style={style?.span !== undefined ? style.span : null}>{description}</span></p>
            {type === 'boolean' ? (
                <>
                <button value='true' className='question-btn-yes' style={style.yes} onClick={callback} >yes</button>
                <button value='false' className='question-btn-no' style={style.no} onClick={callback} >no</button>
                </>
            ) : ''}
            {type === 'dropdown' ? (
                <select className='question-dropdown' value={value} onChange={callback} onClick={() => {
                    console.log(value)
                }} style={style.select}>
                    <option value='select' style={style.option}>Select an option</option>
                    {options.map(option => <option value={option.value}>{option.description}</option>)}
                </select>
            ) : ''}
            {type === 'choice' ? (
                <>
                {options.map(option => <button style={option.style} value={option.value} className={'question-btn'} onClick={callback}>{option.description}</button>)}
                </>
            ) : ''}
            {type === 'text' ? (
                <>
                    <input type='text'placeholder='input here' value={value} onChange={callback}/>
                </>
            ) : ''}
        </div>
    )
}

export default Question