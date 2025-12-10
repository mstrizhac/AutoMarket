import {BrowserRouter, Route, Routes} from "react-router-dom";
import styles from "../../App.module.css";
import MainLayout from "./MainLayout.jsx";
import React, {Suspense} from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

const Home = React.lazy(() => import("../../pages/Home/Home.jsx"));
const About = React.lazy(() => import("../../pages/About/About.jsx"));
const AddListing = React.lazy(() => import("../../pages/AddListing/AddListing.jsx"));
const Contact = React.lazy(() => import("../../pages/Contact/Contact.jsx"));
const Profile = React.lazy(() => import("../../pages/Profile/Profile.jsx"));
const Auth = React.lazy(() => import("../../pages/Login/Auth.jsx"));

const PageLoader = () => {
    <div>
        Loading...
    </div>
};

export default function AppRoutes() {
    return (
        <BrowserRouter className={styles.app}>
            <Suspense fallback={<PageLoader />}/>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="" index element={<Home/>}/>
                    <Route path="add-listing" element={<ProtectedRoute element={<AddListing/>}/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                    <Route path="login" element={<Auth type="login"/>}/>
                    <Route path="register" element={<Auth type="register"/>}/>
                    <Route path="profile" element={<ProtectedRoute element={<Profile/>}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}