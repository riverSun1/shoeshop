import './App.css';
import data from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';

function App() {  

  let [shoes] = useState(data);
  let navigate = useNavigate(); {/* 페이지 이동을 도와준다. */}

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
            {/*<Card shoes={shoes[0]} i={1}></Card>
            <Card shoes={shoes[1]} i={2}></Card>
            <Card shoes={shoes[2]} i={3}></Card>*/}
            {
              shoes.map((a, i)=>{
                return (
                  <Card shoes={shoes[i]} i={i+1}></Card>
                )
            })}
          </div>
        </div>
        </>
      }/>
        
      <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
      
      <Route path="/about" element={<About/>}>
        <Route path="member" element={<div>멤버임</div>} />
        <Route path="location" element={<div>위치정보임</div>} />
      </Route>        
        
      <Route path="*" element={<div>없는 페이지 입니다.</div>}/>
      
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