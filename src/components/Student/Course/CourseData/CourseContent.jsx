import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import SearchBar from "@mkyy/mui-search-bar";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { TbEdit } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { VscNewFile } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";
import { FiDownload } from "react-icons/fi";
import http from "../../../../../Axios/axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { randomCreatedDate, randomId } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import newtheme from "../../../../Themenew";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const initialRows = [
  {
    id: randomId(),
    imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
    name: "Amna",
    email: "Amna@gmail.com",
  },
];

export default function Contents({ courses }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course;
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


  useEffect(() => {
    getContents();
  }, []);


  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src="https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png"
          style={{ width: 50, height: 50, borderRadius: "20%" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "lecNo", headerName: "Lecture No", width: 200 },
    { field: "fileType", headerName: "Material", width: 200 },
    {
      field: "uploadedDate",
      headerName: "Date Uploaded",
      width: 230,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 220,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={
              <FiDownload
                style={{
                  color: newtheme.palette.secondary.footer,
                  fontSize: 25,
                  ":hover": { fontSize: 30 },
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={() => {
              navigate("/Teacher/AddCourseContent/" + course._id, {
                state: { course: courses },
              });
            }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        marginBottom: 7,
        minHeight: "100vh",
        width: "100%",

        "& .actions": {
          color: theme.palette.secondary.main,
        },
        "& .textPrimary": {
          color: theme.palette.secondary.main,
        },
      }}
    >
        <p style={{ fontWeight: 'bold', marginBottom: 38, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Lecture Contents</span></p>
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
            backgroundColor: theme.palette.primary.background,
            "& .MuiDataGrid-cell:hover": {
              color: newtheme.palette.secondary.footer
            },
            fontFamily:'Nunito, sans-serif',
            marginTop: 3,
            borderRadius: 2,
            height: "100vh",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          }}
          rows={content}
          rowHeight={70}
          columns={columns}
          rowModesModel={rowModesModel}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row._id}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15, page: 0 },
            },
          }}
          options={{
            search: true,
          }}
          //checkboxSelection
          // disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
