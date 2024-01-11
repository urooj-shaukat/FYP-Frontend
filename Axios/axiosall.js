import { SignalCellularNullRounded } from "@mui/icons-material";
import http from "./axios";


export const Register = async (fullName, email, password, role,profilePic=null,cv=null,userName = null) => {
    var userID
    await http.post("/users/signup",{
      fullName, email, password, role,profilePic
        })
      .then( async  (response)=>{
        console.log(response);//response data
        console.log(response.data);//response data
        
        userID = response.data._id
        console.log( userID )

        console.log(response.status);//Status code
        console.log(response.statusText);//OK for 200
        console.log(response.headers);//Header
          if(role === 'Student'){
            await http.post("/users/signupStudent",{
              userID,userName
              })
            .then((response)=>{
              console.log(response.data);
              //console.log(response.data.success)
              if (response.status != 200) {
                return false
              } else {
                return true
              }
            }).catch( (error) => {
              console.log(error);
            });
          }
          else{
            await http.post("/users/signupTeacher",{
              userID,cv
            })
            .then((response)=>{
              console.log(response.data);
              //console.log(response.data.success)
              if (response.status != 200) {
                return false
              } else {
                return true
              }
            }).catch((error)=>{
              console.log(error);
            });
          }

        })
      .catch( (error) => {
          console.log(error);
        });
        
}

export const login = async (email, password) => {

  try {
  const response = await http.post("/users/signin", {email,password})

    console.log(response.data)
    const student = response.data?.Student?.userID.role

    if(response.status === 200 && response.data.teacher?.user.role == "Teacher") {
      localStorage.setItem("User", JSON.stringify(response.data.teacher));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedIn" , true)
      window.location.href = '/Teacher/Dashboard'
    }
    else if(response.status === 200 && student == "Student"){
      localStorage.setItem("User", JSON.stringify(response.data.Student));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedIn" , true)
      window.location.href = '/Student/Home'
    }
    else{
      alert("login error");
    }

      
    } catch (error) {
      alert(error.response.data.message); 
  }
};

export const getProfile = async () => {

  try {
  const response = await http.get("/users/ViewProfile")

   return response.data

      
    } catch (error) {
      alert(error.response.data.message); 
      return null
  }
};


export const updateProfile = async (
  userName = null, fullName, email, profilePic=null, cv=null
  ) => {
    console.log(profilePic)
  await http.put("/users/UpdateProfile",{
    userName, fullName, email,  profilePic, cv
      })
    .then( async  (response)=>{
     
      console.log(response.data);//response data
      
     

      })
    .catch( (error) => {
        console.log(error);
      });
      
}



export const loginStudent = async (email) => {


  try {
    const response = await http.post('/users/login', { email });

    // localStorage.setItem("Name" , response.data.studentName)
    // localStorage.setItem("LoggedIn" , true)
    
    // return true;
    console.log(response.data)
    localStorage.setItem("User", JSON.stringify(response.data.Student));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedIn" , true)
      window.location.href = '/Student/Home'


  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'Not Authorized No Token.') {
        const errorMessage = error.response.data.message + ' Please Login First';
        alert(errorMessage);
        window.location.href = '/';
      } else if (error.response.data.message === 'UnAuthorized Token.') {
        const errorMessage = "You don't have access to this page.";
        alert(errorMessage);
        window.location.href = '/Home';
      } else {
        alert(error.response.data.message);
      }
    } else {
      alert(error.response.data.message);
    }
    
    return null; 
  }
}