import React, { useState, useEffect } from 'react'
import './edituser.css';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router';
import TextArea from 'rc-textarea';

export default function AddVaccination() {
    const { Option } = Select;
    const vaccinationId = useParams();
    const [vaccine, setvaccine] = useState([]);
    const [centers, setcenters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccine/read.php')
            .then(res => {
                const { records } = res.data;
                setvaccine(records);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/health_center/read.php')
            .then(res => {
                const { records } = res.data;
                setcenters(records);
            })
    }, [])

    const onFinish = (values) => {
        values = {
            ...values,
            date: values.date._d.toLocaleDateString()
        }
        console.log('Success:', values);
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccination/create_vaccination.php', { params: JSON.stringify(values) })
            .then(res => {
                console.log(res);
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="editUser">
            <h1>Add Vaccination {vaccinationId.id} </h1>
            <div className="editorWrapper">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Số CMND"
                        name="cccd"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày tiêm"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày',
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item >
                    <Form.Item label="Cơ sở tiêm chủng"
                        name='health_center_id'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày',
                            }
                        ]}
                    >
                        <Select defaultValue='--chọn cơ sở--' style={{ width: 210 }}>
                            {centers.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Loại Vaccine"
                        name='vaccine_id'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày',
                            }
                        ]}
                    >
                        <Select defaultValue='--chọn loại vaccine--' style={{ width: 210 }}>
                            {vaccine.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mũi tiêm số:"
                        name='vaccinate_no'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày',
                            }
                        ]}
                    >
                        <Select defaultValue='chọn mũi tiêm' style={{ width: 210 }}>
                            <Option value='1'>1</Option>
                            <Option value='2'>2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ghi chú' name='note'>
                        <TextArea maxLength={100} defaultValue={'as'}></TextArea>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="updateBtn">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}
