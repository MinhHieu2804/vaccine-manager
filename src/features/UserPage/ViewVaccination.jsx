import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './viewVaccination.css';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';

function ViewVaccination(props) {

    const [rows, setrows] = useState([])

    useEffect(() => {
        var data = {
            jwt: localStorage.getItem('jwt'),
            cccd: props.user.cccd
        }
        console.log(JSON.stringify(data));
        axios.post('http://localhost/vaccine-manager/api/roles/user/read_vaccinations.php', JSON.stringify(data))
            .then(res => {
                console.log(res.data);
                const { records } = res.data;
                setrows(records);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, hide: true },
        { field: 'vaccine_name', headerName: 'Tên vaccine', width: 200 },
        { field: 'vaccinate_no', headerName: 'Mũi số', width: 200 },
        { field: 'date', headerName: 'Ngày tiêm', width: 200 },
        { field: 'center_name', headerName: 'Cơ sở tiêm', width: 200 },
        { field: 'note', headerName: 'Ghi chú', width: 300 },
    ];

    return (
        <div className='viewVaccination'>
            <h1>Tra cứu thông tin tiêm chủng</h1>
            <br />
            <DataGrid
                rows={rows} disableSelectionOnClick
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </div>
    );

}

export default ViewVaccination;