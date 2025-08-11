import React, { useState } from 'react';
import {
  Card,
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  Row,
  Col,
  message,
} from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const LeaveRequest: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    message.success('Leave application submitted');
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <Card title="Leave Application" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Leave Type"
          name="leaveType"
          rules={[{ required: true, message: 'Please select leave type' }]}
        >
          <Select placeholder="Select">
            <Option value="sick">Sick Leave</Option>
            <Option value="casual">Casual Leave</Option>
            <Option value="earned">Earned Leave</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="dateRange"
          rules={[{ required: true, message: 'Please select date range' }]}
        >
          <RangePicker
            format="DD-MMM-YYYY"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Team Email ID"
          name="email"
          rules={[
            { required: true, message: 'Please enter team email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input placeholder="example@team.com" />
        </Form.Item>

        <Form.Item
          label="Reason for Leave"
          name="reason"
          rules={[{ required: true, message: 'Please enter reason' }]}
        >
          <TextArea rows={4} placeholder="Enter reason for leave" />
        </Form.Item>

        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={onCancel}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LeaveRequest;
