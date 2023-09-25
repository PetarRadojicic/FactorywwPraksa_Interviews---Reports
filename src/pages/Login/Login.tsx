import { Button, Row, Form, Input, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import { loginAuth } from '../../utils/loginAuth';

import '../../ScssPartials/Login.scss';

type FieldType = {
  username: string;
  password: string;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const redirect: string = await loginAuth(values.username, values.password);
      navigate(redirect);
    }
    catch (e) {
      console.log('Failed:', e);
    }
  };

  return (
    <>
      <Form onFinish={onFinish} className='login-form'>
        <Row className='login-form-filler'></Row>
        <Row className='login-form-content'>
          <Row className='login-form-row-input login-form-row-input-username'>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}></Col>
            <Col xs={20} sm={16} md={12} lg={12} xl={12}>
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}></Col>
          </Row>
          <Row className='login-form-row-input login-form-row-input-password'>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}></Col>
            <Col xs={20} sm={16} md={12} lg={12} xl={12}>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}></Col>
          </Row>
          <Row className='login-form-row-input login-form-row-input-button'>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className='login-form-submit' type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}></Col>
          </Row>
        </Row>
        <Row className='login-form-filler'></Row>
      </Form>
    </>
  );
};