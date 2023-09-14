import { Input, Divider, Row, Card, Space, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { API } from '../../modules/API';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './UsersPanel.scss';



const { Meta } = Card;

export const UsersPanel: React.FC = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    setSearch(e.target.value.toLowerCase())
  }

  const userData = API('candidates','get')
  return <div className='fullWrapper-UsersPanel'>
    <Divider orientation='center' className="Divider-UsersPanel"><h1>Interviews Report</h1></Divider>
    <Row justify="start" >
      <Col span={4}><h1>Candidates</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Input onChange={searchSurname} className="searchInput" addonBefore={<SearchOutlined />} placeholder="Search" />
    </Row>
    <Divider></Divider>
    <Row gutter={[16, 24]}>
      {userData.props.children.map((ele: any) => (
        ele.name.toLowerCase().startsWith(search) ? (
          <Card key={ele.id} onClick={() => {

            const redirect = `/UserPanel/${ele.id}`

            navigate(redirect);


          }} className="usersCard"
            hoverable
            cover={<img className="imgCard" src={ele.avatar}/>}
          >
            <Meta title={ele.name} description={ele.email} />
          </Card>
        ) : null
      ))}

    </Row>
  </div>
}
