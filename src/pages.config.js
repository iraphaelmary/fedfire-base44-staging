import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ControllerGeneral from './pages/ControllerGeneral';
import Departments from './pages/Departments';
import History from './pages/History';
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import Services from './pages/Services';
import AdminDashboard from './pages/AdminDashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "Contact": Contact,
    "ControllerGeneral": ControllerGeneral,
    "Departments": Departments,
    "History": History,
    "Home": Home,
    "Leadership": Leadership,
    "Services": Services,
    "AdminDashboard": AdminDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};