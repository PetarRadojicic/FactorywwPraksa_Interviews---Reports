import { Input, Divider, Row, Card, Space, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import defaultBG from '../../assets/img/default.png';
import { useState } from 'react';
import './UserPanel.scss';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom"


const { Meta } = Card;


export const UserPanel: React.FC = () => {


  const userData = API()


  let { id } = useParams();
  console.log(id)


  return <>
    <Row justify="center" >
      <Col span={6}><h1>Interviews Report</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Button className="Button" href="/UsersPanel">Candidates</Button>
    </Row>
    <Divider></Divider>

    {userData.props.children.map((ele: any) => (
      ele.id == id ? (


        <>
          <Row>
            <Col span={4}>{<img src={defaultBG} className='bgimg' />}</Col>
            <Col span={10}>{ele.surname}</Col>
            <Col span={4}>{ele.age}</Col>
          </Row>
          <Row>
            <Col span={4}></Col>
            <Col span={10}>{ele.email}</Col>
            <Col span={4}>{ele.name}</Col>
          </Row>





        </>



      ) : null
    ))}
  </>
}

