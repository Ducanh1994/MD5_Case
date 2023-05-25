import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteProduct,getProduct} from "../../../services/productService";
import {Link} from "react-router-dom";

export function List() {
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        return state.products.list;
    })

    useEffect(() => {
        dispatch(getProduct());
    }, [])
    return (
        <>
            <table border={1}>
                <thead><tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Category</td>
                </tr>
                </thead>
                <tbody>
                {
                    products.length > 0 ? products.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}$</td>
                                <td>{item.quantity}</td>
                                <td>{item.category.name}</td>
                                <td><button onClick={()=>dispatch(deleteProduct(item.id))}>Delete</button></td>
                                <td><Link to={`/home/edit/${item.id}`}>Edit</Link></td>
                            </tr>
                        )
                    ): <tr><td colSpan="7">Loading</td></tr>
                }
                </tbody>
            </table>
        </>
    )
}