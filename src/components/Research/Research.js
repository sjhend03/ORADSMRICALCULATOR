import React, { useState } from 'react'
import Questions from '../Questions/Questions'
import { useDispatch, useSelector } from 'react-redux'
import { selectResearchQuestions, submitResearchQuestions } from '../../features/researchQuestionsSlice'
import { setQuestion } from '../../features/researchQuestionsSlice'
import './Research.css'
import axios from 'axios'

function Research() {

    if (typeof localStorage.getItem('user') === 'object') {
        const user = {loggedIn: false, username: '', password: ''}
        localStorage.setItem('user', JSON.stringify(user))
        console.log('Declared user variable in local storage.')
    }

    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('user')).loggedIn ? true : false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const researchQuestions = useSelector(selectResearchQuestions);

    const btnStyle = id => {
        if(researchQuestions[id] == 'true') {
          return {
            yes: {
              backgroundColor: 'var(--green)',
              color: 'var(--dark-blue)'
            }
          }
        } else if (researchQuestions[id] == 'false') {
          return {
            no: {
              backgroundColor: '#ff4545',
              color: 'var(--dark-blue)'
            }
          }
        } else {
          return {}
        }
      }

    const questions = [
        {
            description: 'Site:', 
            callback: (e) => {
                dispatch(setQuestion({index: 'site', value: e.target.value}))
            }, 
            type: 'dropdown', 
            style: {
                span: {
                    margin: '0px'
                }
            }, 
            id: 'site',
            options: [
                {description: 'UWMROv', value: 'UWMROv'},
                {description: 'McGillMROv', value: 'McGillMROv'},
                {description: 'BWHMROv', value: 'BWHMROv'},
            ]
        },
        {
            description: 'Subject Number:',
            type: 'text',
            callback: (e) => {
                dispatch(setQuestion({index: 'subjectNumber', value: e.target.value}))
            },
            style: {
                span: {
                    margin: '0px',
                }
            },
            id: 'subjectNumber'
        },
        {
            description: 'Age:',
            type: 'text',
            style: {
                span: {
                    margin: '0px',
                }
            },
            callback: (e) => {
                dispatch(setQuestion({index: 'age', value: e.target.value}))
            },
            id: 'age'
        },
        {
            description: 'Note what was found on MRI:',
            type: 'dropdown',
            style: {
                span: {
                    margin: '0px',
                }
            },
            callback: (e) => {
                dispatch(setQuestion({index: 'note', value: e.target.value}))
            },
            options: [
                {description: 'Normal ovaries seen on MRI', value: '1'},
                {description: 'Physiologic lesion on MRI (simple, hemorrhagic and proteinaceous cyst &lt;3cm in pre-meno)', value: '2'},
                {description: 'Adnexal lesion seen on MRI (Includes ovarian, para ovarian, and fallopian tube)', value: '3'},
                {description: 'Dilated fallopian tube, simple, no solid tissue, thin smooth wall', value: '4'},
                {description: 'Dilated fallopian tube, non simple fluid OR thick smooth wall', value: '5'},
                {description: 'Peritoneal inclusion cyst', value: '6'},
                {description: 'Other', value: 'other'},
            ],
            id: 'note'
        },
        {
            description: 'Presence of peritoneal, mesenteric or omental implants, nodularity or irregular thickening, with or without ascites:',
            type: 'boolean',
            callback: (e) => {
                dispatch(setQuestion({index: 'presence', value: e.target.value}))
            }, 
            style: {
                ...btnStyle('presence'),
                span: {
                    margin: '0px'
                }
            },
            id: 'presence'
        },
        {
            title: 'Question 1:', 
            description: 'Greatest lesion diameter (cm) in any plane:', 
            callback: (e) => {
                dispatch(setQuestion({index: 'Q1', value: e.target.value}))
            }, 
            type: 'text', 
            style: {}, 
            id: 'Q1',
            value: null
        },
        {
            title: 'Question 2:', 
            description: 'Type of lesion?', 
            callback: (e) => {
            }, 
            type: 'dropdown', 
            style: {}, 
            id: 'Q2',
            options: [
                {description: '', value: ''}
            ]
        },
        {
            title: 'Question 3:', 
            description: 'Presence of peritoneal, mesenteric or ormental modularity or irregular thickening, with or without ascrites, TOUGH READ', 
            callback: (e) => {
                dispatch(setQuestion({index: 'Q3', value: e.target.value}))
            }, 
            type: 'boolean', 
            style: btnStyle('Q3'), 
            id: 'Q3'
        },
        {
            title: 'Question 4',
            description: 'Is there fat or lipid cystic content associated within the lesion?',
            callback: (e) => {
                dispatch(setQuestion({index: 'Q4', value: e.target.value}))
            },
            type: 'boolean',
            style: btnStyle('Q4'),
            id: 'Q4'
        },
        {
            title: 'Question 5',
            description: 'Is there enhancing solid tissue in the adnexal region?',
            callback: (e) => {
                dispatch(setQuestion({index: 'Q5', value: e.target.value}))
            },
            type: 'boolean',
            style: btnStyle('Q5'),
            id: 'Q5'
        },
        {
            description: '*Solid Tissue: Enhancing papillary projection, nodule, irregular seperation/wall, solid lesion. Note: Thin smooth seperations are NOT solid tissue.',
            style: {
                span: {
                    margin: '0px',
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                }
            }
        },
        {
            description: 'Press save when you are done:',
            type: 'choice',
            options: [
                {description: 'Save', value: 'unilocular', style: {}},
            ],
            callback: (e) => {
                dispatch(submitResearchQuestions(researchQuestions));
            }
        },
        {
            title: '',
            description: 'Does the patient have another lesion',
            callback: (e) => {

            },
            type: 'boolean',
            style: {},
            id: 'Qnext'
        },
    ]

    const onChange = (e) => {
        if (e.target.id === 'username') {
            setUsername(e.target.value)
        } else if(e.target.id === 'password') {
            setPassword(e.target.value)
        }
    }

    const login = async () => {
        setLoggedIn('pending');
        const  loginData = await axios.get('https://script.google.com/macros/s/AKfycbwjr9dxkX1_3DX__4bL8_SOEqTlCtdw_vFigHjXfA5mje32f1dLjVcgDDZ9WstNNAw7SQ/exec')
        .then(res => {
            setUsername('');
            setPassword('');
            return res.data
        });
        console.log(loginData);
        loginData.forEach(user => {
            if (user.username === username) {
                if (user.password === password) {
                    setLoggedIn(true)
                    const userData = {loggedIn: true, username, password}
                    localStorage.setItem('user', JSON.stringify(userData))
                } else {
                    console.log('Incorrect Password')
                    setLoggedIn(false)
                }
            } else {
                console.log('Incorrect Username')
                setLoggedIn(false)
            }
        })
    }

    const logOut = () => {
        const userData = {loggedIn: false, username: '', password: ''}
        localStorage.setItem('user', JSON.stringify(userData));
        setLoggedIn(false)
        console.log('Logged Out!')
    }

    if (loggedIn == true) {
        return (
            <div id='research'>
                <div>
                    <Questions questionValues={researchQuestions} questions={questions} />
                </div>
                <button id='logOut' onClick={logOut}>Log out</button>
            </div>
        )
    } else if (loggedIn === 'pending') {
        return (
            <div id='loading-wrapper'>
                <div id='login-loading-circle-1'/>
                <div id='login-loading-circle-2'/>
                <div id='login-loading-circle-3'/>
                <div id='login-loading-circle-4'/>
                <div id='login-loading-text'>Loading...</div>
            </div>
        )
    } else {
        return (
            <div id='login-wrapper'>
                <input id='username' type='text' onChange={onChange} value={username} placeholder='Username'/>
                <input id='password' type='text' onChange={onChange} value={password} placeholder='Password'/>
                <button id='login' onClick={login}>Login</button>
            </div>
        )
    }
}

export default Research