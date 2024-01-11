import http from "./axios";

export const AddAssig = async(
    assignmentNumber,description,uploadDate,dueDate,totalMarks,assignmentFile,format,courseid) => {
        console.log(assignmentFile)
        http.post('/assignment/addAssignment' , {assignmentNumber,description,uploadDate,dueDate,
            totalMarks,assignmentFile,format,courseid})
            .then(
                async  (response)=>{
                    console.log(response);//response data
                    console.log(response.data);//response data
                    console.log(response.status);//Status code
                    console.log(response.statusText);//OK for 200
                    if (response.data.success === false) {
                        return false
                      } else {
                        return true
                      }
                }
            )
            .catch( (error) => {
                console.log(error.response.data);
              });
}



export const delAssignment = async ( assignmentid, courseid ) => {
  console.log(assignmentid)
  console.log(courseid)
  try {
    const response = await http.delete(`/assignment/deleteAssignment/${courseid}/${assignmentid}`);
    console.log(response.data); // Response data
    console.log(response.status); // Status code
    console.log(response.statusText); // OK for 200
  } catch (error) {
    console.log(error.response.data);
  }
};


export const EditAssignment = 
  async (assigId,assignmentNumber,description,uploadDate,dueDate,totalMarks,assignmentFile,format) =>{
      try{
          const response = await http.patch('/assignment/editAssignment' , {
            assigId,assignmentNumber,description,uploadDate,dueDate,totalMarks,assignmentFile,format
          })
          if (response.data.success === false) {
            return false
          } else {
            return true
          }
          console.log(response)
          console.log(response.data)
      }
      catch(error) {
        console.log(error.response.data);
      }
}

