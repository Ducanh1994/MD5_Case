import {Link, useNavigate} from "react-router-dom";
import {Form, Formik, Field} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../services/userService";
import Path from "../../constant/Path";


export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = (user) => {
        dispatch(login(user)).then(() => {
            navigate('/home');
        });
    }

    return (
        <>
            <center>
                <h3>Trang Đăng Nhập</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}

                    onSubmit={values => {
                        submit(values);
                    }}
                >
                    <Form>
                        <Field type="text" placeholder='Username' name='username'/>
                        <Field type="text" placeholder='Password' name='password'/>
                        <Link to={Path.REGISTER}>Đăng ký ngay?</Link>
                        <button type='submit'>Đăng nhập</button>
                    </Form>
                </Formik>
            </center>

        </>
    )
}