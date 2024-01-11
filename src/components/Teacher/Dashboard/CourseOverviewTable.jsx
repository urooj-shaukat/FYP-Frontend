import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";
import SearchBar from "@mkyy/mui-search-bar";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { randomCreatedDate, randomId } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { VscNewFile } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Paper } from "@mui/material";
import http from "../../../../Axios/axios";
import BeatLoader from "react-spinners/BeatLoader";

const initialRows = [
  {
    id: randomId(),
    imageUrl: "https://img.freepik.com/free-icon/snakes_318-368381.jpg",
    name: "Introduction to Computers",
    instructor: "Ayesha Khan",
    creditHours: 4,
    language: "Python",
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const navigate = useNavigate();
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
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 4,
      }}
    >
      
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function CoursesListTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [rows, setRows] = React.useState(courses);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setCourses(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  async function getCourses() {
    const user = JSON.parse(localStorage.getItem("User"));
    console.log(user);
    try {
      setLoading(true);
      const response = await http.get("/course/coursesList/" + user._id);
      setCourses(response.data.courses);
      console.log(response.data.courses);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCourse(id) {
    try {
      const response = await http.delete("/course/deleteCourse/" + id);
      getCourses();
    } catch (e) {
      console.log(e);
    }
  }

  async function updateCourse(id) {
    try {
      const response = await http.patch("/course/updateCourse/" + id);
      const newCourses = rows.filter((item) => item._id !== id);
      console.log(response.data);
      setCourses(newCourses);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      renderCell: (params) => (
        <img
          src={params.row.image}
          style={{ width: 50, height: 50, borderRadius: "30%" }}
          onClick={() => {
            navigate("/Teacher/CourseDetails/" + id, {
              state: { course: courses.find((c) => c._id === id) },
            });
          }}
        />
      ),
    },
    { field: "name", headerName: "Course Name", width: 220 },
    {
      field: "teacher.user.fullName",
      valueGetter: (params) => params.row.teacher.user.fullName,
      headerName: "Instructor",
      width: 150,
    },
    { field: "language", headerName: "Language", width: 120 },
    {
      field: "startingDate",
      headerName: "Started At",
      width: 140,
    },
    {
      field: "endingDate",
      headerName: "Ending At",
      width: 140,
    },
    { field: "creditHours", headerName: "Credit Hours", type: "number" },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 180,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={
              <LuView
                style={{
                  color: theme.palette.secondary.main,
                  fontSize: 25,
                  ":hover": { fontSize: 30 },
                }}
              />
            }
            label="View"
            onClick={() => {
              navigate("/Teacher/CourseDetails/" + id, {
                state: { course: courses.find((c) => c._id === id) },
              });
            }}
          />,
          
        ];
      },
    },
  ];

  return (
    <Box sx={{ marginBottom: 5, height: "83vh", width: "100%" }}>
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
              color: theme.palette.secondary.main,
              
            },

            height: "83vh",
            fontFamily:'Nunito, sans-serif',
                      }}
          rows={courses}
          rowHeight={80}
          columns={columns}
          getRowId={(row) => row._id}
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
              paginationModel: { pageSize: 6, page: 0 },
            },
          }}
          options={{
            search: true,
          }}
        />
      )}
    </Box>
  );
}
