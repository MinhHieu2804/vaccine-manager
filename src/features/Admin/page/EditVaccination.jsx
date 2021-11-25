import React, { useState, useEffect } from 'react'
import './edituser.css';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextArea from 'rc-textarea';
import moment from 'moment'

export default function EditVaccination() {
    const { Option } = Select;
    const { vacId } = useParams();
    const [vaccine, setvaccine] = useState([]);
    const [centers, setcenters] = useState([]);
    const [check, setcheck] = useState(false);
    const [vaccination, setvaccination] = useState({});
    const [form] = Form.useForm();


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

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccination/read_one_vaccination.php?id=' + vacId)
            .then(res => {
                setvaccination(res.data);
            },
                err => {
                    console.log(err);
                })
    }, [])

    form.setFieldsValue({
        cccd: vaccination.cccd,
        date: moment(vaccination.date),
        note: vaccination.note,
        health_center_id: vaccination.health_center_id,
        vaccine_id: vaccination.vaccine_id,
        vaccinate_no: vaccination.vaccinate_no
    });


    const onFinish = (values) => {
        values = {
            ...values,
            date: values.date._d.toISOString(),
            id: vacId
        }
        setcheck(true);
        console.log(values);
        axios.post('http://localhost/vaccine-manager/api/roles/admin/vaccination/update_vaccination.php', JSON.stringify(values))
            .then(res => {
                console.log(res);
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="editUser">
            <h1>Edit Vaccination {vacId}</h1>
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
                    form={form}
                >
                    <Form.Item><Alert message="Update thành công!" type="success" style={{ display: check ? 'block' : 'none' }} className="alert" /></Form.Item>
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
                                message: 'Vui lòng chọn cơ sở',
                            }
                        ]}>
                        <Select defaultValue='--chọn cơ sở--' style={{ width: 210 }}>
                            {centers.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Loại Vaccine"
                        name='vaccine_id'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn vaccine',
                            }
                        ]}>
                        <Select defaultValue='--chọn loại vaccine--' style={{ width: 210 }}>
                            {vaccine.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mũi tiêm số:"
                        name='vaccinate_no'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn muix tiêm',
                            }
                        ]}>
                        <Select defaultValue='chọn mũi tiêm' style={{ width: 210 }}>
                            <Option value='1'>1</Option>
                            <Option value='2'>2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ghi chú' name='note'>
                        <TextArea maxLength={100}></TextArea>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="updateBtn">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}
