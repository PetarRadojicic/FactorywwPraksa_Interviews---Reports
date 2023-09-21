import { Divider, Row, Col, Button, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getUserData } from '../../utils/API'
import { trimDate } from '../../services/trimDate'
import { useState, useEffect } from 'react';
import '../../ScssPartials/UserPanel.scss';
import { useParams, } from "react-router-dom"
import { UserModal } from '../../components/UserModal/UserModal'
import { findUser } from '../../services/findUser'

export const UserPanel: React.FC = () => {
  let { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(<></>);
  const { Meta } = Card;
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [foundUser, setFoundUser] = useState<any>({});

  useEffect(() => {
    getUserData('candidates', sessionStorage.getItem("token"))
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });

    getUserData('reports', sessionStorage.getItem("token"))
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

  useEffect(() => {
    setFoundUser(findUser(candidates, id));
  }, [candidates, id]);

  return <div className="full-wrapper">
    {isModalOpen ? showModal : null}
    <Row justify="center">
      <Col span={6}><h1>Interviews Report</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Button className="user-panel-button" href="/UsersPanel">Candidates</Button>
    </Row>
    <Divider></Divider>
    {foundUser ? <>
      <Row gutter={16} className='user-info-container'>
        <Col span={8}>
          <Card
            className="user-info-container-profile"
            hoverable
            cover={<img alt="example" src={foundUser.avatar} />}
          >
            <Meta description="Name" title={foundUser.name} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="user-info-container-card">
            <Meta description="Email" title={foundUser.name} />
          </Card>
          <Card className="user-info-container-card">
            <Meta description="Date of birth" title={foundUser.birthday} />
          </Card>
          <Card className="user-info-container-card">
            <Meta description="Education" title={foundUser.education} />
          </Card>
        </Col>
      </Row>
    </> : null}
    <Divider orientation='left'><h1>Reports</h1></Divider>
    {reports.map((ele: any) => (
      ele.candidateId == id ? (
        <div className="user-panel-wrapper" key={ele.id}>
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
              <Button className="user-modal-button-wrapper" onClick={() => {
                { setIsModalOpen(!isModalOpen) }
                setShowModal(<UserModal companyName={ele.companyName} interviewDate={trimDate(ele.interviewDate)} phase={ele.phase} status={ele.status} note={ele.note} close={closeModal} candidateName={ele.candidateName} />)
              }}><EyeOutlined /></Button>
            </Col>
          </Row>
        </div>
      ) : null
    ))}
  </div>
}