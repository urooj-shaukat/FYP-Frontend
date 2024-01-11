import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Backdrop } from '@mui/material';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import http from '../../../../../Axios/axios'
import { TbEdit } from "react-icons/tb";
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


const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    assigNumber: "Assignment 01",

    size: "720KB",
    uploadDate: randomCreatedDate(),
    dueDate: randomCreatedDate()
  },
];


function EditToolbar(props) {
  const { setRows, setRowModesModel ,courseID } = props;
  const navigate = useNavigate()
  const theme = useTheme();
  const [row, setRow] = React.useState(initialRows);

  const [searched, setSearched] = React.useState("");
  
 
  
  
  const requestSearch = (searchedVal) => {
    const filteredRows = initialRows.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
    
    </>

  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  
};

export default function TestcaseList({testCases , }) {
  const theme = useTheme();
  const navigate = useNavigate()
  
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [courseID , setcourseID] = React.useState(null)
  const [rows, setRows] = React.useState(testCases);
  const [isAssignmentViewed, setAssignmentViewed] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);
  const [newTestCase, setNewTestCase] = React.useState({
    input: '',
    output: '',
    arraySize : null
  });

  // const handleAddTestCaseClick = () => {
  //   setNewTestCase({
  //     input: '',
  //     output: '',
  //   });
  //   setAssignmentViewed(true);
  //   console.log(editRow.Question)
  // };

  // const addNewTestCase = async () => {
  //   // const res = await http.post('/assignment/addTestCase', {
  //   //   questionId: newTestCase.questionId,
  //   //   input: newTestCase.input,
  //   //   output: newTestCase.output,
  //   // });

  //   // if (res.status === 200) {
  //   //   alert('Test Case added successfully');
  //   //   setRows([...rows, res.data]); 
  //   //   setAssignmentViewed(false);
  //   // } else {
  //   //   alert('Error adding Test Case');
  //   // }

  // };

  const handleEditClick = (id) => {
    const rowToEdit = rows.find((row) => row._id === id);
    setEditRow(rowToEdit);
    setAssignmentViewed(true);
  };

  const editTestCase = async (tcId,input,output,arraySize)=>{
    const res = await http.put('/assignment/editTestCase', 
    {
      tcId,input,output,arraySize
    })
 
  if(res.status === 200){
    alert("Test Case updated successfully")
    const updatedRows = rows.map((row) =>
          row._id === tcId ? { ...row, input, output,arraySize } : row
        );
    setRows(updatedRows);
  }
  else{
    alert("Error editing Test Case")
  }
  }

  const handleEditTestCases = async () => {
    console.log("Editing Testcase: \n", editRow);
   await editTestCase(editRow._id,editRow.input,editRow.output,editRow.arraySize)
    setAssignmentViewed(false);
  };

  const handleAssignmentClose = () => setAssignmentViewed(false);

  const handleDelete =async(id) =>{
    try{
      const res = await http.delete(`/assignment/deleteTestCase/${id}`)
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
 

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //setCourses(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  
  const columns = [
    
    {
      field: 'input',
      headerName: 'Input',
      width: 250,
    },
    {
        field: 'output',
        headerName: 'Output',
        width: 250,
      },
      {
        field: 'arraySize',
        headerName: 'Array Size',
        width: 250
      } ,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
          icon={<TbEdit style={{color:theme.palette.secondary.main,fontSize:25,":hover":{fontSize:30}}}/>}
          label="Edit"
            onClick={() => handleEditClick(id)} 
          />,
          <GridActionsCellItem
          icon={<RiDeleteBin5Line style={{color:theme.palette.secondary.main,fontSize:25,":hover":{fontSize:30}}}/>}
          label="Delete"
            onClick={() => handleDelete(id)}
            />,
          
        ];
      },
    },
  ];

  return (
    <Box sx={{ marginBottom: 2,
       width: "100%" }}>
       
      <DataGrid 
        sx={{
            paddingX:2,backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,

          }, fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2,  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
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
          toolbar: { setRows, setRowModesModel ,courseID },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15, page: 0 },
          },
        }}
        options={{
          search: true
        }}
        // checkboxSelection
        // disableRowSelectionOnClick
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
           <Typography variant="h6">
              {editRow ? 'Edit Test Case' : 'Add Test Case'}
            </Typography>
           
            <FormControl sx={{ marginBottom: 2 }}>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 10,
                  padding: 0,
                  textAlign: 'start',
                  fontWeight: 'bold',
                }}
              >
                Input
              </p>
              <TextField
                id="input"
                value={editRow ? editRow.input : newTestCase.input}
                onChange={(e) =>
                  editRow
                    ? setEditRow({ ...editRow, input: e.target.value })
                    : setNewTestCase({
                        ...newTestCase,
                        input: e.target.value,
                      })
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }}>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 10,
                  padding: 0,
                  textAlign: 'start',
                  fontWeight: 'bold',
                }}
              >
                Output
              </p>
              <TextField
                id="output"
                value={editRow ? editRow.output : newTestCase.output}
                onChange={(e) =>
                  editRow
                    ? setEditRow({ ...editRow, output: e.target.value })
                    : setNewTestCase({
                        ...newTestCase,
                        output: e.target.value,
                      })
                }
              />
            </FormControl>
            {
            editRow?.arraySize != null ?
            <FormControl sx={{ marginBottom: 2 }}>
              <p
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 10,
                  padding: 0,
                  textAlign: 'start',
                  fontWeight: 'bold',
                }}
              >
                Array Size
              </p>
              <TextField
                id="arraySize"
                value={editRow ? editRow.arraySize : newTestCase.arraySize}
                onChange={(e) =>
                  editRow
                    ? setEditRow({ ...editRow, arraySize: e.target.value })
                    : setNewTestCase({
                        ...newTestCase,
                        arraySize: e.target.value,
                      })
                }
              />
            </FormControl>
            :
            <>
            </>
           }
            <Button
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginTop: 2,
                marginBottom: 2,
                padding: 1.5,
                borderRadius: 7,
                fontFamily: 'Nunito, sans-serif',
                width: '40%',
              }}
              variant="contained"
              color="secondary"
              onClick={editRow ? handleEditTestCases : null}
            >
              {editRow ? 'Edit Test Case' : 'Add Test Case'}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
   );
  }