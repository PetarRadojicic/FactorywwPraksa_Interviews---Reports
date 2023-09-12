import { Input, Divider, Row, Card, Space, Col, List, Button, Modal, Radio } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { EyeOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import defaultBG from '../../assets/img/default.png';
import { useState } from 'react';
import { UserModal } from '../UserModal/UserModal'
import './AdminPanel.scss';

const { Meta } = Card;

export const AdminPanel: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(<></>);
    let [mode, setmode] = useState('Reports');

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const Passed: boolean = false;

    const [search, setSearch] = useState('');
    const searchSurname = (e: any) => {
        setSearch(e.target.value.toLowerCase())
    }

    const userData = API('users')
    return mode == 'Reports' ? <div className='fullWrapper-UsersPanel'>
        {isModalOpen ? showModal : null}
        <Divider orientation='center' className="Divider-UsersPanel"><h1>Reports Administration</h1>
            <Radio.Group value={mode} onChange={(e) => setmode(e.target.value)}>
                <Radio.Button value={'Reports'}>Reports</Radio.Button>
                <Radio.Button value={'Create Report'}>Create Report</Radio.Button>
            </Radio.Group>
        </Divider>
        <Input onChange={searchSurname} className="searchInput-AdminPanel" addonBefore={<SearchOutlined />} placeholder="Search" />
        <Divider></Divider>
        {userData.props.children.map((ele: any) => (
            ele.surname.toLowerCase().startsWith(search) ? (
                <Row justify="space-around" key={ele.id} className="Users-Wrapper">
                    <Col span={4}>{ele.surname}</Col>
                    <Col span={4}>{ele.name}</Col>
                    <Col span={4}>{ele.age}</Col>
                    <Col span={4}>{Passed ? <>Passed</> : <>Declined</>}</Col>
                    <Col span={4} className="Admin-Button-Wrapper"><Button onClick={() => {
                        { isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }
                        // setShowModal(<UserModal/>)
                    }}><EyeOutlined /></Button><Button><CloseOutlined /></Button></Col>
                </Row>
            ) : null
        ))}
    </div> : <div className='fullWrapper-UsersPanel'><Divider orientation='center' className="Divider-UsersPanel"><h1>Reports Administration</h1>
        <Radio.Group value={mode} onChange={(e) => setmode(e.target.value)}>
            <Radio.Button value={'Reports'}>Reports</Radio.Button>
            <Radio.Button value={'Create Report'}>Create Report</Radio.Button>
        </Radio.Group>
    </Divider> <div className='Admin-panel-report-wrapper'>{userData.props.children.map((ele: any) => (
        ele.surname.toLowerCase().startsWith(search) ? (
          <Card key={ele.id} className="Admin-usersCard"
            hoverable
            cover={<img src={defaultBG}  className='Admin-img'/>}
          >
            <Meta title={ele.surname} description={ele.email} />
          </Card>
        ) : null
      ))}</div></div>
}


