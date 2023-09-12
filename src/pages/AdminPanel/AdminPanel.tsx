import { Input, Divider, Row, Card, Space, Col, List, Button, Modal,Radio } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { EyeOutlined,SearchOutlined,CloseOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import defaultBG from '../../assets/img/default.png';
import { useState } from 'react';
import { UserModal } from '../UserModal/UserModal'
import './AdminPanel.scss';

const { Meta } = Card;

export const AdminPanel: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(<></>);
    const [mode, setmode] = useState('view');

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

    const userData = API()
    return <div className='fullWrapper-UsersPanel'>
        {isModalOpen ? showModal : null}
        <Divider orientation='center' className="Divider-UsersPanel"><h1>Reports Administration</h1>
        <Radio.Group value={mode} onChange={(e) => console.log(e.target.value)}>
        <Radio.Button value="large">Reports</Radio.Button>
        <Radio.Button value="small">Create Report</Radio.Button>
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
                   {isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)}
                    setShowModal(<UserModal surname={ele.surname} name={ele.name} age={ele.age}/>)
                    }}><EyeOutlined /></Button><Button><CloseOutlined /></Button></Col>
                </Row>
            ) : null
        ))}
    </div>
}


