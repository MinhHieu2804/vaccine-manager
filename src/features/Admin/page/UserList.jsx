import { useState, useEffect } from 'react'
import * as React from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';


export default function UserList() {
    const [rows1, setRows1] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/citizen/read.php')
            .then(res => {
                const { records } = res.data;
                setRows1(records);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])

    const handleDelete = (id) => {
        const URL = 'http://localhost/vaccine-manager/api/roles/admin/citizen/delete.php';
        axios.post(URL, { "id": id });
        setRows1(rows1.filter((rec) => rec.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, hide: true },
        { field: 'cccd', headerName: 'Số CMND', width: 150 },
        { field: 'ho_dem', headerName: 'Họ & đệm', width: 170 },
        { field: 'ten', headerName: 'Tên', width: 170 },
        { field: 'email', headerName: 'Email', width: 170 },
        { field: 'birthday', headerName: 'Ngày sinh', width: 170 },
        { field: 'phone_number', headerName: 'Số điện thoại', width: 170 },
        { field: 'province', headerName: 'Thành phố', width: 170, hide: true },
        { field: 'district', headerName: 'Quận huyện', width: 170, hide: true },
        { field: 'address', headerName: 'Địa chỉ', width: 170, hide: true },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/editUser/" + params.row.id} className="dirLink">
                            <Button className="editBtn">Edit</Button>
                        </Link>
                        <DeleteOutline className="deleteBtn" onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        }
    ];


    return (
        <div className="userList">
            <h1>User List</h1>
            <br />
            <DataGrid
                rows={rows1} disableSelectionOnClick
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div >
    )
}
