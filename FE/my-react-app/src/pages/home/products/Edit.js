import {Field, Form, Formik} from "formik";
import {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {editProduct, findProductById} from "../../../services/productService";
import {useDispatch, useSelector} from "react-redux";


export function Edit() {
    let {id} = useParams();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const product = useSelector(({products}) => {
        return products.list;
    });

    useEffect(() => {
        console.log(product.list)
        dispatch(findProductById(id))
    }, [])

    return <>
        <h1>Đây là trang Edit</h1>
        {product.category &&
            <Formik
                initialValues={product}
                onSubmit={(values) => {
                    dispatch(editProduct({
                        id: id,
                        product: values
                    })).then(()=> {
                        navigate('/home')
                    })

                }}
                enableReinitialize={true}
            >
                <Form>
                    <Field type="text" name="name" defaultValue={product.name}/>
                    <Field type="number" name="price" defaultValue={product.price}/>
                    <Field type="number" name="quantity" defaultValue={product.quantity}/>
                    <Field type="text" name="image" defaultValue={product.image}/>
                    <Field as="select" name="category" defaultValue={product.category.id}>
                        <option value="1">Bánh</option>
                        <option value="2">Kẹo</option>
                    </Field>
                    <button type='submit'>Nhập</button>
                </Form>
            </Formik>
        }
    </>
}