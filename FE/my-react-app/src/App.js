import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./pages/user/Login";
import {Register} from "./pages/user/Register";
import {Home} from "./pages/home/Home";
import {List} from "./pages/home/products/List";
import {Create} from "./pages/home/products/Create";
import Path from "./constant/Path";
import {Edit} from "./pages/home/products/Edit";
import {useSelector} from "react-redux";


function App() {
    let user = useSelector(({user}) => {
        return user.currentUser;
    })
    return (
        <>
            <Routes>
                <Route path={Path.LOGIN} element={<Login/>}/>
                <Route path={Path.REGISTER} element={<Register/>}/>
                {user ?
                    <>
                        <Route path={Path.HOME} element={<Home/>}>
                        <Route path='' element={<List/>}/>
                        <Route path='create' element={<Create/>}/>
                        <Route path='edit/:id' element={<Edit/>}/>
                    </Route>
                    </>
                    :
                    <>
                        <Route path="*" element={<Navigate to="/login"/>}/>
                    </>
                }

            </Routes>
        </>
    );
}

export default App;