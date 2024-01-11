import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import {DataGrid, GridToolbarContainer, GridActionsCellItem} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { VscNewFile } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Paper } from '@mui/material';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import http from "../../../../Axios/axios";
import BeatLoader from "react-spinners/BeatLoader";

function EditToolbar(props, courses) {
  const { setRows, setRowModesModel } = props;
  const navigate = useNavigate()
  const location = useLocation();
  const theme = useTheme();
  const course = location.state.course
  const [row, setRow] = React.useState(course.courseContent);
  const [searched, setSearched] = React.useState("");

  //console.log(course.courseContent)

  const requestSearch = (searchedVal) => {
    const filteredRows = row.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRow(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 4 }}>
      <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2, padding:1.5,borderRadius:7  }} variant="contained" color="secondary" onClick={() => {
        navigate("/Teacher/AddCourseContent/" + course._id, {
          state: { course: course },
        });
      }} startIcon={<VscNewFile style={{fontSize:25, paddingLeft:5}} />}>
        Add lectures
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

export default function Contents({ courses }) {
  const theme = useTheme();
  const navigate = useNavigate()
  const location = useLocation();
  const course = location.state.course
  const [content, setContent] = useState([]);
  const [rows, setRows] = React.useState(content);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  async function getContents() {
    try {
      setLoading(true)
      const response = await http.get('/course/viewCourseContentList/' + course._id)
      setContent(response.data.courseContent)
      console.log(response.data)
    } catch (e) {
      console.log(e);
    } finally{
      setLoading(false)
    }
  }

  async function deleteCourseContent(mid) {
    try {
      const response = await http.delete('/course/deleteCourseContent/' + course._id + '/' + mid)
      getContents();
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getContents();
  }, []);


  const columns = [
    {
      field: 'image', headerName: 'Image', width:100, renderCell: (params) => (
        <img src="https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png" style={{ width: 50, height: 50, borderRadius: '20%' }} />
      )
    },
    { field: 'title', headerName: 'Title', width: 200, },
    { field: 'lecNo', headerName: 'Lecture No', width: 200 },
    { field: 'fileType', headerName: 'Material', width: 200 },
    {
      field: 'uploadedDate',
      headerName: 'Date Uploaded',
      width: 230,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<TbEdit style={{color:theme.palette.secondary.main, fontSize:25,":hover":{fontSize:30}}}/>}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              navigate("/Teacher/AddCourseContent/" + course._id, {
                state: { course: courses},
              });
            }} 
          />,
          <GridActionsCellItem
            icon={<RiDeleteBin5Line style={{color:theme.palette.secondary.main,fontSize:25,":hover":{fontSize:30}}}/>}
            label="Delete"
            onClick={() => deleteCourseContent(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        marginBottom: 5,
        height: "100vh",
        width: '100%',

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
        backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
          color: theme.palette.secondary.main,

        }, fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2, height:'100vh', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
      }}
        rows={content}
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
        options={{
          search: true
        }}
      //checkboxSelection
      // disableRowSelectionOnClick
      />
      )}
    </Box>
  );
}