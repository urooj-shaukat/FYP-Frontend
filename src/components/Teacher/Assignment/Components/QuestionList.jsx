import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Backdrop } from '@mui/material';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import http from '../../../../../Axios/axios';
import { TbEdit } from "react-icons/tb";
import { VscNewFile } from "react-icons/vsc";
import { useParams } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
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
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AiFillDislike, AiFillDollarCircle } from 'react-icons/ai';

const initialRows = [
  
];

function EditToolbar(props) {
  const { setRows, setRowModesModel, courseID, setEditRow } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [searched, setSearched] = React.useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = initialRows.filter((row) => {
      return row.questionDescription.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 4 }}>
      {/* <Paper sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2, borderBottom: 1 }}>
        <SearchBar value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      </Paper> */}
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setEditRow: PropTypes.func.isRequired,
};

export default function QuestionList({ questions , format}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cid, aid } = useParams();

  useEffect(() => {
    console.log('format:', format);
  }, []);


  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = React.useState(questions);
  const [isAssignmentViewed, setAssignmentViewed] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);

  const handleEditClick = (id) => {
    const rowToEdit = rows.find((row) => row._id === id);
    setEditRow(rowToEdit);
    setAssignmentViewed(true);
  };

  const editQuestion = async (qId,questionDescription,questionTotalMarks,isInputArray)=>{
    const res = await http.put('/assignment/editquestion', 
    {
      qId,questionDescription,questionTotalMarks,isInputArray
    })


  if(res.status === 200){
    alert("Question updated successfully")
    const updatedRows = rows.map((row) =>
          row._id === qId ? { ...row, questionDescription, questionTotalMarks, isInputArray } : row
        );
        setRows(updatedRows);
  }
  else{
    alert("Error editing assignment")
  }
  }
  const handleEditQuestion = async () => {
    console.log("Editing question:", editRow);
    await editQuestion(editRow._id,editRow.questionDescription,editRow.questionTotalMarks,editRow.isInputArray)
    setAssignmentViewed(false);
  };
  const handleDelete =async(id) =>{
    try{
      const res = await http.delete(`/assignment/deleteQuestion/${id}`)
      console.log(res)
      if(res.status == 200){
        alert(res.data.success)
      const updatedRows = rows.filter((row) => row._id != id);
      setRows(updatedRows);
      }

    }
    catch (error) {
      console.log(error.response.data);
    }
  }
  const handleAssignmentClose = () => setAssignmentViewed(false);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    {
      field: 'questionDescription',
      headerName: 'Question Description',
      width: 400,
    },
    {
      field: 'isInputArray',
      headerName: 'Is Array',
      width: 250,
    },
    {
      field: 'questionTotalMarks',
      headerName: 'Total Marks',
      width: 220,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 220,
      cellClassName: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<TbEdit style={{ color: theme.palette.secondary.main, fontSize: 25 }} />}
          label="Edit"
          onClick={() => handleEditClick(id)}
        />,
        <GridActionsCellItem
          icon={<RiDeleteBin5Line style={{ color: theme.palette.secondary.main, fontSize: 25 }} />}
          label="Delete"
          onClick={()=> handleDelete(id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ marginBottom: 2, width: "100%", height: '100vh' }}>
           <Button
                sx={{
                  marginLeft: 2,
                  marginRight: 2,
                  marginTop: 2,
                  marginBottom: 2,
                  padding: 1.5,
                  borderRadius: 7,
                  fontFamily: 'Nunito, sans-serif',
                }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate(`/Teacher/EditAddQuestion/${cid}/${aid}` , {state : { format : format}});
                }}
              startIcon={<VscNewFile style={{ fontSize: 25 }} />}
        >
          Add Question
        </Button>
      <DataGrid
        sx={{
          paddingX: 3,paddingY:3, backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,
          }, fontFamily: 'Nunito, sans-serif', marginTop: 3, borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        }}
        rows={rows}
        rowHeight={70}
        columns={columns}
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row._id}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, courseID: null, setEditRow },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15, page: 0 },
          },
        }}
        options={{
          search: true
        }}
      />
      <Modal
        open={isAssignmentViewed}
        onClose={handleAssignmentClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isAssignmentViewed}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              maxWidth: '800px',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              borderRadius: '25px',
            }}
          >
            <Typography variant="h6">Edit Question</Typography>
            <FormControl sx={{ marginBottom: 2 }}>
            <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 10,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  Question Description
                </p>
              <InputLabel htmlFor="question-description"></InputLabel>
              <TextField
                id="question-description"
                value={editRow ? editRow.questionDescription : ''}
                onChange={(e) => setEditRow({ ...editRow, questionDescription: e.target.value })}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }}>
            <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 10,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  Is Array
                </p>
              <InputLabel htmlFor="is-array"></InputLabel>
              <Select
                id="is-array"
                value={editRow ? editRow.isInputArray : ''}
                onChange={(e) => setEditRow({ ...editRow, isInputArray: e.target.value })}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }}>
            <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 0,
                    marginTop: 10,
                    padding: 0,
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  Marks
                </p>
              <InputLabel htmlFor="total-marks"> </InputLabel>
              <TextField
                id="total-marks"
                type="number"
                value={editRow ? editRow.questionTotalMarks : ''}
                onChange={(e) => setEditRow({ ...editRow, questionTotalMarks: e.target.value })}
              />
            </FormControl>
            <Button   sx={{
                  marginLeft: 2,
                  marginRight: 2,
                  marginTop: 2,
                  marginBottom: 2,
                  padding: 1.5,
                  borderRadius: 7,
                  fontFamily: 'Nunito, sans-serif',
                  width:'40%'
                }}
               variant="contained" color="secondary" onClick={handleEditQuestion}>
              Edit Question
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
