import { Input, Divider, Row, Card, Space, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getInterview } from '../../modules/API';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
    getInterview('candidates',sessionStorage.getItem("token"))
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching interview:', error);
      });
  }, []);


  return <div className='fullWrapper-UsersPanel'>
    <Row justify="start" >
      <Col span={4}><h1>Candidates</h1></Col>
      <Col span={4}></Col>
      <Col span={4}></Col>
      <Input onChange={searchSurname} className="searchInput" addonBefore={<SearchOutlined />} placeholder="Search" />
    </Row>
    <Divider></Divider>
    <Row gutter={[16, 24]}>
      {/* this part is again confusing, should at least implement clean code structuring */}
      {candidates.map((ele: any) => (
        ele.name.toLowerCase().startsWith(search) ? (
          // extract the onClick function into script part of component
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
