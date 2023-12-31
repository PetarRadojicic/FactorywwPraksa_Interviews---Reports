import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Divider, Input, Radio } from 'antd';

import { ListUsers } from '../../components/ListUsers/ListUsers';
import { deleteUserData, getUserData } from '../../utils/API';
import { UserModal } from '../../components/UserModal/UserModal';
import { WizardReports } from '../WizardReports/WizardReports';
import { checkSearch } from '../../services/checkSearch'
import '../../ScssPartials/AdminPanel.scss';

interface IUserValues {
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
  const [mode, setMode] = useState('Reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportsValueModal, setReportsValueModal] = useState({} as IUserValues);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(1);
  const [search, setSearch] = useState('');

  const searchSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUserData('reports', sessionStorage.getItem('token'))
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching interview:', error);
      });
  }, [reload]);

  const onDelete = async (values: any) => {
    deleteReport(values);
    setReload(reload + 1);
  };

  const deleteReport = async (id: any) => {
    try {
      await deleteUserData('reports', id, sessionStorage.getItem('token'));
    } catch (e) {
      alert(e);
    }
  };

  const handleModal = (ele: IUserValues) => {
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
      <Divider orientation="center" className="admin-panel-divider">
        <h1>Reports Administration</h1>
        <Radio.Group
          className="admin-panel-view-container"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <Radio.Button className="admin-panel-view" value={'Reports'}>
            Reports
          </Radio.Button>
          <Radio.Button className="admin-panel-view" value={'Create Report'}>
            Create Report
          </Radio.Button>
        </Radio.Group>
      </Divider>
      {mode === 'Reports' && (
        <div className="admin-panel-search-container">
          <Input
            onChange={searchSurname}
            className="admin-panel-search-input"
            addonBefore={<SearchOutlined />}
            placeholder="Search"
          />
        </div>
      )}
      {mode === 'Reports' ? (
        reports.map((ele: IUserValues) =>
          checkSearch(ele.candidateName, search) ? (
            <ListUsers
              key={ele.id}
              id={ele.id}
              companyName={ele.companyName}
              interviewDate={ele.interviewDate}
              candidateName={ele.candidateName}
              status={ele.status}
              phase={ele.phase}
              note={ele.note}
              close={ele.close}
              handleModal={() => handleModal(ele)}
              onDelete={() => onDelete(ele.id)}
            />
          ) : null
        )
      ) : (
        <WizardReports />
      )}
    </>
  );
};