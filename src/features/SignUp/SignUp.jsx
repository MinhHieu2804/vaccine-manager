import { React, useState } from "react";
import '../SignUp/SignUp.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { Alert } from 'antd';


function SignUp() {
    const [Check, setCheck] = useState(false);

    const onFinish = (values) => {
        const URL = 'http://localhost/vaccine-manager/api/roles/user/create_user.php';
        axios.post(URL, JSON.stringify(values))
            .then(res => {
                console.log(res);
                if (res.data.message === "User was created.") {
                    setCheck(true);
                }
                else {
                    alert("Số điện thoại đã được đăng ký!")
                }
            },
                err => {
                    console.log(err);
                })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Loi dien form:', errorInfo);
    };

    return (
        <div className="login">
            <div className="loginForm">
                <div className="aside">
                    <img src="https://img.freepik.com/free-vector/medications-first-aid-kit_24640-73830.jpg?size=338&ext=jpg" alt="aside "></img>
                </div>
                <div className="mainForm">
                    <h1>Sign Up</h1>
                    <Alert message="Đăng ký thành công!" type="success" style={{ display: Check ? 'block' : 'none' }} />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="myForm"
                    >
                        <Form.Item
                            label="Họ & đệm"
                            name="ho_dem"
                            rules={[{ required: true, message: 'Please fill this field' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Please fill this field' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input pattern="(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="pwd"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                title="Mật khẩu cần có ít nhất 8 ký tự gồm chữ hoa chữ thường và số!" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="loginBtn">
                                Sign Up
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <div className="signUpLink">
                                <Link to='/login'>Log In</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );

}
export default SignUp;