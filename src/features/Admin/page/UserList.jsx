import { useState, useEffect } from 'react'
import * as React from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';

const columns = [
    { field: 'id', headerName: 'CMND', width: 120 },
    { field: 'ho_dem', headerName: 'Họ & đệm', width: 170 },
    { field: 'ten', headerName: 'Tên', width: 170 },
    // { field: 'email', headerName: 'Last name', width: 170 },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.cmnd, 'ho_dem') || ''} ${params.getValue(params.cmnd, 'ten') || ''
    //         }`,
    // },
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
                    <DeleteOutline className="deleteBtn" />
                </>
            )
        }
    }
];

const rows = [
    { id: 1, ho_dem: "ajsh", ten: "sfhusb" },
    { id: 2, ho_dem: "ajsh", ten: "sfhusb" }
]


export default function UserList() {
    const [rows1, setRows1] = useState([]);

    useEffect(() => {
        axios('http://localhost/vaccine-manager/api/roles/admin/citizen/read.php')
            .then(res => {
                const { records } = res.data;
                records = {
                    ...records,
                    id: records.indexof(this)
                }
                console.log(records);
                setRows1(records);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])



    return (
        <div className="userList">
            <h1>User List</h1>
            <br />
            <DataGrid
                rows={rows1} disableSelectionOnClick
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div >
    )
}
