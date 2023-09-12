import React, { useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';


interface AdminProps {
  surname: string,
  name: string,
  age: number,
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
        <Col span={12}>{props.surname}<Row>
          <Col span={12}>{props.age}</Col>
          <Col span={12}></Col>
        </Row></Col>
        <Col span={12}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda commodi amet deserunt magni, magnam est quo expedita nemo, eum obcaecati voluptatibus recusandae quas itaque, consequuntur fugiat. Itaque exercitationem expedita voluptatem!</Col>
      </Row>
    </Modal>
  </>
}