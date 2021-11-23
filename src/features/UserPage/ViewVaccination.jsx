import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './viewVaccination.css';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'reactstrap';

function ViewVaccination(props) {

    const [rows, setrows] = useState([])

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