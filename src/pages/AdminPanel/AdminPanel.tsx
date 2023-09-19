import { Input, Divider, Row, Card, Col, Button, Radio } from 'antd';
import { EyeOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { getInterview, deleteInterview } from '../../modules/API';
import { useState, useEffect } from 'react';
import { UserModal } from '../UserModal/UserModal';
import './AdminPanel.scss';
import { trimDate } from '../../modules/trimDate';
import { WizardReports } from '../WizardReports/WizardReports';

// Unused component remove from code
const { Meta } = Card;

export const AdminPanel: React.FC = () => {
  //no enter is required after opening block of code
  let [mode, setmode] = useState('Reports'); // useState should always be used with const keyword
  const [isModalOpen, setIsModalOpen] = useState(false);
  // wrong implementation, once again, we have talked about not seting components into state
  const [showModal, setShowModal] = useState(<></>);
  const [reports, setReports] = useState([]);
  // what is RE? bad naming, fellow colegues will never understand what this piece of code is for
  const [RE, setRE] = useState(1);
  // no enter for no reason, we always have a row of space after closing block of code,
  // or when we want to visually annotate that some lines of codes are grouped together for a reason
  const [search, setSearch] = useState('');
  const searchSurname = (e: any) => {
    // dont use any unless you have no other option
    // lookup docs to see what are ANT callback function types
    setSearch(e.target.value.toLowerCase());
  };
  // enter because of end of codeblock
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
  }, [RE]);

  const onDelete = async (values: any) => {
    deleteReport(values);
    setRE(RE + 1);
  };

  const deleteReport = async (id: any) => {
    try {
      await deleteInterview('reports', id, sessionStorage.getItem('token'));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {isModalOpen ? showModal : null}
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
        // wrong ANY type
        reports.map((ele: any) =>
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
                    // you should always tend to extract eventHandler functions to
                    // script part of component, then only reference them in JSX
                    onClick={() => {
                      {
                        isModalOpen
                          ? setIsModalOpen(false)
                          : setIsModalOpen(true);
                      }
                      setShowModal(
                        <UserModal
                          companyName={ele.companyName}
                          interviewDate={trimDate(ele.interviewDate)}
                          phase={ele.phase}
                          status={ele.status}
                          note={ele.note}
                          close={closeModal}
                          candidateName={ele.candidateName}
                        />
                      );
                    }}
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