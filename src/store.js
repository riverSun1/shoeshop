import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// Redux를 쓰는 이유 : 컴포넌트 간 state 공유 편해짐
// Redux store에 state 보관하는 법

export let { changeName } = user.actions

// 유저가 장바구니에 추가한 상품들
let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
        {id : 1, name : 'Red Knit', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let 번호 = state.findIndex((a)=> a.id === action.payload) // a는 array 자료에 있던 data들.
            // payload와 같은 id 가진 상품을 찾아서 +1
            // 몇 번째 항목인지 찾아서 몇 번인지를 남겨줌.
            state [번호].count++
        },
        addItem(state, action){
            //state.push({id : 1, name : 'Red Knit', count : 1}) // array 뒤에 자료 추가해주는 함수 
            state.push(action.payload)
        }
    }
})

export let { addCount, addItem } = cart.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer

    }
})