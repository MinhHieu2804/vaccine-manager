import React, { useState, useEffect } from 'react'
import './UserInfo.css';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import moment from 'moment';

export default function UserInfo(props) {
    const { Option } = Select;
    const [provinces, setprovinces] = useState([]);
    const [district, setdistrict] = useState([{ name: "Vui lòng chọn thành phố" }]);
    const [ward, setward] = useState([{ name: "Vui lòng chọn Quận/Huyện" }]);
    const [form] = Form.useForm();
    const [check, setcheck] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState({
        "id": null,
        "name": "-Chọn thành phố-"
    })
    const [selectedDistrict, setSelectedDistrict] = useState({
        "id": null,
        "name": "-Chọn thành phố-"
    })
    const [selectedWard, setSelectedWard] = useState({
        "id": null,
        "name": "-Chọn thành quan huyen-"
    })
    const [location, setlocation] = useState({})

    function handleChange(value) {
        setSelectedProvince({ id: value });
        setSelectedDistrict({ id: null });
        setSelectedWard({ id: null });
        axios.post('http://localhost/vaccine-manager/api/roles/admin/district/read_with_province_id.php?province_id=' + value)
            .then(function (res) {
                const { records } = res.data;
                setdistrict(records);
            })
    }

    const handleChangeD = value => {
        setSelectedDistrict({ id: value });
        setSelectedWard({ id: null });
        axios.post('http://localhost/vaccine-manager/api/roles/admin/ward/read_with_district_id.php?district_id=' + value)
            .then(res => {
                const { records } = res.data;
                setward(records);
            })
    }

    const handleChangeW = value => {
        setSelectedWard({ id: value });
    }

    useEffect(() => {
        // axios.get('http://localhost/vaccine-manager/api/roles/admin/province/read.php')
        //     .then(function (res) {
        //         const { records } = res.data;
        //         setprovinces(records);
        //         axios.get('http://localhost/vaccine-manager/api/roles/admin/ward/read_one.php?id=' + props.user.ward_id)
        //             .then(function (res) {
        //                 console.log(res);
        //                 setlocation(res.data);
        //                 if (res.data.name) {
        //                     fetchinitialLocation();
        //                 }
        //             })
        //     });
        async function fetchData() {
            let [provinces, loca] = await Promise.all([axios.get('http://localhost/vaccine-manager/api/roles/admin/province/read.php'),
            axios.get('http://localhost/vaccine-manager/api/roles/admin/ward/read_one.php?id=' + props.user.ward_id)
            ]);
            await setprovinces(provinces.data.records);
            await setlocation(loca.data);
            if (loca.data.name) {
                await fetchinitialLocation();
            }
            setSelectedWard(loca.data);
        }

        fetchData()
    }, [location.id])

    async function fetchinitialLocation() {
        if (location.proivince_id && location.district_id) {
            let promises = [
                axios.get('http://localhost/vaccine-manager/api/roles/admin/province/read_one.php?id=' + location.proivince_id),
                axios.post('http://localhost/vaccine-manager/api/roles/admin/district/read_with_province_id.php?province_id=' + location.proivince_id),
                axios.get('http://localhost/vaccine-manager/api/roles/admin/district/read_one.php?id=' + location.district_id),
                axios.post('http://localhost/vaccine-manager/api/roles/admin/ward/read_with_district_id.php?district_id=' + location.district_id)
            ];
            const [p1, p2, p3, p4] = await Promise.all(promises);
            setSelectedProvince(p1.data);
            setdistrict(p2.data.records);
            setSelectedDistrict(p3.data);
            setward(p4.data.records);

        }
    }

    form.setFieldsValue({
        ho_dem: props.user.ho_dem,
        ten: props.user.ten,
        cccd: props.user.cccd,
        phone_number: props.user.phone_number,
        email: props.user.email,
        gender: props.user.gender,
        pwd: "",
        province_id: selectedProvince.id ? selectedProvince.id : "Chọn thành phố",
        district_id: selectedDistrict.id ? selectedDistrict.id : "Chọn quận huyện",
        ward_id: selectedWard.id ? selectedWard.id : "Chọn xã",
        birthday: (props.user.birthday) ? moment(props.user.birthday) : null
    });


    const onFinish = (values) => {
        let values2 = {
            ...values,
            birthday: values.birthday._d.toISOString(),
            address: "",
            jwt: localStorage.getItem('jwt')
        }
        console.log('Success:', values2);
        setcheck(true);
        axios.post("http://localhost/vaccine-manager/api/roles/user/update_user.php", JSON.stringify(values2))
            .then(function (res) {
                localStorage.setItem("jwt", res.data.jwt)
                console.log(res);
                console.log(props)
                props.action(values);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="editUser">
            <h1>Khai báo thông tin</h1>
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
                            }
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
                            }
                        ]}
                    >
                        <Input pattern="(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: 'Không đúng định dạng email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="pwd"
                    >
                        <Input.Password pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                            title="Mật khẩu cần có ít nhất 8 ký tự gồm chữ hoa chữ thường và số!" />
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
                    <Form.Item
                        name='gender'
                        label='Giới tính'>
                        <Select style={{ width: 210 }}>
                            <Option value='m'>Nam</Option>
                            <Option value='f'>Nữ</Option>
                            <Option value='d'>Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thành phố" name="province_id">
                        <Select style={{ width: 210 }} onChange={handleChange}>
                            {
                                provinces.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quận/Huyện" name='district_id' >
                        <Select style={{ width: 210 }} onChange={handleChangeD}>
                            {
                                district.map(p => <Option key={p.id}>{p.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Xã" name='ward_id'  >
                        <Select style={{ width: 210 }} onChange={handleChangeW}>
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
                        <Button type="primary" htmlType="submit" className="updateBtn" >
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}