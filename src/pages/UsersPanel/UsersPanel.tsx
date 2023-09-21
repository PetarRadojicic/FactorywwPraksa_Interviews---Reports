import { Input, Divider, Row, Card, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getUserData } from '../../utils/API';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { checkSearch } from '../../services/checkSearch';
import './UsersPanel.scss';

const { Meta } = Card;

export const UsersPanel: React.FC = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    setSearch(e.target.value.toLowerCase())
  }

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getUserData('candidates', sessionStorage.getItem("token"))
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });
  }, []);

  const handleNavigate = (id: any) => {
    const redirect = `/UserPanel/${id}`
    navigate(redirect);
  }

  return <div className='fullWrapper-UsersPanel'>
    <Row justify="start" >
      <Col span={4}><h1>Candidates</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Input onChange={searchSurname} className="searchInput" addonBefore={<SearchOutlined />} placeholder="Search" />
    </Row>
    <Divider></Divider>
    <Row gutter={[16, 24]}>
      {candidates.map((ele: any) => (
        checkSearch(ele.name,search) ? (
          <Card key={ele.id} onClick={() => { handleNavigate(ele.id) }} className="usersCard"
            hoverable
            cover={<img className="imgCard" src={ele.avatar} />}
          >
            <Meta title={ele.name} description={ele.email} />
          </Card>
        ) : null
      ))}
    </Row>
  </div>
}
