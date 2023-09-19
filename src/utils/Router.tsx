import { BrowserRouter, Routes, Route } from "react-router-dom";
// we tend to seperate node_modules imports from our local imports
import { Login } from "../pages/Login/Login";
import { UsersPanel } from "../pages/UsersPanel/UsersPanel";
import { UserPanel } from "../pages/UserPanel/UserPanel";
import { AdminPanel } from "../pages/AdminPanel/AdminPanel";
import { Footer} from "../pages/Footer/Footer"
import { Header} from "../pages/Header/Header"

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