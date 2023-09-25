import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login/Login";
import { UsersPanel } from "../pages/UsersPanel/UsersPanel";
import { UserPanel } from "../pages/UserPanel/UserPanel";
import { AdminPanel } from "../pages/AdminPanel/AdminPanel";

export const Router = () => {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UsersPanel" element={<UsersPanel />} />
                <Route path="/UserPanel/:id" element={<UserPanel/>} />
                <Route path="/AdminPanel" element={<AdminPanel/>} />
            </Routes>
        </BrowserRouter>
    </>
}