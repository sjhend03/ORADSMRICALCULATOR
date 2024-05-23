import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    Q1: null, 
    Q2: null, 
    Q3: null, 
    Q3a: null,
    Q4: null,
    Q4a: null, 
    Q4aa: null, 
    Q4b: null,
    Q4ba: null,
    Q4baa: null,
}

export const submitCalculatorQuestions = createAsyncThunk(
    'calculatorQuestions/submitCalculatorQuestions',
    async () => {
        try {
            axios.post('https://script.google.com/macros/s/AKfycbwO5PPvyM09dqOZLH0KLjeTVfV8dEk_7Xzjky6sLg63DeqLQpfVFNzP81JCHAUzkjzk/exec',
            {
                'Q1': 'true'
            },
            {
                headers: {
                    "Content-Type": "text/plain",
                },
                body: {'Q1': 'true'},
                params: {
                    'Q1': 'true'
                }
            }
            )
            .then(response => {
                console.log(response)
                return response.data
            })
            .catch(error => {
                return error
            })
        } catch (err) {
            
        }
        
    }
)

const calculatorQuestionsSlice = createSlice({
    name: 'calculatorQuestions',
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state[action.payload.index] = action.payload.value;
        },
        resetQuestions: (state) => {
            state = {...initialState};
        },
        extraReducers: (builder) => {
            builder.addCase(submitCalculatorQuestions.pending, state => {
                state.loading = true
            })
            builder.addCase(submitCalculatorQuestions.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
            })
            builder.addCase(submitCalculatorQuestions.rejected,  (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        }
    }
});

export const { setQuestion, resetQuestions } = calculatorQuestionsSlice.actions;
export const selectCalculatorQuestions = state => state.calculatorQuestions;
export default calculatorQuestionsSlice.reducer;