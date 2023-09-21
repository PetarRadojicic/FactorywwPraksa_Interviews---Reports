import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login/Login";
import { UsersPanel } from "../pages/UsersPanel/UsersPanel";
import { UserPanel } from "../pages/UserPanel/UserPanel";
import { AdminPanel } from "../pages/AdminPanel/AdminPanel";
import { Footer} from "../components/Footer/Footer"
import { Header} from "../components/Header/Header"

export const Router = () => {

    return <>
    {/* Header and Footer components should be in app given how they have nothing to do with routing  */}
        <Header /> 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UsersPanel" element={<UsersPanel />} />
                <Route path="/UserPanel/:id" element={<UserPanel/>} />
                <Route path="/AdminPanel" element={<AdminPanel/>} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </>
}