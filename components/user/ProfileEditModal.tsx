import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { User, UserForm } from '../../interfaces';
import { Toaster, toast } from 'react-hot-toast'
import { UserContext } from '../../context/user';


interface Props {
    initialUser:User
}

export const ProfileEditModal:FC<Props> = ({initialUser}) => {
    const [open, setOpen] = useState(false);
    const {editUser} = useContext(UserContext)
    const { register, handleSubmit, formState:{ errors }} = useForm<User>({
        defaultValues:initialUser
    })
    
    const handleClickModal = () => {
      setOpen(!open)
    }

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

      await editUser(dataUser)
      toast('Usuario editado',{position:'bottom-left'})

    }
      
    return ( 
      <div>
        <Button variant="outlined" onClick={handleClickModal} color="primary">
            Editar
        </Button>
        <Dialog open={open} onClose={handleClickModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Puedes cambiar tu nombre o descripcion.
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
              <Button onClick={handleClickModal} >Cancel</Button>
              <Button onClick={handleClickModal} type='submit'>Editar</Button>
            </DialogActions>
          </form>
        </Dialog>
        <Toaster />
      </div>
    );
}
