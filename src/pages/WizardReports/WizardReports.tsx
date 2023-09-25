import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Divider, Form, Input, Progress, Row, Select } from 'antd';
import { Dayjs } from 'dayjs';

import { userBuilder } from '../../services/userBuilder';
import { getUserData, submitUserData } from '../../utils/API';
import '../../ScssPartials/WizardReports.scss';

interface Candidate {
    id: number;
    name: string;
    email: string;
    avatar: string;
};

export const WizardReports: React.FC = () => {
    const { Meta } = Card;

    const [loadingPlaceholder, setLoadingPlaceholder] = useState(true);
    const [loadingPlaceholder2, setLoadingPlaceholder2] = useState(true);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("Select Candidate");
    const [changeWizardStep, setChangeWizardStep] = useState(1);
    const [search, setSearch] = useState('');

    const [candidateId, setCandidateId] = useState(0)
    const [candidateName, setCandidateName] = useState('')
    const [companyId, setCompanyId] = useState(0)
    const [companyName, setCompanyName] = useState('')
    const [interviewDate, setInterviewDate] = useState<Dayjs | null>(null);
    const [phase, setPhase] = useState('');
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            getUserData('candidates', token)
                .then(response => {
                    setCandidates(response.data);
                })
                .catch(error => {
                    console.error('Error fetching interview:', error);
                });

            getUserData('companies', token)
                .then(response => {
                    setCompanies(response.data);
                })
                .catch(error => {
                    console.error('Error fetching interview:', error);
                });
        } else {
            alert('Token not found');
        }
    }, []);

    const searchSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase())
    };

    const handleSubmit = async () => {
        try {
            await submitUserData('reports', userBuilder(candidateId, candidateName, companyId, companyName, interviewDate, phase, status, note), sessionStorage.getItem("token"))
            setChangeWizardStep(4)
            setProgress(100)
        } catch (e) {
            alert(e)
        }
    };

    const renderStep1 = () => {
        return candidates.map((ele: Candidate) => (
            ele.name.toLowerCase().startsWith(search) ? (
                <Card key={ele.id} onClick={() => {
                    setLoadingPlaceholder(false)
                    setCandidateName(ele.name)
                    setProgress(33)
                    setChangeWizardStep(2)
                    setTitle('SelectCandidate')
                    setCandidateId(ele.id)
                }} className="users-panel-card"
                    hoverable
                    cover={<img src={ele.avatar} />}
                >
                    <Meta title={ele.name} description={ele.email} />
                </Card>
            ) : null
        ))
    };

    const renderStep2 = () => {
        return companies.map((ele: Candidate) => (
            ele.name.toLowerCase().startsWith(search) ? (
                <Card key={ele.id} onClick={() => {
                    setLoadingPlaceholder2(false)
                    setCompanyName(ele.name)
                    setProgress(66)
                    setChangeWizardStep(3)
                    setTitle('Fill Report Detail')
                    setCompanyId(ele.id)
                }} className="step-2-users-card"
                    hoverable
                >
                    <Meta title={ele.name} />
                </Card>
            ) : null
        ))
    }

    const renderStep3 = () => {
        return (
            <>
                <Form className="input-wrapper-report">
                    <Form.Item label="InterView Date" className="input-wrapper">
                        <DatePicker className="inputs" onChange={date => setInterviewDate(date)} />
                    </Form.Item>
                    <Divider></Divider>
                    <Form.Item label="Phase" className="inputs" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Select onChange={value => setPhase(value)}>
                            <Select.Option value="hr">hr</Select.Option>
                            <Select.Option value="cv">cv</Select.Option>
                            <Select.Option value="final">final</Select.Option>
                        </Select>
                    </Form.Item>
                    <Divider></Divider>
                    <Form.Item label="Status" className="inputs">
                        <Select onChange={value => setStatus(value)}>
                            <Select.Option value="passed">passed</Select.Option>
                            <Select.Option value="declined">declined</Select.Option>
                        </Select>
                    </Form.Item>
                    <Divider></Divider>
                    <Form.Item label="Notes" className="inputs">
                        <Input.TextArea rows={4} onChange={e => setNote(e.target.value)} />
                    </Form.Item>
                    <Divider></Divider>
                    <Button className="button-submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </>
        )
    };

    const renderStep4 = () => {
        return (
            <Button href='/AdminPanel' className='button-back'>GoBack</Button>
        )
    };

    return <>
        <div className='search-input-container'>
            <Input onChange={searchSurname} className="search-input" addonBefore={<SearchOutlined />} placeholder="Search" />
        </div>
        <div className='percent'>
            <Progress percent={progress} />
        </div>
        <Divider><h1>{title}</h1></Divider>

        <div className='selected-container'>
            <Card loading={loadingPlaceholder} className='selected'>
                <Meta
                    title="Candidate"
                    description={candidateName}
                />
            </Card>
            <Card loading={loadingPlaceholder2} className='selected'>
                <Meta
                    title="company"
                    description={companyName}
                />
            </Card>

        </div>
        <Row gutter={[16, 24]}>
            {changeWizardStep === 1 ? renderStep1() :
                changeWizardStep === 2 ? renderStep2() :
                    changeWizardStep === 3 ? renderStep3() :
                        changeWizardStep === 4 ? renderStep4() : null}
        </Row>
    </>;
};