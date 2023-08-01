import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCount } from './../store.js'

// <tr> - 행 하나 생김
// <th>, <td> - 열 하나 생김
// 장바구니 state가 app, detail, cart에 필요하면 어디 만들어야할까? props 만들기엔 번거롭다.
// Redux 사용하면 컴포넌트들이 props 없이 state 공유 가능
// Redux를 설치하면 js파일에 state들을 다 저장해서 하나씩 가져와서 사용 가능
// React 구인시 대부분 Redux 요구

// Redux 쓰면 편한데 props를 왜 쓰나?
// Redux는 등록해야하고 그래서 간단한 프로젝트의 경우 props를 사용.

function Cart(){

    let state = useSelector( (state)=>state ) // <= Redux store 가져와줌
    let dispatch = useDispatch() // store.js로 요청 보내주는 함수임.

    return (
        <div>
            <h3>{state.user.name} {state.user.age}의 장바구니</h3>
        
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i)=>
                            <tr key={i}>
                                <td>{state.cart[i].id}</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(addCount(state.cart[i].id)) // 버튼 옆의 id
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

// Redux state 변경하려면
// 1. state 변경해주는 함수만들기
// 2. export
// 3. dispatch((state변경함수()))

export default Cart;