import { useState, useEffect } from 'react'
import * as React from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';



export default function Vaccinations() {
    const [rows1, setRows1] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccination/read_vaccinations.php')
            .then(res => {
                const { records } = res.data;
                setRows1(records);
            })
            .catch((err) => {
                console.error("error :", err);
            })
    }, [])

    const handleDelete = (id) => {
        const URL = 'http://localhost/vaccine-manager/api/roles/admin/vaccination/delete_vaccination.php';
        axios.post(URL, { "id": id });
        setRows1(rows1.filter((rec) => rec.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, hide: true },
        { field: 'cccd', headerName: 'Số CMND', width: 150 },
        { field: 'ho_dem', headerName: 'Họ & đệm', width: 170 },
        { field: 'ten', headerName: 'Tên', width: 170 },
        { field: 'vaccine_name', headerName: 'Tên vaccine', width: 170 },
        { field: 'date', headerName: 'Ngày tiêm', width: 170 },
        { field: 'center_name', headerName: 'Cơ sở tiêm', width: 170 },
        { field: 'vaccinate_no', headerName: 'Mũi số', width: 170 },
        { field: 'note', headerName: 'Ghi chú', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/editVaccination/" + params.row.id} className="dirLink">
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
            <h1>Vaccinations</h1>
            <br />
            <DataGrid
                rows={rows1} disableSelectionOnClick
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </div >
    )
}
