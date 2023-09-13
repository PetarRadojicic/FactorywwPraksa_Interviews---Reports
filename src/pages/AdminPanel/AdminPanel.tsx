import { Input, Divider, Row, Card, Space, Col, List, Button, Modal, Radio } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { EyeOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import defaultBG from '../../assets/img/default.png';
import { useState } from 'react';
import { UserModal } from '../UserModal/UserModal'
import './AdminPanel.scss';
import { trimDate } from '../../modules/trimDate'
import { CreateReport } from '../CreateReport/CreateReport';

const { Meta } = Card;

export const AdminPanel: React.FC = () => {

  let [mode, setmode] = useState('Reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(<></>);

  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    setSearch(e.target.value.toLowerCase())
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const userData = API('reports')
  const userDataCandidates = API('candidates')
  return <>
    {isModalOpen ? showModal : null}
    <Divider orientation='center' className="Divider-UsersPanel"><h1>Reports Administration</h1>
      <Radio.Group className="Admin-view-COntainer" value={mode} onChange={(e) => setmode(e.target.value)}>
        <Radio.Button className="Admin-view" value={'Reports'}>Reports</Radio.Button>
        <Radio.Button className="Admin-view" value={'Create Report'}>Create Report</Radio.Button>
      </Radio.Group>
    </Divider>
    <div className='searcahADminCOntainer'>
      <Input onChange={searchSurname} className="searchInput-AdminPanel" addonBefore={<SearchOutlined />} placeholder="Search" />
    </div>

    {mode == 'Reports' ? userData.props.children.map((ele: any) => (
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
                {trimDate(ele.interviewDate)}
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
              <Button className="User-modal-button-wrapper" onClick={() => { }}><CloseOutlined /></Button>
            </Col>
          </Row>
        </div>

      ) : null
    )) : <CreateReport />}
  </>
}




