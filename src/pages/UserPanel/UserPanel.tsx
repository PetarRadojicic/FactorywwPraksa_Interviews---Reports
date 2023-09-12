import { Input, Divider, Row, Card, Space, Col, List, Button, Modal, Radio } from 'antd';
import { EyeOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import { useState } from 'react';
import './UserPanel.scss';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom"
import { UserModal } from '../UserModal/UserModal'

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

export const UserPanel: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(<></>);

  const userDataReports = API('reports')
  const userDataCandidates = API('candidates')

  let { id } = useParams();


  return <div className="fullWrapper">
    {isModalOpen ? showModal : null}
    <Row justify="center" >
      <Col span={6}><h1>Interviews Report</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Button className="Button" href="/UsersPanel">Candidates</Button>
    </Row>
    <Divider></Divider>

    {userDataCandidates.props.children.map((ele: any) => (
      ele.id == id ? (
        <>
          <div className='userCardContainer' key={ele.id}>
            <Row>
              <Col span={4}>{<img src={ele.avatar} className='bgimg' />}</Col>
              <Col span={10}>{ele.name}</Col>
              <Col span={4}>{ele.birthday}</Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={10}>{ele.email}</Col>
              <Col span={4}>{ele.education}</Col>
            </Row>
          </div>
        </>
      ) : null
    ))}
    <Divider orientation='left'>Reports</Divider>
    {userDataReports.props.children.map((ele: any) => (
      ele.candidateId == id ? (
        <div className="UserPanelWrraper" key={ele.id}>
          <Row>
            <Col span={8} className="">Company</Col>
            <Col span={8} className="">Interview Date</Col>
            <Col span={8} className="">Status</Col>
          </Row>
          <Row>
            <Col span={6} className="">{ele.companyName}</Col>
            <Col span={6} className="">{ele.interviewDate}</Col>
            <Col span={6} className="">{ele.status}</Col>
            <Col span={6} className=""><Button onClick={() => {
              { isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }
              setShowModal(<UserModal companyName={ele.companyName} interviewDate={ele.interviewDate} phase={ele.phase} status={ele.status}/>)
            }}><EyeOutlined /></Button></Col>
          </Row>
        </div>
      ) : null
    ))}
  </div>
}

