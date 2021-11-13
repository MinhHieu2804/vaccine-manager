import { React, useState, useEffect } from 'react'
import { Statistic, Row, Col } from 'antd';
import './home.css';
import axios from 'axios';

export default function Home() {
    const [user, setUser] = useState(0);

    useEffect(() => {
        axios('http://localhost/vaccine-manager/api/roles/admin/citizen/read.php')
            .then(res => {
                const { records } = res.data;
                setUser(records.length);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])

    return (
        <div className="home">
            <h1>Home page</h1>
            <div className="activeUser">
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Active Users" value={user} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
