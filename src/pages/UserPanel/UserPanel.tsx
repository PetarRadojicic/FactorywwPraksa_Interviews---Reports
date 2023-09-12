import { Input, Divider, Row, Card, Space, Col, Button, Table, Tag } from 'antd';
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
const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

export const UserPanel: React.FC = () => {


  const data: [] = []

  const userData = API()


  let { id } = useParams();
  console.log(id)


  return <div className="fullWrapper">
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

          <div className='userCardContainer' key={ele.id}>
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
          </div>

          <Table dataSource={data} className='Table'>
          <ColumnGroup title="Company">
            </ColumnGroup>
            <ColumnGroup title="Interview Data">
            </ColumnGroup>
            <ColumnGroup title="Status">
            </ColumnGroup>
          </Table>
        </>
      ) : null
    ))}
  </div>
}

