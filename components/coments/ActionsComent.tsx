import { Button, Grid, ListItem, ListItemButton, TextField } from '@mui/material'
import React, { FC, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComentContext } from '../../context'
import { Coment } from '../../interfaces'

interface Props {
    comment: Coment
}

interface dataForm {
    contenido:string
}

export const ActionsComent:FC<Props> = ({comment}) => {

    const {deleteComment, isEditComment, setIsEditComment, IdClickComment, getIdClickComment, editComment} = useContext(ComentContext)
    const { register,handleSubmit, formState: { errors } } = useForm<dataForm>({
        defaultValues:{contenido:comment.contenido}
    });

    const onDeleteComment = async() => {
        await deleteComment(comment.id!!)
    }

    const onEditComment = async({contenido}:dataForm) => {
        const dataEdit:Coment = {...comment, contenido:contenido}
        await editComment(dataEdit);
    }

    const changeEditComment = () => {
        setIsEditComment()
        getIdClickComment(comment.id!!)
    }

  return (
    <>
        { isEditComment && IdClickComment === comment.id ?
        <>
            <form onSubmit={handleSubmit(onEditComment)} style={{width:'100%'}}>
            <Grid xs={12}>
                <ListItem sx={{display:'flex', width:'100%'}} >
                        <Grid xs={12} >
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
                        <Button type='submit' color='success' variant='text' sx={{display:'flex', justifyContent:'center'}}> guardar cambios</Button>
                    <Button color='secondary' variant='text' onClick={changeEditComment} sx={{display:'flex', justifyContent:'center'}}> volver</Button>
                </ListItem>
            </Grid>
            </form>
        </>
            :
            <Grid>
                <ListItem sx={{display:'flex', width:'20%'}} id={comment.id?.toString()}>
                    <Button color='success' variant='text' onClick={changeEditComment}  sx={{display:'flex', justifyContent:'center'}} disabled = {isEditComment && IdClickComment !== comment.id ? true : false} > Editar</Button>
                    <Button color='error' variant='text' onClick={onDeleteComment} sx={{display:'flex', justifyContent:'center'}} disabled = {isEditComment && IdClickComment !== comment.id ? true : false}> Eliminar</Button>
                </ListItem>
            </Grid>
        }
    </>
  )
}
