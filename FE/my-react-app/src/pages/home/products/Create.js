import {Field, Form, Formik} from 'formik';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addProduct} from "../../../services/productService";

export function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = (product) => {
        dispatch(addProduct(product)).then(() => {
            navigate('/home');
        });
    }
    return (
        <div>
            <h1>Đây là trang tạo</h1>
            <Formik
                initialValues={{name: '', price: '', quantity: '', category: '1', image: ''}}
                onSubmit={(values) => {
                    submit(values)
                }}
            >
                <Form>
                    <Field type="text" name="name" placeholder="Name"/>
                    <Field type="number" name="price" placeholder="Price"/>
                    <Field type="number" name="quantity" placeholder="Quantity"/>
                    <Field type="text" name="image" placeholder="Image"/>
                    <Field as="select" name="category" >
                        <option type='number' value="1">Bánh</option>
                        <option type='number' value="2">Kẹo</option>
                    </Field>
                    <button type='submit'>Nhập</button>
                </Form>
            </Formik>
        </div>
    );
}