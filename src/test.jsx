import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimilarityResult from './test2';
import storage from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import http from '../Axios/axios';

const FileUploadForm = () => {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [result, setResult] = useState([]);
  const [currQuestion , setCurrQuestion] = useState(null)  
  const [userID, setUserId] = useState(null);
  const [students_for_comparison , setStudents_for_comparison] = useState(null)

  const  { aid } = useParams()


  const fetchStudentIDS = async () =>{
    const res = await http.get(`/assignment/getStudentIds/${aid}`)
    // console.log(res.data.studentInfo)
      const students = res.data.studentInfo.filter(student =>  student.id != userID )
       console.log(students)
       setStudents_for_comparison(students)
  }

  useEffect(() => {
    const userJSON = localStorage.getItem("User");
    const user = JSON.parse(userJSON);
    setUserId(user.userID._id);

    fetchStudentIDS()
  
  }, []);

  const fetchFile_to_be_checked = async (AssignmentID,index, format) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );

      const downloadURL = await getDownloadURL(fileRef);
      //console.log('Download URL:', downloadURL);

      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
     // console.log(`File: ${fileBlob}`);

      const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
        type: fileBlob.type,
        lastModified: new Date().getTime(), 
      });

      setFileA(customFileObject);
    //  console.log('File fetched successfully.');
      
      return customFileObject
    } catch (error) {
      console.error('Error fetching file:', error);
      return null
    }
  };

  const fetchFile_for_comaprison = async (AssignmentID, userID, index, format) => {
  try {
    const fileRef = ref(
      storage,
      `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
    );

    const downloadURL = await getDownloadURL(fileRef);
    //console.log('Download URL:', downloadURL);

    
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const fileBlob = await response.blob();
    const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
      type: fileBlob.type,
      lastModified: new Date().getTime(), 
    });

    setFileB(customFileObject);
    return customFileObject;

  } 
  catch (error) {
    console.error('Error fetching file:', error);
    return null
  }
};
 
  const handleSubmit = async () => {


    
    const assigFormat = '.py';
    const numberOfQuestions = 3;
  
    for (let index = 0; index < numberOfQuestions; index++) {
      setFileA(null);
      const a = await fetchFile_to_be_checked(aid,  index, assigFormat);
      setCurrQuestion(index + 1);
  
      for (let j = 0; j < students_for_comparison.length; j++) {
        try {
          setFileB(null);
         console.log( " Question: " , index + 1);
          console.log("Student Id: " , students_for_comparison[j].id)
          console.log("Student Name: " , students_for_comparison[j].name)
          const b = await fetchFile_for_comaprison(aid, students_for_comparison[j].id, index, assigFormat);
          console.log(a)
          console.log(b)
        
          const formDataB = new FormData();
          formDataB.append('file_a', a);
          formDataB.append('file_b', b);
  
          const responseB = await axios.post('http://127.0.0.1:8000/get_plagiarism', formDataB, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          setResult((prevResult) => [...prevResult, responseB.data]);
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }
    }
  };
  
  

  return (
    <div>
      <Button onClick={handleSubmit} sx={{backgroundColor:'#1665b5',color:'white', fontWeight:'bold', padding:2, borderRadius:10, marginRight:7, fontFamily:'nunito, sans-serif', ":hover":{backgroundColor:'#1665b5',color:'white'}}}>
          Check Plagiarism
      </Button>
          {result.map((res, index) => (
        <div key={index}>
          <pre>
            <SimilarityResult
            similarityPercentage={res['similarity_percentage']}
            fileAContent={res['file_a_content']}
            similarContent={res['similar_content']}
           
          />
          </pre>
        </div>
      ))}
    </div>
  );
};

export default FileUploadForm;
