import { CloseOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { deleteInterview, getInterview } from '../../modules/API';
import { UserModal } from '../UserModal/UserModal';
import { WizardReports } from '../WizardReports/WizardReports';
import './AdminPanel.scss';

interface ModalValues {
  id: number;
  companyName: string;
  interviewDate: string;
  phase: number;
  status: number;
  note: string;
  close: () => void;
  candidateName: string;
}

export const AdminPanel: React.FC = () => {
  const [mode, setmode] = useState('Reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportsValueModal, setReportsValueModal] = useState({} as ModalValues);
  const [reports, setReports] = useState([]);
  const [Reload, setReload] = useState(1);
  const [search, setSearch] = useState('');

  const searchSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getInterview('reports', sessionStorage.getItem('token'))
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching interview:', error);
      });
  }, [Reload]);

  const onDelete = async (values: any) => {
    deleteReport(values);
    setReload(Reload + 1);
  };

  const deleteReport = async (id: any) => {
    try {
      await deleteInterview('reports', id, sessionStorage.getItem('token'));
    } catch (e) {
      alert(e);
    }
  };

  const handleModal = (ele: ModalValues) => {
    setReportsValueModal(ele)
    {
      isModalOpen
        ? setIsModalOpen(false)
        : setIsModalOpen(true);
    }
  }

  return (
    <>
      {isModalOpen && (
        <UserModal
          companyName={reportsValueModal.companyName}
          interviewDate={reportsValueModal.interviewDate}
          phase={reportsValueModal.phase}
          status={reportsValueModal.status}
          note={reportsValueModal.note}
          close={closeModal}
          candidateName={reportsValueModal.candidateName}
        />
      )}
      <Divider orientation="center" className="Divider-UsersPanel">
        <h1>Reports Administration</h1>
        <Radio.Group
          className="Admin-view-COntainer"
          value={mode}
          onChange={(e) => setmode(e.target.value)}
        >
          <Radio.Button className="Admin-view" value={'Reports'}>
            Reports
          </Radio.Button>
          <Radio.Button className="Admin-view" value={'Create Report'}>
            Create Report
          </Radio.Button>
        </Radio.Group>
      </Divider>
      {mode == 'Reports' ? (
        <div className="searcahADminCOntainer">
          <Input
            onChange={searchSurname}
            className="searchInput-AdminPanel"
            addonBefore={<SearchOutlined />}
            placeholder="Search"
          />
        </div>
      ) : (
        <></>
      )}
      {mode == 'Reports' ? (
        reports.map((ele: ModalValues) =>

          // this check should go into service file
          ele.candidateName.toLowerCase().startsWith(search) ? (
            // This all should be a component for itself
            <div className="UserPanelWrraper" key={ele.id}>
              <Row gutter={1} key={ele.id}>
                <Col span={5}>
                  <Card
                    className="ADmin-Single"
                    title="Company"
                    bordered={false}
                  >
                    {ele.companyName}
                  </Card>
                </Col>
                <Col span={5}>
                  <Card
                    className="ADmin-Single"
                    title="Interview Date"
                    bordered={false}
                  >
                    {ele.interviewDate}
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    className="ADmin-Single"
                    title="Candidate Name"
                    bordered={false}
                  >
                    {ele.candidateName}
                  </Card>
                </Col>
                <Col span={4}>
                  <Card
                    className="ADmin-Single"
                    title="Status"
                    bordered={false}
                  >
                    {ele.status}
                  </Card>
                </Col>
                <Col span={2}>
                  <Button
                    className="User-modal-button-wrapper"
                    onClick={() => handleModal({...ele, close: () => {}})}
                  >
                    <EyeOutlined />
                  </Button>
                </Col>
                <Col span={2}>
                  <Button
                    className="User-modal-button-wrapper"
                    onClick={() => {
                      onDelete(ele.id);
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </Col>
              </Row>
            </div>
          ) : null
        )
      ) : (
        <WizardReports />
      )}
    </>
  );
};

// overall the entire component is poorly structured, thats why it seems complex even tho' it isnt
// read more about "Single responsibility" principle