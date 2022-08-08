import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { CategoryPost, GetCategory, DeleteCategory, DeleteAltCategory } from "../api";
import './catgr.css'

const Category = () => {

    const formik = useFormik({
        initialValues: {
            Category: '',
            TopMenu: 0,
        },

        onSubmit: async (values) => {
            let data = await CategoryPost(values)
        }
    })

    const { isLoading, error, data } = useQuery("catgo", GetCategory);
    const [category, setCategory] = useState(data);


    useEffect(() => {
        setCategory(data)

    }, [data])


    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;


    const Remove = (id) => {
        let RemoveCategory = data.find((item) => {
            return item.id === id;
        });

        if (RemoveCategory.TopMenu === 0) {
            let findTopMenu = data.filter(item => {
                return item.TopMenu === RemoveCategory.id;
            })
            DeleteCategory(id)
            DeleteAltCategory(findTopMenu)
        } else {
            DeleteCategory(id)
        }


    };



    return (
        <div id="cat">
            <section>

                <h1>Category List</h1>
                <div className="tbl-header">
                    <table border="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Catagory name</th>
                                <th>TopMenu</th>
                                <th>
                                    <div>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Add
                                        </button>


                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="input-group mb-3">
                                                                <input type="text" className="form-control" placeholder="Category Name" aria-label="Text input with dropdown button" name="Category" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Category} />



                                                                <select className="form-select" name="TopMenu" aria-label="Default select example" onChange={formik.handleChange}>
                                                                    <option value="0">Ust kateqori</option>

                                                                    {data.map((item, i) => (
                                                                        <option value={item.id} key={i}>{item.Category}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-primary"data-bs-dismiss="modal" >Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </th>


                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table border="0">
                        <tbody>
                            {category &&
                                category.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.Category}</td>
                                        <td>{item.TopMenu == 0 && <p>Ust Kateqoriyadir</p>}
                                            {item.TopMenu !== 0 && <p>ALT Kateqoriyadir</p>}
                                        </td>
                                        <td>
                                            <button className="btn btn-warning">Edit</button>
                                            <button className="btn btn-danger ms-2" onClick={() => { Remove(item.id) }}  >Delete</button>
                                        </td>

                                    </tr>

                                ))}

                        </tbody>
                    </table>
                </div>
            </section>








        </div>
    );
};

export default Category;