import { Button, Grid, ListItem, ListItemButton, TextField } from '@mui/material'
import React, { FC, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ComentContext } from '../../context'
import { Coment } from '../../interfaces'
import { Toaster, toast } from 'react-hot-toast'


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
        toast('Comentario Eliminado',{position:'bottom-left'})

    }

    const onEditComment = async({contenido}:dataForm) => {
        const dataEdit:Coment = {...comment, contenido:contenido}
        await editComment(dataEdit);
        toast('Comentario editado',{position:'bottom-left'})

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
                <ListItem sx={{display:'flex', width:'100%'}}>
                    <Grid xs={8} sx={{backgroundColor:'azure'}}>
                        <TextField 
                            label="Contenido :" 
                            variant="filled" 
                            fullWidth 
                            multiline
                            {...register('contenido', {
                            required:'Este campo es requerido'
                            })}
                            error={!!errors.contenido}
                            helperText={errors.contenido?.message} 
                        />
                    </Grid> 
                    <Grid xs={4} sx={{display:'flex', width:'100%', justifyContent:'end', alignItems:'end' ,flexDirection: {xs: 'column', md: 'row' }}}>
                        <Button type='submit' color='success' variant='text' sx={{display:'flex', width:'4.5rem'}}> guardar cambios</Button>
                        <Button color='secondary' variant='text' onClick={changeEditComment} sx={{display:'flex', justifyContent:'center'}}> volver</Button>
                    </Grid>
                </ListItem>
            </Grid>
            </form>
        </>
            :
            <Grid>
                <ListItem sx={{display:'flex', width:'20%', flexDirection: {xs: 'column', md: 'row' }}} id={comment.id?.toString()}>
                    <Button color='success' variant='text' onClick={changeEditComment}  sx={{display:'flex', justifyContent:'center'}} disabled = {isEditComment && IdClickComment !== comment.id ? true : false} > Editar</Button>
                    <Button color='error' variant='text' onClick={onDeleteComment} sx={{display:'flex', justifyContent:'center'}} disabled = {isEditComment && IdClickComment !== comment.id ? true : false}> Eliminar</Button>
                </ListItem>
            </Grid>
        }
        <Toaster />
    </>
  )
}
