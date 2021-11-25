import React, { useState, useEffect } from 'react'
import './edituser.css';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditUser() {
    const { Option } = Select;
    const userID = useParams();
    const [provinces, setprovinces] = useState([]);
    const [district, setdistrict] = useState([{ name: "Vui lòng chọn thành phố" }]);
    const [ward, setward] = useState([{ name: "Vui lòng chọn Quận/Huyện" }]);
    const [user, setuser] = useState([])
    const [form] = Form.useForm();
    const [check, setcheck] = useState(false);
    const [location, setlocation] = useState([])

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

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/citizen/read_one.php?id=' + userID.userId)
            .then(res => {
                console.log(res.data);
                setuser(res.data);
                axios.post('http://localhost/vaccine-manager/api/roles/admin/ward/read_one.php?id=' + res.data.ward_id)
                    .then(res => {
                        setlocation(res.data);
                    })
            })
    }, [userID])

    var pro = "";
    var dis = "";
    for (let i = 0; i < provinces.length; i++) {
        if (provinces[i].key === location.province_id) {
            pro = provinces[i].name;
        }
    }

    form.setFieldsValue({
        ho_dem: user.ho_dem,
        ten: user.ten,
        cccd: user.cccd,
        phone_number: user.phone_number,
        email: user.email,
        //birthday: "0000-00-00",
        ward_id: location.name
    });


    const onFinish = (values) => {
        values = {
            ...values,
            birthday: values.birthday._d.toISOString(),
            address: "",
            id: userID.userId
        }
        console.log('Success:', values);
        setcheck(true);
        axios.post("http://localhost/vaccine-manager/api/roles/admin/citizen/update.php", JSON.stringify(values))
            .then(res => {
                console.log(res);
            });

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="editUser">
            <h1>Edit User {userID.userId} </h1>
            <div className="editorWrapper">
                <Form
                    form={form}
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
                >
                    <Form.Item><Alert message="Update mới thành công!" type="success" style={{ display: check ? 'block' : 'none' }} className="alert" /></Form.Item>

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
                    <Form.Item
                        label="Số điện thoại"
                        name="phone_number"
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
                    <Form.Item label="Ngày sinh"
                        name="birthday"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày',
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item >
                    <Form.Item label="Thành phố" name="province">
                        <Select defaultValue={pro} style={{ width: 210 }} onChange={handleChange}>
                            {
                                provinces.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quận/Huyện" name='district' >
                        <Select style={{ width: 210 }} onChange={handleChangeD}>
                            {
                                district.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Xã" name='ward_id' id="wardField" >
                        <Select style={{ width: 210 }}>
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