import './App.css'
import data from './data.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios'
import Cart from './routes/Cart.js'

function App() {

  // 최근 본 상품
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify( [] ))

    // 이미 watched 항목이 있다면 setItem() 하지 말아주세요.
  }, []);

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate(); // 페이지 이동을 도와준다.

  // localStorage - 데이터를 서버 없이도 반영구적으로 저장 가능
  // 사이트를 재접속해도 데이터가 남아있다. 단, 브라우저 청소시 삭제됨.
  // 원래는 문자열만 저장이 가능하지만 JSON으로 바꾸면 array/object로 저장할 수 있다.
  // array/object -> json 변환은 JSON.stringify()
  // json -> array/object 변환은 JSON.parse()
  // 결론 : array/object -> json 변환하면 localStorage에 저장가능

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link></Link>

      <Routes>
        <Route path="/" element={
        <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
            {
              shoes.map((a, i)=>{
                return <Card shoes={shoes[i]} i={i+1}></Card>
            })}
          </div>
        </div>
        <button onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((결과)=>{
            {/*성공*/}
            {/*shoes에 가져온 데이터 추가*/}
            let copy = [...shoes, ...결과.data];
            setShoes(copy);
          })
          .catch(()=>{
            {/*실패*/}
          })
        }}>더보기</button>
        </>
      }/>
        
      <Route path="/detail/:id" element={
        <Detail shoes={shoes}/>
      }/>
      
      <Route path="/cart" element={ <Cart/> }/>

      <Route path="about" element={<About/>}>
        <Route path="member" element={<div>멤버임</div>} />
        <Route path="location" element={<div>위치정보임</div>} />
      </Route>        
        
      <Route path="*" element={<h4>404 : 없는 페이지 입니다.</h4>}/>
      
      </Routes>


    </div>
  );
} 


function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes'+ props.i +'.jpg'} width="80%"/>
        <h5>{ props.shoes.title }</h5>
        <p>{ props.shoes.price }</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;

// 모든 state를 localStorage에 자동저장 => redux-perisist 사용.