import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import http from "../../../../Axios/axios";
import { RiUserAddLine } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import { VscNewFile } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
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
        <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', marginRight: 4, justifyContent:'space-between' }}>
                <Box>
                    <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2,padding:1.5,borderRadius:7, fontWeight:'bold'}} variant="outlined" color="secondary" onClick={() => { navigate('/Teacher/CreateCourse') }} startIcon={<AddIcon />}>
                        Accept All
                    </Button>
                    <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2,padding:1.5,borderRadius:7, fontWeight:'bold'}} variant="contained" color="secondary" onClick={() => { navigate('/Teacher/CreateCourse') }} startIcon={<AddIcon />}>
                        Delete All
                    </Button>
                </Box>
                <Box>
                    <Paper sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2, borderBottom:1 }}>
                        <SearchBar value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                    </Paper>
                </Box>
        </GridToolbarContainer>

    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function Requests({ courses }) {
    const theme = useTheme();
    const navigate = useNavigate()
    const location = useLocation();
    const course = location.state.course
    const [request, setRequest] = React.useState([]);
    const [rows, setRows] = React.useState(request);
    const [loading, setLoading] = React.useState(false);
    
    const [rowModesModel, setRowModesModel] = React.useState({});

    

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    async function getRequests() {
        try {
            setLoading(true)
          const response = await http.get('/course/viewRequests/'+ course._id)
          setRequest(response.data.requests)
          console.log(response.data)
        } catch (e) {
          console.log(e);
        } finally{
            setLoading(false)
        }
      }

      async function acceptRequest(id) {
        try {
          const response = await http.put('/course/acceptRequest/'+ course._id + '/' + id )
          getRequests()
        } catch (e) {
          console.log(e);
        }
      }

      React.useEffect(() => {
        getRequests();
      }, []);

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const columns = [
        { field: 'userName', headerName: 'Name', width: 300 },
        { field: 'email', headerName: 'Email Address', width: 300 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Accept Request',
            width: 230,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<RiUserAddLine style={{color:theme.palette.secondary.main, fontSize:28}}/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={()=>{acceptRequest(id)}} 
                    />
                ];
            },
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Decline Request',
            width: 230,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<RiDeleteBin5Line style={{color:theme.palette.secondary.main, fontSize:28}}/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={()=>{acceptRequest(id)}} 
                    />    
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                marginBottom: 5,
                height: "100vh",
                
                padding: 1,
                '& .actions': {
                    color: theme.palette.secondary.main,
                },
                '& .textPrimary': {
                    color: theme.palette.secondary.main,
                },
            }}
        >
            {loading ? (
        <Box
          sx={{
            backgroundColor: "white",
            height: "80vh",
            width: "160vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader
            color="#1665b5"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
            <DataGrid
                sx={{
                    backgroundColor: theme.palette.primary.background,paddingX:4,'& .MuiDataGrid-cell:hover': {
                        color: theme.palette.secondary.main,
                    },fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2,height: '100vh',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
                }}
                rows={request}
                rowHeight={70}
                columns={columns}
                rowModesModel={rowModesModel}
                processRowUpdate={processRowUpdate}
                getRowId={(row) => row._id}
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
      )}
        </Box>
    );
}