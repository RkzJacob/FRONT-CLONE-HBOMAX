import './register.css'
import {z} from "zod"
import {  SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from './components/inputsForm';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../mutations/mutations';

const schema = z.object({
    nombre_usuario: z.string().min(1,"El nombre se usuario es obligatorio"),
    email: z.string().email("Correo invalido").min(1,"El correo es obligatorio"),
    contrasena: z.string().min(6,"La contraseña debe contener almenos 6 caracteres"),
    confirmPassword: z.string().min(6,"La confirmacion debe tener almenos 6 caracteres")
}).refine(data=>data.contrasena === data.confirmPassword,{
    message: "Las contraseñas son Inválidas",
    path: ['confirmPassword']
})

type FormValues = z.infer<typeof schema>;

export const Register = () =>{
    const [createUser,{loading }] = useMutation(REGISTER_MUTATION);
    const {control,handleSubmit,formState:{errors}} = useForm<FormValues>({
        resolver:zodResolver(schema),
        mode:"onBlur",
        defaultValues:{
            nombre_usuario:"",
            email:"",
            contrasena:"",
            confirmPassword:""
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async (formData) =>{
        try {
            const {data}= await createUser({
                variables: {nombre_usuario: formData.nombre_usuario, email:formData.email,contrasena:formData.confirmPassword },
              });
            console.log("usuario registrado",data)
            
        } catch (error) {
            console.log("usuario no registrado",error)
        }
    }
    return (
        <section className="register">
            <div className="content-register">
                <div className='imagen-register'>
                    <img src="https://imagedelivery.net/_B5aBVMQ4A4ZOSWvxRC5JA/b3b38038-8d78-45d6-037e-64d486381000/1920" alt="Login-imagen" />
                </div>

            </div>
            <div className="register__container">
                <div className='register_container-title'>
                    <h2>REGISTRAR CUENTA</h2>
                </div>
                    <form className="register__form" onSubmit={handleSubmit(onSubmit)} >
                        <div>
                            <i className="fa fa-user"></i>
                            <InputForm name='nombre_usuario' control={control} label='Nombre de usuario' type='string' error={errors.nombre_usuario}/>
                        </div>
                        <div>
                            <i className="fa fa-envelope"></i>
                            <InputForm name='email' control={control} label='Correo Electronico' type='string' error={errors.email}/>
                        </div>
                        <div>
                            <i className="fa fa-lock"></i>
                            <InputForm name='contrasena' control={control} label='Contraseña' type='password' error={errors.contrasena}/>
                        </div>
                        <div>
                            <i className="fa fa-lock"></i>
                            <InputForm name='confirmPassword' control={control} label='Confirmar contraseña' type='password' error={errors.confirmPassword}/>
                        </div>
                        <button className='register__button' type='submit' disabled={loading} >
                            Registrarse
                        </button>
                    </form> 
                </div>
                
        </section>
    )
}