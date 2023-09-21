import { Divider, Row, Col, Button, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getInterview } from '../../modules/API'
import { trimDate } from '../../services/trimDate'
import { useState, useEffect } from 'react';
import './UserPanel.scss';
import { useParams, } from "react-router-dom"
import { UserModal } from '../UserModal/UserModal'

export const UserPanel: React.FC = () => {
  let { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(<></>);
  const { Meta } = Card;
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);


  useEffect(() => {
    // get interview, and then it does everything but getting intervies
    // very very bad practice
    getInterview('candidates', sessionStorage.getItem("token"))
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });

    getInterview('reports', sessionStorage.getItem("token"))
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });
  }, []);

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return <div className="fullWrapper">
    {isModalOpen ? showModal : null}
    <Row justify="center">
      <Col span={6}><h1>Interviews Report</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Button className="Button" href="/UsersPanel">Candidates</Button>
    </Row>
    <Divider></Divider>

    {/* This is misleading, you map users, but you just take one user */}
    {/* You should use .find() for that, but you should also move that out to .service file */}
    {candidates.map((ele: any) => (
      ele.id == id ? (
        <>
          <Row gutter={16} className='UserInfoContainer'>
            <Col span={8}>
              <Card
                className="UserInfoContainer-Profile"
                hoverable
                cover={<img alt="example" src={ele.avatar} />}
              >
                <Meta description="Name" title={ele.name} />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="UserInfoContainer-Card">
                <Meta description="Email" title={ele.name} />
              </Card>
              <Card className="UserInfoContainer-Card">
                <Meta description="Date of birth" title={trimDate(ele.birthday)} />
              </Card>
              <Card className="UserInfoContainer-Card">
                <Meta description="Education" title={ele.education} />
              </Card>
            </Col>
          </Row>
        </>
      ) : null
    ))}
    <Divider orientation='left'><h1>Reports</h1></Divider>
    {reports.map((ele: any) => (
      ele.candidateId == id ? (
        <div className="UserPanelWrraper" key={ele.id}>
          <Row gutter={1} key={ele.id}>
            <Col span={9}>
              <Card title="Company" bordered={false}>
                {ele.companyName}
              </Card>
            </Col>
            <Col span={9}>
              <Card title="Interview Date" bordered={false}>
                {trimDate(ele.interviewDate)}
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Status" bordered={false}>
                {ele.status}
              </Card>
            </Col>
            <Col span={2}>
              <Button className="User-modal-button-wrapper" onClick={() => {
                {setIsModalOpen(!isModalOpen)}
                setShowModal(<UserModal companyName={ele.companyName} interviewDate={trimDate(ele.interviewDate)} phase={ele.phase} status={ele.status} note={ele.note} close={closeModal} candidateName={ele.candidateName} />)
              }}><EyeOutlined /></Button>
            </Col>
          </Row>
        </div>
      ) : null
    ))}
  </div>
}

