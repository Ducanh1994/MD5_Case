import {Link,useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function NavBar() {
    let navigate = useNavigate();
    const user = useSelector((state) => {
        return state.user.currentUser
    })
    return (
        <>
            <Link to='/home'>Trang chủ</Link> |
            <Link to='/home/create'>Them moi</Link>
            <hr/>
            User: {user && user.username}
            <hr/>
            <button onClick={() => {
                localStorage.clear()
                navigate('/login')
            }}>
                Đăng xuất
            </button>
            <hr/>
        </>
    )
}