import React, { useState, useEffect } from 'react'
import './edituser.css';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router';

export default function EditUser() {
    const { Option } = Select;
    const userID = useParams();
    const [provinces, setprovinces] = useState([]);
    const [district, setdistrict] = useState([{ name: "Vui lòng chọn thành phố" }]);
    const [ward, setward] = useState([{ name: "Vui lòng chọn Quận/Huyện" }]);

    const handleChange = value => {
        axios.post('http://localhost/vaccine-manager/api/roles/admin/district/read_with_province_id.php?province_id=' + value)
            .then(res => {
                console.log(res);
                const { records } = res.data;
                setdistrict(records);
            })
    }

    const handleChangeD = value => {
        axios.post('http://localhost/vaccine-manager/api/roles/admin/ward/read_with_district_id.php?district_id=' + value)
            .then(res => {
                console.log(res);
                const { records } = res.data;
                setward(records);
            })
    }

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/province/read.php')
            .then(res => {
                const { records } = res.data;
                setprovinces(records);
            });
    }, [])



    const onFinish = (values) => {
        values = {
            ...values,
            dateOfBirth: values.dateOfBirth._d.toLocaleDateString()
        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="editUser">
            <h1>Edit User {userID.userId} </h1>
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
                        label="Họ & đệm"
                        name="ho_dem"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="ten"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số CMND"
                        name="cmnd"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền ô này',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Ngày sinh"
                        name="dateOfBirth"
                    >
                        <DatePicker />
                    </Form.Item >
                    <Form.Item label="Thành phố" name="province">
                        <Select defaultValue='--chọn thành phố--' style={{ width: 210 }} onChange={handleChange}>
                            {
                                provinces.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quận/Huyện" name='district' >
                        <Select defaultValue='--chọn Quận huyện--' style={{ width: 210 }} onChange={handleChangeD}>
                            {
                                district.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Xã" name='ward' >
                        <Select defaultValue='--chọn Xã--' style={{ width: 210 }}>
                            {
                                ward.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
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