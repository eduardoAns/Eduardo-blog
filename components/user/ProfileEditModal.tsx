import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Card, CardActions, CardMedia, Grid, Box, Chip, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { ChangeEvent, FC, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AvatarI, User, UserForm } from '../../interfaces';
import { Toaster, toast } from 'react-hot-toast'
import { UserContext } from '../../context/user';
import { AddCircleOutline, UploadOutlined } from '@mui/icons-material';
import blogApi from '../../api/blogApi';


interface Props {
    initialUser:User
}

interface SocialMediaIcons {
  name?: string;
  url?:string
}

const DEFAULT_SOCIAL:SocialMediaIcons[]=[
  { name: 'Git'},
  { name: 'Twitter' },
  { name: 'Facebook' },
  { name: 'Instagram'},
  { name: 'Linkedin' },
  { name: 'Web'},
]   

export const ProfileEditModal:FC<Props> = ({initialUser}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [open, setOpen] = useState(false);
    const [ newSocialMediaValue, setNewSocialMediaValue ] = useState<SocialMediaIcons>();
    const {editUser} = useContext(UserContext)
    const { register, handleSubmit, formState:{ errors }, getValues, setValue} = useForm<User>({
        defaultValues:initialUser
    })
    
    const handleClickModal = () => {
      setOpen(!open)
    }

    const onDeleteImage = async ( avatar: AvatarI) =>{

        setValue(
          'avatar', 
          getValues('avatar').filter( ({url}) => url !== avatar.url ),
          { shouldValidate: true }
        );

      // await deleteBlogImage(image.id!!)
    }

    const onNewSocialMedia = () => {
      const newSocialMedia = newSocialMediaValue!
      console.log(newSocialMedia)
      setNewSocialMediaValue({
        url:'',
      });
      const currentSocialMedias = getValues('socialMedias');
      if ( currentSocialMedias.find((social)=>social.url == newSocialMedia?.url ) ) {
          console.log('ya existe la red social')
          return;
      }

      const updatedSocialMedias = [...currentSocialMedias, {
        url: newSocialMedia.url!,
        nombre: newSocialMedia.name!,
        idUsuario: initialUser.id
      }]

      setValue('socialMedias', updatedSocialMedias, { shouldValidate: true });

    }

  const onDeleteSocialMedia = ( socialMedia: string ) => {
      const updatedSocialMedias = getValues('socialMedias').filter( social => social.url !== socialMedia );
      setValue('socialMedias', updatedSocialMedias, { shouldValidate: true });
  }

    const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
      if ( !target.files || target.files.length === 0 ) {
          return;
      }
      try {
          for( const file of target.files ) {
              const formData= new FormData();
              formData.append('multipartFile', file);
              console.log(file)
              const { data } = await blogApi.post('/image/cloud', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
              const avatarInfo:AvatarI ={
                  id:data.public_id,
                  url:data.secure_url,
                  idUsuario:initialUser.id
              }

              console.log(avatarInfo)

              setValue(`avatar`, [avatarInfo], { shouldValidate: true });
          }

          
      } catch (error) {
          console.log(error );
      }
  }

    const onSubmit = async(user:User) => {

      const dataUser:UserForm = {
          id:initialUser.id,
          nombre:user.nombre,
          apellidoPaterno:user.apellidoPaterno,
          descripcion:user.descripcion,
          email:initialUser.email,
          password:initialUser.password,
          fechaCreacion:initialUser.fechaCreacion,
          idRol:initialUser.idRol,
          estado:initialUser.estado,
          sexo:"",
          avatar:user.avatar,
          socialMedias:user.socialMedias
      }
      console.log(dataUser)
      const {message} = await editUser(dataUser)
      toast(message,{position:'bottom-left'})

    }
      
    return ( 
      <div>
        <Button variant="outlined" onClick={handleClickModal} color="primary">
            Editar
        </Button>
        <Dialog open={open} onClose={handleClickModal} maxWidth={'md'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Agregar un avatar
              </DialogContentText>
              <Box width={{xs:'100%'}} display='flex' flexDirection={'column'} alignItems='center'>
                  <Button
                      color="secondary"
                      startIcon={ <UploadOutlined /> }
                      sx={{ mb: 3, mt:2 }}
                      onClick={ () => fileInputRef.current?.click() }
                  >
                      Cargar avatar
                  </Button>
                  <input 
                      ref={ fileInputRef }
                      type="file"
                      multiple
                      accept='image/jpg, image/gif, image/jpeg, image/png'
                      style={{ display: 'none' }}
                      onChange={ onFilesSelected }
                  />
                  <Grid container spacing={2} width={{xs:'40%'}} mb={1}>
                        
                      {
                          getValues('avatar').map( (image) => (
                              <Grid item xs={12} key={image.id}>
                                  <Card>
                                      <CardMedia 
                                          component='img'
                                          className='fadeIn'
                                          image={ image.url }
                                          alt={ image.url }
                                          sx={{borderRadius:'100%'}}
                                      />
                                      <CardActions>
                                          <Button 
                                              fullWidth 
                                              color="error"
                                              onClick={()=> onDeleteImage(image)}
                                          >
                                              Borrar
                                          </Button>
                                      </CardActions>
                                      
                                  </Card>
                              </Grid>
                          ))
                      }
                  </Grid>
                </Box>
              <Divider />
              <DialogContentText mt={1}>
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
            <DialogContent>
                <DialogContentText mb={2}>
                  ¿Quieres cambiar o agregar una red social?
                </DialogContentText>                  
                  <Box width='100%' mt={1}>
                    {/* <Typography variant='h5'>
                      Redes sociales
                    </Typography> */}
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="blog_social_label">red social</InputLabel>
                            <Select
                              labelId="blog_social_label"
                              label="Redes sociales"
                              value={''} 
                              onChange={ ({ target })=> setNewSocialMediaValue({...newSocialMediaValue,name:target.value}) }
                              >
                                  {
                                      DEFAULT_SOCIAL.map( (social) => (
                                          <MenuItem key={social.name} value={social.name}>{social.name}</MenuItem>
                                      ))
                                  }

                            </Select>   
                        </FormControl> 
                      </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="url"
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                helperText="Presiona [spacebar] para agregar"
                                value={ newSocialMediaValue?.url }
                                onChange={ ({ target }) => setNewSocialMediaValue({...newSocialMediaValue,url:target.value}) }
                                onKeyUp={ ({ code })=> code === 'Space' ? onNewSocialMedia() : undefined }
                                
                            />
                        </Grid>
                        <Grid item xs={3} md={2} mb={3} >
                            <Box pt={{md:1}}>
                                <Button 
                                    color="secondary"
                                    startIcon={ <AddCircleOutline /> }
                                    sx={{ width: '100px', height: '30px' }}
                                    type="button"
                                    onClick={ onNewSocialMedia }
                                >
                                Agregar
                                </Button>
                            </Box>
                      </Grid>
                    </Grid>
                    
                    <Grid container spacing={2}>
                      {
                        getValues('socialMedias').map((social)=>(
                          <Grid item xs={12} key={social.id}>
                            <Chip
                                label={social.url}
                                color="default"
                                size='small'
                                onDelete={ () => onDeleteSocialMedia(social.url)}
                            />
                          </Grid>
                        )

                        )
                      }
                      
                    </Grid>
                  </Box>
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
