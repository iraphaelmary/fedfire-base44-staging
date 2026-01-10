import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import ControllerGeneral from './pages/ControllerGeneral';
import Services from './pages/Services';
import Departments from './pages/Departments';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "History": History,
    "ControllerGeneral": ControllerGeneral,
    "Services": Services,
    "Departments": Departments,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};