import { Button, Grid, TextareaAutosize, TextField } from '@mui/material'
import Cookies from 'js-cookie';
import router from 'next/router';
import React, { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import blogApi from '../../api/blogApi';
import { AuthContext } from '../../context';
import { ComentContext } from '../../context/coment';
import { Coment, User } from '../../interfaces';

export interface dataForm {
  nombre:string;
  contenido:string;
}

interface Props {
  idBlog?:number;
}


const AddComent:FC<Props> = ({idBlog}) => {


  const { postComment } = useContext( ComentContext );
  const { userAuthorization, user } = useContext( AuthContext );
  const { register,handleSubmit, formState: { errors } } = useForm<dataForm>();

  const onPostComent = async ({nombre,contenido}:dataForm) => {
    const ID_USER_ANON = 6
    const ID_NOT_LOGIN = 0
    const {idUsuario} = await userAuthorization()
    
    const idUser = idUsuario == ID_NOT_LOGIN ? ID_USER_ANON : idUsuario

    const dataPost:Coment = {
      nombre:user? user.nombre : nombre,
      idPost:idBlog,
      idUser:idUser,
      contenido,
      fechaCreacion:new Date(Date.now()).toDateString(),
      estado:'habilitado'
    }
  
    console.log(dataPost)
    await postComment(dataPost)


  }

  return (
    <form onSubmit={handleSubmit(onPostComent)}>
      <Grid item mt={3} >
        {
          !user?
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
          : null 
        }
          
          <Grid item xs={12} mb={1}>
              <TextField 
                label="Contenido :" 
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
