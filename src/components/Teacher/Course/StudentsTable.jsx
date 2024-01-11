import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';


const initialRows = [
    {
        id: randomId(),
        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        name: "Amna",
        email: "Amna@gmail.com",
    },
    {
        id: randomId(),
        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        name: "Ahmed",
        email: "Ahmed@gmail.com",
    },

];


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const navigate = useNavigate()
    const theme = useTheme();
    const [row, setRow] = React.useState(initialRows);
    const [searched, setSearched] = React.useState("");

    const requestSearch = (searchedVal) => {
        const filteredRows = initialRows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 4 }}>
            <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2, padding:1.5,borderRadius:7  }} variant="contained" color="secondary" onClick={() => { navigate('/Teacher/StudentRequests') }} startIcon={<AddIcon />}>
                Add Students
            </Button>
            <Paper sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2, borderBottom:1 }}>
                <SearchBar value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
            </Paper>
        </GridToolbarContainer>

    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function Students() {
    const theme = useTheme();
    const navigate = useNavigate()
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const columns = [
        {
            field: 'imageUrl', headerName: 'Avatar', renderCell: (params) => (
                <img src={params.row.imageUrl} style={{ width: 50, borderRadius: '50%' }} />
            )
        },
        { field: 'name', headerName: 'Name', width: 300, flex: 1, },
        { field: 'email', headerName: 'Email', width: 300, flex: 1, },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Status',
            flex: 1,
            cellClassName: 'actions',
            getActions: () => {
                return [
                    <Button sx={{color:"#03ac13" ,padding:1,borderRadius:6, borderColor:'#03ac13', ":hover":{border:'4px solid #03ac13'}}} variant="outlined"  startIcon={<FileDownloadDoneIcon sx={{color:'#03ac13'}}/>}>Enrolled</Button>
                ];
            },
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Remove',
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Button sx={{ backgroundColor: "red",padding:1,borderRadius:6, ":hover":{backgroundColor:"red", border:'4px solid red'}}} variant="contained"  onClick={handleDeleteClick(id)} startIcon={<DeleteIcon sx={{color:'white'}} />}>Remove</Button>
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                marginBottom: 5,
                display:'flex',
                height:'100vh',
                padding: 1,
                '& .actions': {
                    color: theme.palette.secondary.main,
                },
                '& .textPrimary': {
                    color: theme.palette.secondary.main,
                },
            }}
        >
            <DataGrid
                sx={{
                    backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
                        color: theme.palette.secondary.main,
                    },fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2, height:'100vh',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
                }}
                rows={rows}
                rowHeight={70}
                columns={columns}
                rowModesModel={rowModesModel}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 15, page: 0 },
                    },
                }}
            />
        </Box>
    );
}