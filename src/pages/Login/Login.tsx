import { Button, Row, Form, Input, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import { loginAuth } from '../../modules/loginAuth';
import {nullToken} from '../../modules/token'
import './Login.scss';

export const Login: React.FC = () => {
    // unnecessary enter
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const redirect: string = await loginAuth(values.username, values.password);
        console.log(redirect)
        // error handling should go here non inside login function
        navigate(redirect);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // types and interfaces dont go inside component body
    type FieldType = {
        username: string;
        password: string;
    };
    return <>

        {/* idendation should be 2 spaces */}
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='Form'
        >

            <Row className='Filler-Row'></Row>
            <Row className='Content-Row'>
                <Row className='Row-Input Row-Input-Username'>
                    <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={12} xl={12}>
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                    </Col>
                </Row>
                <Row className='Row-Input Row-Input-Password'>
                    <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                    </Col>
                    <Col xs={20} sm={16} md={12} lg={12} xl={12}>
                        <Form.Item<FieldType>
                            label="password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                    </Col>
                </Row>
                <Row className='Row-Input Row-Input-button'>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button className='Submit' type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    </Col>
                </Row>
            </Row>
            <Row className='Filler-Row'></Row>
        </Form>
    </>
        ;
}