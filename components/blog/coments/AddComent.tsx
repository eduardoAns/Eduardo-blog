import { Button, Grid, TextareaAutosize, TextField } from '@mui/material'
import Cookies from 'js-cookie';
import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form';
import blogApi from '../../../api/blogApi';
import { AuthContext } from '../../../context';
import { Coment, User } from '../../../interfaces';

interface dataForm {
  nombre:string;
  contenido:string;
}

interface Props {
  idBlog?:number;
}

const AddComent:FC<Props> = ({idBlog}) => {

  const { register,handleSubmit, formState: { errors } } = useForm<dataForm>();
  const { user } = useContext( AuthContext );



  const crearComentario = async ({nombre,contenido}:dataForm) => {
    
    const Authorization= Cookies.get('token')
    let idUsuario = 0;

    if ( !Authorization ) {
      idUsuario = 6;
    }
    if ( Authorization ) {
      try {
        const { data } = await blogApi.get('/validtoken', {'headers':{'Authorization': Authorization}});
        const user:User = data;
        idUsuario = user.id;
        console.log(idUsuario)
      } catch (error) {
          console.log(error)
      }
    };
    console.log(idUsuario)

    const dataPost:Coment = {
      nombre,
      idPost:idBlog,
      idUser:idUsuario,
      contenido,
      fechaCreacion:new Date(Date.now()).toDateString(),
      estado:'habilitado'
    }

    console.log(dataPost)
    try {
      await blogApi.post('/comentario', dataPost);
      console.log('comentario creado')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={handleSubmit(crearComentario)}>
      <Grid item mt={3} >
          <Grid item xs={12} mb={1}>
              <TextField 
                  label="De :" 
                  variant="filled" 
                  fullWidth 
                  size="small"
                  {...register('nombre', {
                    required:'Este campo es requerido'
                  })}
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message} 
              />
          </Grid>
          <Grid item xs={12} mb={1}>
              <TextField 
                label="Contenido" 
                variant="filled" 
                fullWidth 
                size="medium"
                multiline
                {...register('contenido', {
                  required:'Este campo es requerido'
                })}
                error={!!errors.contenido}
                helperText={errors.contenido?.message} 
              />
          </Grid>  
          <Grid item xs={12} sx={{paddingLeft:2, }} mt={2}>
              <Button  
                  type='submit'
                  color="secondary" 
                  className='circular-btn' 
                  size='large'                 
              >
                  Comentar
              </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddComent
