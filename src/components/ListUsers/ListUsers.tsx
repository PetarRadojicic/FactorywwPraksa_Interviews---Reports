import react, { useState } from 'react';

import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Col,Row } from 'antd';
import '../../ScssPartials/ListUsers.scss';

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
    return <div className="listPanelwrraper" key={props.id}>
    <Row gutter={1} key={props.id}>
      <Col span={5}>
        <Card
          className="listCard"
          title="Company"
          bordered={false}
        >
          {props.companyName}
        </Card>
      </Col>
      <Col span={5}>
        <Card
          className="listCard"
          title="Interview Date"
          bordered={false}
        >
          {props.interviewDate}
        </Card>
      </Col>
      <Col span={6}>
        <Card
          className="listCard"
          title="Candidate Name"
          bordered={false}
        >
          {props.candidateName}
        </Card>
      </Col>
      <Col span={4}>
        <Card
          className="listCard"
          title="Status"
          bordered={false}
        >
          {props.status}
        </Card>
      </Col>
      <Col span={2}>
        <Button
          className="listModalButtonWrapper"
          onClick={() => props.handleModal()}
        >
          <EyeOutlined />
        </Button>
      </Col>
      <Col span={2}>
        <Button
          className="listModalButtonWrapper"
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