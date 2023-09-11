import { Input, Divider, Row, Card, Space, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { API } from '../../modules/API'
import defaultBG from '../../assets/img/default.png';
import { useEffect, useState } from 'react';
import './UserPanel.scss';

const { Meta } = Card;

export const UserPanel: React.FC = () => {

  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    setSearch(e.target.value.toLowerCase())
  }

  const userData = API()


  return <>
    <Divider orientation='left'><h1>Interviews Report</h1></Divider>
    <Row justify="center" >
      <Col span={4}><h1>Candidates</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Input onChange={searchSurname} className="searchInput" addonBefore={<SearchOutlined />} placeholder="Search" />
    </Row>
    <Divider></Divider>
    <Row gutter={[16, 24]}>
    {userData.props.children.map((ele: any) => (
  ele.surname.toLowerCase().startsWith(search) ? (
    <Card className="usersCard"
      key={ele.id}
      hoverable
      cover={<img src={defaultBG} />}
    >
      <Meta title={ele.surname} description={ele.email} />
    </Card>
  ) : null
))}

    </Row>
  </>
}

