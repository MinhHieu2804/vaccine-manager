import { React, useState, useEffect } from 'react'
import { Statistic, Row, Col } from 'antd';
import './home.css';
import axios from 'axios';

export default function Home() {
    const [user, setUser] = useState(0);
    const [vaccination, setVaccination] = useState(0);
    const [center, setCenter] = useState(0);

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

    useEffect(() => {
        axios('http://localhost/vaccine-manager/api/roles/admin/vaccination/read_vaccinations.php')
            .then(res => {
                const { records } = res.data;
                setVaccination(records.length);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])

    useEffect(() => {
        axios('http://localhost/vaccine-manager/api/roles/admin/health_center/read.php')
            .then(res => {
                const { records } = res.data;
                setCenter(records.length);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])

    return (
        <div className="home">
            <h1>Home page</h1>
            <div className="feature">
                <div className="featureItem">
                    <h6 style={{ margin: "10px", color: "gray" }}>Số người dùng</h6>
                    <div className="statis">
                        <h1 style={{ position: "relative", left: "100px", color: "#0e9668", fontSize: "100px" }} >{user}</h1>
                    </div>
                </div>
                <div className="featureItem">
                    <h6 style={{ margin: "10px", color: "gray" }}>Số mũi tiêm</h6>
                    <div className="statis">
                        <h1 style={{ position: "relative", left: "100px", color: "#0e9668", fontSize: "100px" }} >{vaccination}</h1>
                    </div>
                </div>
                <div className="featureItem">
                    <h6 style={{ margin: "10px", color: "gray" }}>Số cơ sở tiêm chủng</h6>
                    <div className="statis">
                        <h1 style={{ position: "relative", left: "130px", color: "#0e9668", fontSize: "100px" }} >{center}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
