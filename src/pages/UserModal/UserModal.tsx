import React, { useState } from 'react';
import { Modal, Card, Col } from 'antd';
import './UserModal.scss';

interface AdminProps {
  companyName: string,
  interviewDate: string,
  phase: number,
  status: number,
  note: string,
}

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



export const UserModal: React.FC<AdminProps> = (props: any): JSX.Element => {


  const [isModalOpen, setIsModalOpen] = useState(true);

  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const contentList: Record<string, React.ReactNode> = {
    tab1: <p>{props.companyName}</p>,
    tab2: <p>{props.interviewDate}</p>,
    tab3: <p>{props.phase}</p>,
    tab4: <p>{props.status}</p>,
    tab5: <p>{props.note}</p>,
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return <>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Card
        className='Moda-USer'
        title={'Temp'}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </Modal>
  </>
}