import { configureStore, createSlice } from '@reduxjs/toolkit'

// Redux를 쓰는 이유 : 컴포넌트 간 state 공유 편해짐
// Redux store에 state 보관하는 법



export let { changeName } = user.actions

// 유저가 장바구니에 추가한 상품들
let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ]
})

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer

    }
})