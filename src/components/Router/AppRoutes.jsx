import {BrowserRouter, Route, Routes} from "react-router-dom";
import styles from "../../App.module.css";
import MainLayout from "./MainLayout.jsx";
import React, {Suspense} from "react";

const Home = React.lazy(() => import("../../pages/Home/Home.jsx"));
const About = React.lazy(() => import("../../pages/About/About.jsx"));
const AddListing = React.lazy(() => import("../../pages/AddListing/AddListing.jsx"));
const Contact = React.lazy(() => import("../../pages/Contact/Contact.jsx"));

const PageLoader = () => {
    <div>
        Loading...
    </div>
};

export default function AppRoutes(props) {
    return (
        <BrowserRouter className={styles.app}>
            <Suspense fallback={<PageLoader />}/>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="" index element={<Home/>}/>
                    <Route path="add-listing" element={<AddListing/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}