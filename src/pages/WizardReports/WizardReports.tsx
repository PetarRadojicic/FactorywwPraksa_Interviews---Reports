import React, { useState } from 'react';
import {Progress, Row, Button, Card, Divider, Select, DatePicker,Form,Input,} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { API } from '../../modules/API'
import './WizardReports.scss';

export const WizardReports: React.FC = () => {
    const { Meta } = Card;
    const [search, setSearch] = useState('');
    const searchSurname = (e: any) => {
        setSearch(e.target.value.toLowerCase())
    }

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [progress, setProgress] = useState(33);
    const [Title, setTitle] = useState("Select Candidate");


    const userDataCandidates = API('candidates',"get")
    const companies = API('companies',"get")


    const [changeWizardStep, setChangeWizardStep] = useState(1);

    function generateRandomNumber(): number {
        const min = 10000000;
        const max = 99999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [candidateId, setCandidateId] = useState()
    const [candidateName, setCandidateName] = useState()
    const [companyId, setCompanyId] = useState()
    const [companyName, setCompanyName] = useState()
    const [interviewDate, setInterviewDate] = useState<Dayjs | null>(null);
    const [phase, setPhase] = useState('');
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');

    const SEND_VALUES_CREATE_REPORT = {
        "id": generateRandomNumber(),
        "candidateId": candidateId,
        "candidateName": candidateName,
        "companyId": companyId,
        "companyName": companyName,
        "interviewDate": interviewDate,
        "phase": phase,
        "status": status,
        "note": note
    }

    const handleSubmit = () => {
        setChangeWizardStep(4)
        setProgress(100)
        if (interviewDate !== null) {
            console.log(SEND_VALUES_CREATE_REPORT);
            API("reports","post",SEND_VALUES_CREATE_REPORT);
        } else {
            console.log('interviewDate is null');
        }
    };












    return <>
        <div className='percent'>
            <Progress percent={progress} />
        </div>
        <Divider><h1>{Title}</h1></Divider>
        <div className='CardSelectorContainer'>
            <Card loading={loading} className='CardSelector'>
                <Meta
                    className='CardSelector'
                    title="Candidate"
                    description={candidateName}
                />
            </Card>
            <Card loading={loading2} className='CardSelector'>
                <Meta
                    className='CardSelector'
                    title="company"
                    description={companyName}
                />
            </Card>
        </div>

        <Row gutter={[16, 24]}>

            {changeWizardStep == 1 ? userDataCandidates.props.children.map((ele: any) => (
                ele.name.toLowerCase().startsWith(search) ? (

                    <Card key={ele.id} onClick={() => {
                        setLoading(false)
                        setCandidateName(ele.name)
                        setProgress(33)
                        setChangeWizardStep(2)
                        setTitle('SelectCandidate')
                        setCandidateId(ele.id)

                    }} className="usersCard"
                        hoverable
                        cover={<img className="imgCard" src={ele.avatar} />}
                    >
                        <Meta title={ele.name} description={ele.email} />
                    </Card>
                ) : null
            ))
                : changeWizardStep == 2 ? companies.props.children.map((ele: any) => (
                    ele.name.toLowerCase().startsWith(search) ? (

                        <Card key={ele.id} onClick={(e) => {
                            setLoading2(false)
                            setCompanyName(ele.name)
                            setProgress(66)
                            setChangeWizardStep(3)
                            setTitle('Fill Report Detail')
                            setCompanyId(ele.id)
                        }} className="Step2-usersCard"
                            hoverable
                        >
                            <Meta title={ele.name} />
                        </Card>
                    ) : null
                ))
                    : changeWizardStep == 3 ? <>
                        <Form className="InputWrapperReport">
                            <Form.Item label="InterView Date" className="SinleInput">
                                <DatePicker onChange={date => setInterviewDate(date)} />
                            </Form.Item>
                            <Form.Item label="Phase" className="SinleInput">
                                <Select onChange={value => setPhase(value)}>
                                    <Select.Option value="hr">hr</Select.Option>
                                    <Select.Option value="cv">cv</Select.Option>
                                    <Select.Option value="final">final</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Status" className="SinleInput">
                                <Select onChange={value => setStatus(value)}>
                                    <Select.Option value="passed">passed</Select.Option>
                                    <Select.Option value="declined">declined</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Notes" className="SinleInput">
                                <Input.TextArea rows={4} onChange={e => setNote(e.target.value)} />
                            </Form.Item>
                            <Button className="BtnSinleInput" onClick={handleSubmit}>Submit</Button>
                        </Form>

                    </>
                        : <Button href='/AdminPanel'></Button>}


        </Row>
    </>;
}