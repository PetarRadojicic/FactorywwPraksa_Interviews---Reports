import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';


interface AdminProps {
  companyName: string,
  interviewDate: string,
  phase: number,
  status: number,
}

export const UserModal: React.FC<AdminProps> = (props: any): JSX.Element => {


  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return <>
    <Modal title={props.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Row>
        <Col span={12}>{props.companyName}<Row>
          <Col span={12}>{props.interviewDate}</Col>
          <Col span={12}>{props.phase}</Col>
          <Col span={12}>{props.status}</Col>
        </Row></Col>
        <Col span={12}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda commodi amet deserunt magni, magnam est quo expedita nemo, eum obcaecati voluptatibus recusandae quas itaque, consequuntur fugiat. Itaque exercitationem expedita voluptatem!</Col>
      </Row>
    </Modal>
  </>
}