import React from "react";
import { useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

function Detail(props){

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x => x.id == id);
  let [alert, setAlert] = useState(true)
  let [탭, 탭변경] = useState(0)
  let dispatch = useDispatch()

  useEffect(()=>{

    // 누가 Detail 페이지 접속하면
    // 그 페이지에서 보이는 상품 id 가져와서
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    
    // array에서 중복제거 쉽게하려면 Set 자료형 사용
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)

    // localStorage에 watched 항목에 추가
    localStorage.setItem('watched', JSON.stringify(꺼낸거))

    // 기존데이터를 바꾸는게 아니라 더 추가를 하는 것.
  }, [])

  useEffect(()=>{ {/*재렌더링마다 코드 실행하고 싶으면*/}
    let a = setTimeout(()=>{ setAlert(false) }, 2000)

    {/*useEffect 동작 전에 실행되는 return()=>{} */}
    return ()=>{
      {/*react 특성상 재랜더링이 잦다.*/}
      {/*기존 타이머는 제거해주세요.*/}
      {/*기존 코드 치우는거 여기에 많이 작성함*/}
      clearTimeout(); {/*타이머 제거해주는 함수*/}
    }
  }, []); {/*count라는 state가 변할 때만 실행됨*/}

  setTimeout(()=>{ }, 1000)

  return (
    <div className="container">
      {
        alert == true
        ? <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div>
        : null
      }

      <div className="row">
        <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
        </div>
        <div className="col-md-6 mt-4">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem({id : 2, name : 'Grey Yordan', count : 1}))
            }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0"> {/*기본으로 눌려있을 버튼*/}
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭}/>
    </div>
  )
}

function TabContent({탭}) {

  let [fade, setFade] = useState('')

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end') }, 10)
    
    return ()=>{
      clearTimeout(a)
      setFade('')
    }
  }, [탭]) /*탭이라는게 변경될 때마다 안의 코드 */

  return (<div className={'start ' + fade}>
    { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
  </div>)
    
  /*if (props.tab == 0){
    return <div>내용0</div>
  }
  if (props.tab == 1){
    return <div>내용1</div>
  }
  if (props.tab == 2){
    return <div>내용1</div>
  }*/
}

export default Detail;