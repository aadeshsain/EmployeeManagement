import React from 'react';
import {
  Card,
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  Row,
  Col,
  notification,
} from 'antd';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axiosInstance from '../api/axiosInstance';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const LeaveRequest: React.FC = () => {
  const [form] = Form.useForm();

  const leaveMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/leave-request', data);
      return response.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Leave Submitted',
        description: 'Your leave request has been successfully submitted.',
      });
      form.resetFields();
    },
    onError: (error: any) => {
      notification.error({
        message: 'Submission Failed',
        description:
          error?.response?.data?.error || error?.message || 'Something went wrong!',
      });
    },
  });

  const onFinish = (values: any) => {
    const payload = {
      leaveType: values.leaveType,
      startDate: dayjs(values.dateRange[0]).format('YYYY-MM-DD'),
      endDate: dayjs(values.dateRange[1]).format('YYYY-MM-DD'),
      email: values.email,
      reason: values.reason,
    };
    leaveMutation.mutate(payload);
  };

  const onCancel = () => {
    form.resetFields();
    leaveMutation.reset();
  };

  return (
    <Card
      title="Leave Application"
      style={{
        maxWidth: 700,
        margin: '40px auto',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        background: '#fafafa',
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Leave Type"
          name="leaveType"
          rules={[{ required: true, message: 'Please select leave type' }]}
        >
          <Select placeholder="Select Leave Type">
            <Option value="sick">Sick Leave</Option>
            <Option value="casual">Casual Leave</Option>
            <Option value="earned">Earned Leave</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Leave Dates"
          name="dateRange"
          rules={[{ required: true, message: 'Please select date range' }]}
        >
          <RangePicker
            style={{ width: '100%' }}
            format="DD-MMM-YYYY"
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          label="Team Email"
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
            <Button
              type="primary"
              htmlType="submit"
              loading={leaveMutation.status === 'pending'}
            >
              Submit
            </Button>

            <Button
              onClick={onCancel}
              disabled={leaveMutation.status === 'pending'}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LeaveRequest;
