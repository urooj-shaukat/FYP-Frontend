import { createTheme } from "@mui/material";

 const newtheme = createTheme({
  palette: {
    primary: {
      main: '#000000', //black
      background: '#FFFFFF' ,//white
      back:'#FFFFFF' //light grey for background
      
    },
    secondary: {
      main: '#f0f0f0', 
      background:'#d90700',//red
      footer:'#1665b5',//blue
      icon:'#fecf03',//yellow
      cardBg:'#93e9c1',
      card1:'#fffceb',
      card2:'#fff3ed',
      card3:'#e5f4fc'
    }
}
})
export default newtheme
