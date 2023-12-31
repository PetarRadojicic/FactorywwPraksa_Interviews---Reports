import React, { useState } from 'react';
import { Modal, Card } from 'antd';

import '../../ScssPartials/UserModal.scss';

interface IAdminProps {
  companyName: string,
  interviewDate: string,
  phase: number,
  status: number,
  note: string,
  close: Function,
  candidateName: string,

};

const tabList = [
  {
    key: 'tab1',
    tab: 'Company',
  },
  {
    key: 'tab2',
    tab: 'Interview Date',
  },
  {
    key: 'tab3',
    tab: 'Phase',
  },
  {
    key: 'tab4',
    tab: 'Status',
  },
  {
    key: 'tab5',
    tab: 'Notes',
  },
];

export const UserModal: React.FC<IAdminProps> = (props: IAdminProps): JSX.Element => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const contentList: Record<string, React.ReactNode> = {
    tab1: <p>{props.companyName}</p>,
    tab2: <p>{props.interviewDate}</p>,
    tab3: <p>{props.phase}</p>,
    tab4: <p>{props.status}</p>,
    tab5: <p>{props.note}</p>,
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return <>
    <Modal open={true} onOk={() => props.close()} onCancel={() => props.close()}>
      <Card
        className='user-modal-card'
        title={props.candidateName}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        tabBarExtraContent={<span></span>}
        tabProps={{ className: 'user-modal-tab' }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </Modal>
  </>
}