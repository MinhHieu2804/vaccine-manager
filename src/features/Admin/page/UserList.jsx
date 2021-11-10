import { React, useState, useEffect } from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'First name', width: 170 },
    { field: 'email', headerName: 'Last name', width: 170 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 170,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
    },
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



export default function UserList() {
    const [rows1, setRows1] = useState([]);

    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setRows1(res.data);
                console.log(res.data);
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