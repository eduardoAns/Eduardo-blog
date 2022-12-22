import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserForm } from '../../interfaces';
import { UserContext } from '../../context/user';


type dataForm = {
    nombre:string;
    apellido:string;
    email:string;
    password:string;
}

const RegisterPage = () => {

const router = useRouter();
const { register, handleSubmit, setError, formState: { errors } } = useForm<dataForm>();
const [showMsg, setShowMsg] = useState(false)
const [msg, setMsg] = useState('')
const [isRegister, setIsRegister] = useState(false)
const { registerUser } = useContext( UserContext );

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);


const crearUsuario = async ({nombre,apellido,email,password}:dataForm) => {
    
    const dataPost:UserForm = {
        nombre,
        apellidoPaterno:apellido,
        email,
        password,
        fechaCreacion:hoy.toDateString(),
        idRol:2,
        estado:'activo',
        descripcion:"usuario activo de este blog",
        sexo:""
    }

    setShowMsg(false);
    const request = await registerUser(dataPost);
    const { hasRegister, message } = request

    if ( request ) {
        setShowMsg(true);
        setMsg(message);
        setIsRegister(hasRegister)
        setTimeout(() => setShowMsg(false), 5000);
        return;
    }
    

}


  return (
    <AuthLayout title={'Registrar'}>
        <form onSubmit={handleSubmit(crearUsuario)}>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>
                <Chip 
                        label={msg}
                        color={isRegister?"success":"error"}
                        className="fadeIn"
                        sx={{display: showMsg? 'flex':'none'}}
                    />
                

                <Grid item xs={12}>
                    <TextField 
                        label="Nombre" 
                        variant="filled" 
                        fullWidth
                        {...register('nombre', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message} 
                        />
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Apellido" 
                        variant="filled" 
                        fullWidth 
                        {...register('apellido', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.apellido}
                        helperText={errors.apellido?.message}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Correo" 
                        type="email"
                        variant="filled" 
                        fullWidth 
                        {...register('email', {
                            required:'Este campo es requerido'
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Contraseña" 
                        type='password' 
                        variant="filled" 
                        fullWidth 
                        {...register('password',{
                            required:'Este campo es requerido',
                            minLength:{value:4, message:'minimo 4 caracteres'}
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        />
                </Grid>

               


                <Grid item xs={12}>
                    <Button 
                        color="secondary" 
                        className='circular-btn' 
                        size='large' 
                        type="submit"
                        fullWidth>
                        Registrar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink 
                        href={ router.query.p ? `/auth/login?p=${ router.query.p }`: '/auth/login' }
                        passHref>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage