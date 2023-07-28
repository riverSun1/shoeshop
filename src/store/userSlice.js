import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({ // useState() 역할임
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    reducers : {
        changeName(state){
            state.name = 'park'
        }
    }
})

export default user