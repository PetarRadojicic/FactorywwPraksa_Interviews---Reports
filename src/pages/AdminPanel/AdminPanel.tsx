import { Input, Divider, Row, Card, Col, Button, Radio } from 'antd';
import { EyeOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import {getInterview,deleteInterview } from '../../modules/API'
import { useState,useEffect } from 'react';
import { UserModal } from '../UserModal/UserModal'
import './AdminPanel.scss';
import { trimDate } from '../../modules/trimDate'
import { WizardReports } from '../WizardReports/WizardReports';

const { Meta } = Card;

export const AdminPanel: React.FC = () => {

  let [mode, setmode] = useState('Reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(<></>);
  const [reports, setReports] = useState([]);
  const [RE, setRE] = useState(1);

  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    setSearch(e.target.value.toLowerCase())
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    getInterview('reports',sessionStorage.getItem("token"))
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });
  }, [RE]);


  const onDelete = async (values: any) => {
    deleteReport(values)
    setRE(RE + 1)
};

  const deleteReport = async (id:any) => {
    try {
        await deleteInterview('reports',id,sessionStorage.getItem("token"))
        
    } catch (e) {

        alert(e)

    }
} 

  return <>
    {isModalOpen ? showModal : null}
    <Divider orientation='center' className="Divider-UsersPanel"><h1>Reports Administration</h1>
      <Radio.Group className="Admin-view-COntainer" value={mode} onChange={(e) => setmode(e.target.value)}>
        <Radio.Button className="Admin-view" value={'Reports'}>Reports</Radio.Button>
        <Radio.Button className="Admin-view" value={'Create Report'}>Create Report</Radio.Button>
      </Radio.Group>
    </Divider>
    {mode == 'Reports' ? <div className='searcahADminCOntainer'>
      <Input onChange={searchSurname} className="searchInput-AdminPanel" addonBefore={<SearchOutlined />} placeholder="Search" />
    </div> : <></>}
    {mode == 'Reports' ? reports.map((ele: any) => (
      ele.candidateName.toLowerCase().startsWith(search) ? (
        <div className="UserPanelWrraper" key={ele.id}>
          <Row gutter={1} key={ele.id} >
            <Col span={5}>
              <Card className="ADmin-Single" title="Company" bordered={false}>
                {ele.companyName}
              </Card>
            </Col>
            <Col span={5}>
              <Card className="ADmin-Single" title="Interview Date" bordered={false}>
                {(ele.interviewDate)}
              </Card>
            </Col>
            <Col span={6}>
              <Card className="ADmin-Single" title="Candidate Name" bordered={false}>
                {ele.candidateName}
              </Card>
            </Col>
            <Col span={4}>
              <Card className="ADmin-Single" title="Status" bordered={false}>
                {ele.status}
              </Card>
            </Col>
            <Col span={2}>
              <Button className="User-modal-button-wrapper" onClick={() => {
                { isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }
                setShowModal(<UserModal companyName={ele.companyName} interviewDate={trimDate(ele.interviewDate)} phase={ele.phase} status={ele.status} note={ele.note} close={closeModal} candidateName={ele.candidateName} />)
              }}><EyeOutlined /></Button>
            </Col>
            <Col span={2}>
            <Button className="User-modal-button-wrapper" onClick={() => {onDelete(ele.id);}}><CloseOutlined /></Button>
            </Col>
          </Row>
        </div>

      ) : null
    )) : <WizardReports />}
  </>
}

