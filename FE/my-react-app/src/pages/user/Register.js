import {Link} from "react-router-dom";
import Path from "../../constant/Path";

export function Register() {
    return (
        <>
            <center>
                <h3>Trang Đăng Ký</h3>
                <input type="text" placeholder='Username' name='username'/>
                <input type="text" placeholder='Password' name='password'/>
                <Link to={Path.LOGIN}>Đăng nhập ngay?</Link>
                <button>Đăng ký</button>
            </center>

        </>
    )
}