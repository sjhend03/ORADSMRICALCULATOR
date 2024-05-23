import { configureStore } from "@reduxjs/toolkit";

import calculatorQuestionsReducer from '../features/calculatorQuestionsSlice';
import researchQuestionsReducer from '../features/researchQuestionsSlice'

export default configureStore({
    reducer: {
        calculatorQuestions: calculatorQuestionsReducer,
        researchQuestions: researchQuestionsReducer,
    }
});