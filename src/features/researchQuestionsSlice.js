import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    site: null,
    subjectNumber: null,
    age: null,
    note: null,
    Q1: null, 
    Q2: null, 
    Q3: null, 
    Q4: null,
    Q5: null,
    Qnext: null,
}

export const submitResearchQuestions = createAsyncThunk(
    'researchQuestions/submitResearchQuestions',
    async (payload) => {
        console.log('Attempting to Post Data');
        console.log(payload);
        try {
            axios.post('https://script.google.com/macros/s/AKfycbw6Yx8S7QV_s-TDF3q2Gq9ONdG9q62DwfxoDXj3h1nbozeRlf7ro0g2wViz-TFWG6S2CA/exec',
            {

            },
            {
                headers: {
                    "Content-Type": "text/plain",
                },
                params: {
                    'site': payload.site,
                    'subjectNumber': payload.subjectNumber,
                    'age': payload.age,
                    'note': payload.note,
                    'other:': payload.other,
                    'presence': payload.presence,
                    'Q1': payload.Q1,
                    'Q2': payload.Q2,
                    'Q3': payload.Q3,
                    'Q4': payload.Q4,
                    'Q5': payload.Q5,
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


const researchQuestionsSlice = createSlice({
    name: 'researchQuestions',
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state[action.payload.index] = action.payload.value;
        },
        resetQuestions: (state) => {
            state = {...initialState};
        },
        extraReducers: (builder) => {
            builder.addCase(submitResearchQuestions.pending, state => {
                state.loading = true;
            })
            builder.addCase(submitResearchQuestions.fulfilled, state => {
                state.loading = false;
                state.error = '';
            })
            builder.addCase(submitResearchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        }
    }
});

export const { setQuestion, resetQuestions } = researchQuestionsSlice.actions;
export const selectResearchQuestions = state => state.researchQuestions;
export default researchQuestionsSlice.reducer;