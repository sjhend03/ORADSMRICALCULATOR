import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetQuestions, selectCalculatorQuestions, setQuestion } from '../../features/calculatorQuestionsSlice';
import Questions from '../Questions/Questions';
import popup1 from '../../images/popups/ORADS 1.png';
import popup2 from '../../images/popups/ORADS 2.png';
import popup3 from '../../images/popups/ORADS 3.png';
import popup4 from '../../images/popups/ORADS 4.png';
import popup5 from '../../images/popups/ORADS 5.png';

function Calculator({questions, questionValues}) {

    /*// States of Orads Popups
    const [orads1, setOrads1] = useState('none');
    const [orads2, setOrads2] = useState('none');
    const [orads3, setOrads3] = useState('none');
    const [orads4, setOrads4] = useState('none');
    const [orads5, setOrads5] = useState('none');
    const [resetting, setResetting] = useState(false);

    // Redux States of the Questions
    const questions = useSelector(selectCalculatorQuestions);
    const dispatch = useDispatch();

    // Show Cookies Disclaimer
    const [cookieShown, setCookieShown] = useState(false);

    // Checks Questions States to Update Popups
    useEffect(() => {
        if (questions.Q1 === true) setOrads5('block');
        if (questions.Q2 === true) setOrads1('block');
        if (questions.Q3a === true) setOrads4('block');
        if (questions.Q3a === false) setOrads2('block');
        if (questions.Q4a === 'orads2') setOrads2('block');
        if (questions.Q4ab === 'orads4') setOrads4('block');
        if (questions.Q4ab === 'orads5') setOrads5('block');
        if (questions.Q4ab === 'orads3') setOrads3('block');
        if (questions.Q4b === false) setOrads3('block');
        if (questions.Q4ba === false) setOrads2('block');
        if (questions.Q4baa === true) setOrads2('block');
        if (questions.Q4baa === false) setOrads3('block');
    }, [questions]);

    // Hides Popups
    const hideOrads = () => {
        setCookieShown(false);
        setResetting(true);
        setOrads1('none');
        setOrads2('none');
        setOrads3('none');
        setOrads4('none');
        setOrads5('none');
        dispatch(setQuestion({index: 'Q1', value: null}));
        dispatch(setQuestion({index: 'Q2', value: null}));
        dispatch(setQuestion({index: 'Q3', value: null}));
        dispatch(setQuestion({index: 'Q3a', value: null}));
        dispatch(setQuestion({index: 'Q4', value: null}));
        dispatch(setQuestion({index: 'Q4a', value: null}));
        dispatch(setQuestion({index: 'Q4aa', value: null}));
        dispatch(setQuestion({index: 'Q4ab', value: null}));
        dispatch(setQuestion({index: 'Q4b', value: null}));
        dispatch(setQuestion({index: 'Q4ba', value: null}));
        dispatch(setQuestion({index: 'Q4baa', value: null}));
    }

    return (
        <div className='calculator-wrapper'>
            <button onClick={hideOrads} className='reset-btn'>Reset</button>
            <Questions resetting={resetting} setResetting={setResetting} questions={questions} />
            <footer>
                <p>This material is provided as guidance and is educational in nature. Final lesion management should be based on patient's clinical scenario and clinical evaluation directed by a
physician. If the study is technically inadequate, DO NOT USE this calculator. Assess as an O-RADS MRI 0.</p>
                <p>Technical website content developed by: Steven Henderson, Collin Henderson, Eric Winter-Reinhold. Educational content developed by: Elizabeth Sadowski, Caroline Reinhold,
Katherine Maturen, Andrea Rockall, Isabelle Thomassin.</p>
    <p>This website uses essential cookies for implementing features that allow you to securely navigate the site. By using the O-RADS MRI calculator, you consent to the use of analytics
    cookies (non-essential cookies) so we can measure how you interact with the website content. However, you can withdraw your consent at any time. <button onClick={() => {
        if (cookieShown) {
            setCookieShown(false);
        } else {
            setCookieShown(true);
        }
    }}>Click here for more information.</button></p>
    <p className={cookieShown ? 'cookie-shown' : 'cookie-hidden'}>Our website uses first party cookies for technical and analytical purposes. 
    What are cookies and why do we use them?
    Cookies are files that are downloaded on your computer or mobile device when you visit certain websites.
    Cookies allow a website to complete certain functions such as identify a user session, recall your preferences (e.g.
    language), gather information about your browsing habits or show you advertising adapted to your preferences.
    We use essential cookies for our legitimate interest in implementing features that allow you to securely navigate
    the site, and we ask your consent for using analytics cookies (non-essential cookies) so we can measure how you
    interact with the website content through Google Analytics. 
    Information collected through Google Analytics is shared with Google and its partners who may combine it with
    other information you’ve provided to them or they’ve collected from your use of their services. This information
    will be stored in Google’s servers in the United States of America according to their privacy practices.
    You can withdraw your consent as follows: 
    1. You can control and delete cookies through your browser settings.
    Google Chrome
    Mozilla Firefox
    Safari
    Opera
    Microsoft Internet Explorer
    Safari for iOS (iPhone and iPad)
    Chrome for Android

    Windows Phone
    2. You can also use the following cookie management and disposal tools:
    You can opt-out Google Analytics by downloading and installing the browser plug-in from the following link:
    http://tools.google.com/dlpage/gaoptout</p>
            </footer>
            <div className='orads-popup orads-1' style={{display: orads1}}>
                <div className='reset-btn' onClick={hideOrads}>Reset</div>
                <img alt='ORADS 1' src={popup1}/>
            </div>
            <div className='orads-popup orads-2' style={{display: orads2}}>
                <div className='reset-btn' onClick={hideOrads}>Reset</div>
                <img alt='ORADS 2' src={popup2}/>
            </div>
            <div className='orads-popup orads-3' style={{display: orads3}}>
                <div className='reset-btn' onClick={hideOrads}>Reset</div>
                <img alt='ORADS 3' src={popup3}/>
            </div>
            <div className='orads-popup orads-4' style={{display: orads4}}>
                <div className='reset-btn' onClick={hideOrads}>Reset</div>
                <img alt='ORADS 4' src={popup4}/>
            </div>
            <div className='orads-popup orads-5' style={{display: orads5}}>
                <div className='reset-btn' onClick={hideOrads}>Reset</div>
                <img alt='ORADS 5' src={popup5}/>
            </div>
        </div>
    )*/

    const dispatch = useDispatch()

    const [cookieShown, setCookieShown] = useState(false);

    const reset = () => {
        dispatch(setQuestion({index: 'Q1', value: null}));
        dispatch(setQuestion({index: 'Q2', value: null}));
        dispatch(setQuestion({index: 'Q3', value: null}));
        dispatch(setQuestion({index: 'Q4', value: null}));
        dispatch(setQuestion({index: 'Q5', value: null}));
        dispatch(setQuestion({index: 'Q6', value: null}));
        dispatch(setQuestion({index: 'Q7', value: null}));
        dispatch(setQuestion({index: 'Q8', value: null}));
        dispatch(setQuestion({index: 'Q9', value: null}));
        dispatch(setQuestion({index: 'Q10', value: null}));
        dispatch(setQuestion({index: 'Q11', value: null}));
    }

    return (
        <>
            <button className='reset-btn' onClick={reset}>Reset</button>
            <Questions questions={questions} questionValues={questionValues}/>
            <footer>
                <p>This material is provided as guidance and is educational in nature. Final lesion management should be based on patient's clinical scenario and clinical evaluation directed by a
                physician. If the study is technically inadequate, DO NOT USE this calculator. Assess as an O-RADS MRI 0.</p>
                <p>Technical website content developed by: Steven Henderson, Collin Henderson, Eric Winter-Reinhold. Educational content developed by: Elizabeth Sadowski, Caroline Reinhold,
                Katherine Maturen, Andrea Rockall, Isabelle Thomassin.</p>
                <p>This website uses essential cookies for implementing features that allow you to securely navigate the site. By using the O-RADS MRI calculator, you consent to the use of analytics
                cookies (non-essential cookies) so we can measure how you interact with the website content. However, you can withdraw your consent at any time. <button onClick={() => {
                    if (cookieShown) {
                        setCookieShown(false);
                    } else {
                        setCookieShown(true);
                    }
                }}>Click here for more information.</button></p>
                <p className={cookieShown ? 'cookie-shown' : 'cookie-hidden'}>Our website uses first party cookies for technical and analytical purposes. 
                What are cookies and why do we use them?
                Cookies are files that are downloaded on your computer or mobile device when you visit certain websites.
                Cookies allow a website to complete certain functions such as identify a user session, recall your preferences (e.g.
                language), gather information about your browsing habits or show you advertising adapted to your preferences.
                We use essential cookies for our legitimate interest in implementing features that allow you to securely navigate
                the site, and we ask your consent for using analytics cookies (non-essential cookies) so we can measure how you
                interact with the website content through Google Analytics. 
                Information collected through Google Analytics is shared with Google and its partners who may combine it with
                other information you’ve provided to them or they’ve collected from your use of their services. This information
                will be stored in Google’s servers in the United States of America according to their privacy practices.
                You can withdraw your consent as follows: 
                1. You can control and delete cookies through your browser settings.
                Google Chrome
                Mozilla Firefox
                Safari
                Opera
                Microsoft Internet Explorer
                Safari for iOS (iPhone and iPad)
                Chrome for Android
                Windows Phone
                2. You can also use the following cookie management and disposal tools:
                You can opt-out Google Analytics by downloading and installing the browser plug-in from the following link:
                http://tools.google.com/dlpage/gaoptout</p>
            </footer>
        </>
    )
}

export default Calculator