import React, {useContext} from "react";
import './style.css'
import {useFormik } from "formik";
import validationSchema from "./Validation";
import { LoginAdmin } from "../../api";
import {AuthContext} from "../authContext";
import Swal from 'sweetalert2'

const Login =()=>{
    const{login} =useContext(AuthContext )
    const formik=useFormik({

        initialValues:{
            email:'',
            password:''
        },

        validationSchema,
        onSubmit :async(values, bags)=>{
            console.log(values);
            let responseData = await LoginAdmin(values);
                login(responseData);
                console.log(responseData);


            try {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Welcome',
                    showConfirmButton: false,
                    timer: 1500
                  })
            } catch (e) {
               
                bags.setErrors({ general: 'An error occurred' });
             
            }

        }



    })
    // const {Login} = useContext(AuthContext)

    return(
        <div className="container">
            <div id="signup">
                <div className="signup-screen">
                    <div className="space-bot text-center">
                        <h1> Login </h1>
                        <div className="divider"></div>
                    </div>


                    <form   onSubmit={formik.handleSubmit} className="form-register" method="post"  id="loginform" name="register" >

                      

                        <div className="input-field col s6">
                            <input id="email" type="email" name="email" placeholder="Email" ng-model="email" className={` loginstyle ${formik.touched.email && formik.errors.email && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}    />
                           
                        </div>

                        <div className="input-field col s6">
                            <input id="password" type="password" placeholder="Password" name="password" className={` loginstyle ${formik.touched.password && formik.errors.password && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  />
                         
                        </div>

                        <div className="space-top text-center">
                            <button className="btn btn-dark loginstyle"> L O G I N</button>
                       
                        </div>
                    </form>

                </div>

            </div>
        </div>

    )

}

export default Login