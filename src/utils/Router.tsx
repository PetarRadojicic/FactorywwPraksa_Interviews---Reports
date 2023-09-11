import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { UserPanel } from "../pages/UserPanel/UserPanel";


export const Router = () => {

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UserPanel" element={<UserPanel />} />
            </Routes>
        </BrowserRouter>
    </>
}