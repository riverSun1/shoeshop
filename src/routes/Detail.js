import { useParams } from "react-router-dom";
import styled from 'styled-components';

function Detail(props){

  let {id} = useParams();

  return (
    <div className="container">
      <button className="???">버튼</button>
      <div className="row">
        <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
        </div>
        <div className="col-md-6 mt-4">
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}원</p>
            <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;