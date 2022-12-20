import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import blogApi from '../../api/blogApi';
import { User, UserForm } from '../../interfaces';
import { Toaster, toast } from 'react-hot-toast'


interface Props {
    initialUser:User
}

export const ProfileEditModal:FC<Props> = ({initialUser}) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState:{ errors }, getValues, setValue } = useForm<User>({
        defaultValues:initialUser
    })
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onSubmit = async({nombre, apellidoPaterno, descripcion}:User) => {

      const dataUser:UserForm = {
          id:initialUser.id,
          nombre,
          apellidoPaterno,
          descripcion,
          email:initialUser.email,
          password:initialUser.password,
          fechaCreacion:initialUser.fechaCreacion,
          idRol:initialUser.idRol,
          estado:initialUser.estado,
          sexo:"",
      }

      console.log(dataUser)

      try {
        await blogApi.put('/usuario', dataUser);
        console.log('usuario editado')

      } catch (error) {
        console.log(error);
      }

      toast('Usuario editado',{position:'bottom-left'})

    }
      
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen} color="primary">
            Editar
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Cambiar tu nombre o descripcion.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                type="text" 
                fullWidth
                variant="standard"
                { ...register('nombre', {
                  required: 'Este campo es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                error={ !!errors.nombre }
                helperText={ errors.nombre?.message }
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Apellido"
                type="text"
                fullWidth
                variant="standard"
                { ...register('apellidoPaterno', {
                  required: 'Este campo es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                error={ !!errors.apellidoPaterno }
                helperText={ errors.apellidoPaterno?.message }
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Descripcion"
                type="text"
                fullWidth
                variant="standard"
                { ...register('descripcion', {
                  required: 'Este campo es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                error={ !!errors.descripcion }
                helperText={ errors.descripcion?.message }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} >Cancel</Button>
              <Button onClick={handleClose} type='submit'>Editar</Button>
            </DialogActions>
          </form>
        </Dialog>
        <Toaster />
      </div>
    );
}
