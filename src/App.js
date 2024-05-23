import './App.css';
import Calculator from './components/Calculator/Calculator';
import Quickguide from './components/Quick Guide/Quickguide';
import Header from './components/Header/Header';
import { 
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Authors from './components/Authors/Authors';
import Technical from './components/Technical/Technical';
import { createDispatchHook, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectCalculatorQuestions, setQuestion, submitCalculatorQuestions } from './features/calculatorQuestionsSlice';
import Research from './components/Research/Research';

function App() {

  const navigate = useNavigate()

  const calculatorQuestions = useSelector(selectCalculatorQuestions)

  const btnStyle = id => {
    if(calculatorQuestions[id] == 'true') {
      return {
        yes: {
          backgroundColor: 'var(--green)',
          color: 'var(--dark-blue)'
        }
      }
    } else if (calculatorQuestions[id] == 'false') {
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
      description: 'Begin with Question 1 until an O-RADS MRI Risk Score is displayed. Press the reset button after each lesion to reset the calculator.',
      id: 'calculatorHeader',
      style: {
        span: {
          margin: '0px',
          fontSize: '0.9rem'
        }
      }
    },
    {
        title: 'Question 1:', 
        description: 'Presence of peritoneal, mesenteric or omental nodularity or irregular thickening, with or without ascites?', 
        callback: (e) => {
            dispatch(setQuestion({index: 'Q1', value: e.target.value}))
            if(e.target.value === 'true') {
              navigate('orads5')
            }
        }, 
        type: 'boolean', 
        style: btnStyle('Q1'), 
        id: 'Q1',
        value: calculatorQuestions['Q1']
    },
    {
        title: 'Question 2:', 
        description: 'Is the adnexal finding a follicle or corpus luteum or hemorrhagic cyst ≤ 3cm in a premenopausal woman?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q2', value: e.target.value}))
          if(e.target.value === 'true') {
            navigate('orads1')
          }
        }, 
        type: 'boolean', 
        style: btnStyle('Q2'), 
        id: 'Q2'
    },
    {
        title: 'Question 3:', 
        description: 'Is there fat associated with the lesion?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q3', value: e.target.value}))
        }, 
        type: 'boolean', 
        style: btnStyle('Q3'), 
        id: 'Q3'
    },
    {
        title: '', 
        description: 'Is there a large amount of solid enhancing tissue?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q3a', value: e.target.value}))
          if(e.target.value === 'true') {
            navigate('orads4')
          }
        }, 
        type: 'boolean', 
        style: calculatorQuestions['Q3'] == 'true' ? {
          ...btnStyle('Q3a')
        } : {
          ...btnStyle('Q3a'),
          div: {
            display: 'none'
          }
        }, 
        id: 'Q3a'
    },
    {
      description: '*Solid Tissue: Enhancing papillary projection, nodule, irregular septation/wall, solid lesion. Note: Thin smooth septations are NOT solid tissue.',
      id: 'Q4-side-note',
      style: {
        p: {
          fontSize: '0.9rem'
        }
      }
    },
    {
        title: 'Question 4:', 
        description: 'Is there enhancing solid tissue associated with the adnexal lesion?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4', value: e.target.value}))
          if (e.target.value === 'true') {
            dispatch(setQuestion({index: 'Q4b', value: null}))
            dispatch(setQuestion({index: 'Q4ba', value: null}))
            dispatch(setQuestion({index: 'Q4baa', value: null}))
          } else if (e.target.value === 'false') {
            dispatch(setQuestion({index: 'Q4a', value: 'select'}))
            dispatch(setQuestion({index: 'Q4aa', value: 'select'}))
          }
        }, 
        type: 'boolean', 
        style: btnStyle('Q4'), 
        id: 'Q4'
    },
    {
        description: 'What best describes the signal intensity of the solid tissue on T2 and high B-value diffusion weighted images?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4a', value: e.target.value}))
          if (e.target.value === 'dark') {
            dispatch(setQuestion({index: 'Q4aa', value: 'select'}))
          }
        }, 
        type: 'dropdown', 
        style: calculatorQuestions['Q4'] === 'true' ? {} : {
          div: {
            display: 'none'
          }
        }, 
        options: [
            {description: 'All solid tissue in the lesion is HOMOGENOUSLY dark in signal', value: 'dark'},
            {description: 'Some or all solid tissue is intermediate or high in signal', value: 'intermediate'}
        ],
        id: 'Q4a'
    },
    {
        description: 'What best describes the enhancement of the solid tissue?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4aa', value: e.target.value}))
        }, 
        type: 'dropdown', 
        style: calculatorQuestions['Q4a'] === 'intermediate' ? {} : {
          div: {
            display: 'none'
          }
        }, 
        options: [
            {description: 'Hypo/isoenhancing to myometrium at 30-40s on non-DCE MRI', value: 'hypo'},
            {description: 'Hyperenhancing to myometrium at 30-40s on non-DCE MRI', value: 'hyper'},
            {description: 'Low risk TIC on DCE MRI', value: 'low'},
            {description: 'Intermediate risk TIC on DCE MRI', value: 'intermediate'},
            {description: 'High risk TIC on DCE MRI', value: 'high'},
        ],
        id: 'Q4aa'
    },
    {
        description: 'Pick the cyst type:', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4b', value: e.target.value}))
        }, 
        type: 'choice', 
        style: calculatorQuestions['Q4'] === 'false' ? {} : {
          div: {
            display: 'none'
          }
        }, 
        options: [
            {description: 'Unilocular', value: 'unilocular', style: calculatorQuestions['Q4b'] === 'unilocular' ? {
              backgroundColor: 'var(--green)',
              color: 'var(--dark-blue)'
            } : {} },
            {description: 'Multi-locular', value: 'multi-locular', style: calculatorQuestions['Q4b'] === 'multi-locular' ? {
              backgroundColor: 'var(--green)',
              color: 'var(--dark-blue)'
            } : {}}
        ],
        id: 'Q4b'
    },
    {
        description: 'Is there wall enhancement?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4ba', value: e.target.value}))
        }, 
        type: 'boolean', 
        style: calculatorQuestions['Q4b'] === 'unilocular' ? {
          ...btnStyle('Q4ba')
        } : {
          div: {
            display: 'none'
          }
        }, 
        id: 'Q4ba'
    },
    {
        description: 'Is the fluid content simple or endometriotic?', 
        callback: (e) => {
          dispatch(setQuestion({index: 'Q4baa', value: e.target.value}))
        }, 
        type: 'boolean', 
        style: calculatorQuestions['Q4ba'] === 'true' ? {
          ...btnStyle('Q4baa')
        } : {
          div: {
            display: 'none'
          }
        },
        id: 'Q4baa'
    },
  ]

  const dispatch = useDispatch()


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Calculator questions={questions} questionValues={calculatorQuestions} />} />
        <Route path='/quick-guide' element={<Quickguide/>} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/technical-requirements' element={<Technical />} />
        <Route path='/research' element={<Research />} />
      </Routes>
    </div>
  );
}

export default App;
