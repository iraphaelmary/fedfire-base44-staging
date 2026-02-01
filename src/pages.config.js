import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ControllerGeneral from './pages/ControllerGeneral';
import Departments from './pages/Departments';
import History from './pages/History';
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import Services from './pages/Services';
import APIExport from './pages/APIExport';
import APIPosts from './pages/APIPosts';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "admin": AdminDashboard,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "Contact": Contact,
    "ControllerGeneral": ControllerGeneral,
    "Departments": Departments,
    "forgot-password": ForgotPassword,
    "History": History,
    "Home": Home,
    "Leadership": Leadership,
    "reset-password": ResetPassword,
    "Services": Services,
    "APIExport": APIExport,
    "APIPosts": APIPosts,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};