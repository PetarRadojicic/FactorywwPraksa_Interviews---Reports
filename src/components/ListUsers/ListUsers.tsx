import react, { useState } from 'react';

import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col,Row } from 'antd';
import '../../pages/AdminPanel/AdminPanel.scss';

interface IModalValues {
    id: number;
    companyName: string;
    interviewDate: string;
    phase: number;
    status: number;
    note: string;
    close: () => void;
    onDelete: () => void;
    handleModal: () => void;
    candidateName: string;
  }

export const ListUsers = (props:IModalValues) => {
    return <div className="UserPanelWrraper" key={props.id}>
    <Row gutter={1} key={props.id}>
      <Col span={5}>
        <Card
          className="ADmin-Single"
          title="Company"
          bordered={false}
        >
          {props.companyName}
        </Card>
      </Col>
      <Col span={5}>
        <Card
          className="ADmin-Single"
          title="Interview Date"
          bordered={false}
        >
          {props.interviewDate}
        </Card>
      </Col>
      <Col span={6}>
        <Card
          className="ADmin-Single"
          title="Candidate Name"
          bordered={false}
        >
          {props.candidateName}
        </Card>
      </Col>
      <Col span={4}>
        <Card
          className="ADmin-Single"
          title="Status"
          bordered={false}
        >
          {props.status}
        </Card>
      </Col>
      <Col span={2}>
        <Button
          className="User-modal-button-wrapper"
          onClick={() => props.handleModal()}
        >
          <EyeOutlined />
        </Button>
      </Col>
      <Col span={2}>
        <Button
          className="User-modal-button-wrapper"
          onClick={() => {
            props.onDelete();
          }}
        >
          <CloseOutlined />
        </Button>
      </Col>
    </Row>
  </div>

}