import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import {TbReportAnalytics} from "react-icons/tb";
import {SiCoursera} from "react-icons/si";
import {IoIosCreate} from "react-icons/io";
import {LuView} from "react-icons/lu";
import {PiStudent} from "react-icons/pi";
import {RiCodeView} from "react-icons/ri";
import {CgAdd} from "react-icons/cg";
import {AiOutlineFundView} from "react-icons/ai";
import {MdOutlineAssignment} from "react-icons/md";
import {GiMoebiusStar} from "react-icons/gi";
import {SlPeople} from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import {RxDashboard} from "react-icons/rx";

import sidebarBg from "../../assets/bg1.jpg";
import '../../style.scss'

const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const navigate = useNavigate()
  return (
    <ProSidebar className="sidebar" style={{marginLeft:8,marginTop:8,marginBottom:8, border:'6px solid #1665b5', borderRadius:20.5}}
      // image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
     breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader style={{borderRadius:50}}>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight size={18} />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 25,
                  letterSpacing: "1px",
                }}
              >
                ProGrade
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem style={{fontSize:17}} onClick={() => { navigate('/Teacher/Dashboard') }}
            icon={<RxDashboard size={20} />}
            suffix={<span className="badge red">NEW</span>}
          >
            Dashboard
          </MenuItem>
          {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
          <SubMenu style={{fontSize:17}}
            suffix={<span className="badge yellow">3</span>}
            title={"Courses"}
            icon={<SiCoursera size={20} />}
          >
            <MenuItem style={{fontSize:16}} icon={<TbEdit size={20}/>} onClick={() => { navigate('/Teacher/CreateCourse') }}>Create Course</MenuItem>
            <MenuItem style={{fontSize:16}} icon={<LuView size={20}/>} onClick={() => { navigate('/Teacher/CoursesList') }}>View All Courses</MenuItem>
            {/* <MenuItem style={{fontSize:16}} icon={<PiStudent size={20}/>} onClick={() => { navigate('/Teacher/StudentList') }}>Students</MenuItem>
            <MenuItem style={{fontSize:16}} icon={<SlPeople size={20}/>} onClick={() => { navigate('/Teacher/StudentRequests') }}>Requests</MenuItem> */}
          </SubMenu>
          {/* <SubMenu style={{fontSize:17}} title={"Assignments"} icon={<RiCodeView size={22}/>}>
            <SubMenu style={{fontSize:16}} icon={<CgAdd size={20}/>} title={"Add Assignment"}>
              <MenuItem style={{fontSize:15}} icon={<FaRegLaughWink />}>Submenu 3.1 </MenuItem>
              <MenuItem style={{fontSize:15}} icon={<FaRegLaughWink />}>Submenu 3.2 </MenuItem>
            </SubMenu>
            <MenuItem style={{fontSize:16}} icon={<AiOutlineFundView size={20} />}>View All </MenuItem>
            <SubMenu style={{fontSize:15}} icon={<MdOutlineAssignment size={20}/>} title={"Course Assignments"}>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>C++</MenuItem>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>Java</MenuItem>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>Python</MenuItem>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>C Sharp</MenuItem>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>Nasm/Masm</MenuItem>
              <MenuItem style={{fontSize:13}} icon={<FaRegLaughWink />}>C</MenuItem>
            </SubMenu>
          </SubMenu> */}
          
          <SubMenu style={{fontSize:17}}
            suffix={<span className="badge gray">3</span>}
            title={"Grades"}
            icon={<GiMoebiusStar size={22} />}
          >
            <MenuItem style={{fontSize:15}} icon={<FaRegLaughWink size={20} />}>Submenu 1</MenuItem>
            <MenuItem style={{fontSize:15}} icon={<FaRegLaughWink />}>Submenu 2</MenuItem>
            <MenuItem style={{fontSize:15}} icon={<FaRegLaughWink />}>Submenu 3</MenuItem>
          </SubMenu>
          <SubMenu style={{fontSize:17}}
            title={"Reports"}
            icon={<TbReportAnalytics size={22} />}
          >
            <MenuItem  style={{fontSize:15}} icon={<SiGoogleclassroom fontSize={20} />} onClick={() => { navigate('/Teacher/ClassGradeReport') }} >Class Grade Report</MenuItem>
            <MenuItem style={{fontSize:15}} icon={<PiStudentFill fontSize={20}/>} onClick={() => { navigate('/Teacher/StudentCourseReport') }}>Student Report</MenuItem>
          </SubMenu>
          {/* <MenuItem icon={<TbReportAnalytics size={20} />} style={{fontSize:17}}>Reports</MenuItem> */}
          
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: "center",borderRadius:50 }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }} onClick={() => { navigate('/Teacher/Profile') }}>
        <div
            className="sidebar-btn"
            style={{ cursor: 'pointer' }}
            onClick={()=>  navigate('/Teacher/Profile')}
          >
            <FaUser size={20} style={{color:'white'}} />
            <span style={{marginLeft:15, color:'white', fontSize:15}}>My Account</span>
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
