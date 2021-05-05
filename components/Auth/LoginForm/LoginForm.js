import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react"
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {toast} from "react-toastify"
import useAuth from "../../../hooks/useAuth"
import { loginApi } from "../../../api/user"


export default function LoginForm({ settitleModal, onCloseModal}) {

    const [loading, setLoading] = useState(false)

   const {login} = useAuth();
  
   

    const formik = useFormik({
        initialValues : initialValues(),
        validationSchema : Yup.object(validationSchema()),
        onSubmit: async (FormData) => {
            setLoading(true)
            const response =  await loginApi(FormData)
            if(response?.token) {
                login(response.token)
                onCloseModal()
            } else {
                toast.error("Error al registrar el usuario")
            }
         
            setLoading(false)

        }
        
    })

    const resetPaswword = () => {
        formik.setErrors({})
        const validateEmail = Yup.string().email().required()

        if(!validateEmail.isValidSync(formik.values.email))
        {
            formik.setErrors({email: true})

        } else {
            resetPasswordApi(formik.values.email)
        }

    }

    return (
       <Form className="login-form" onSubmit={formik.handleSubmit}>

           <Form.Input 
                name="email"
                type="text"
                placeholder="Correro electronico"
                onChange= {formik.handleChange}
                error= {formik.errors.email}
           />
            <Form.Input 
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange= {formik.handleChange}
                error= {formik.errors.password}
           />

           <div className="actions">
              
               <div>
                   <Button className="submit" type="submit" loading={loading}>Iniciar sesión</Button>
               </div>
             
           </div>
       </Form>
    )
}

function initialValues() {
    return {
        email: "",
        password:""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required("El correo es obligatorio"),
        password: Yup.string().required("El password es obligatorio")
    }
}
