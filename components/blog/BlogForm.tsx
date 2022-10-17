import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Box, Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Card, CardActions, CardMedia, Chip, Divider, FormLabel } from '@mui/material'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import blogApi from '../../api/blogApi'
import { Blog, categoria, Image } from '../../interfaces'
const Editor = dynamic(
    () => {
      return import("react-draft-wysiwyg").then(mod => mod.Editor, e=>null as never);
    },
    { ssr: false }
);
  
  const validCategorys:categoria[]  = [{
    id: 1,
    nombre: 'front-end'
  },{
    id: 2,
    nombre: 'back-end'
  },{
    id: 3,
    nombre: 'dev-op'
  }]

const defectBlog:Blog = {
    idUsuario: 0,
    titulo: '',
    subtitulo: '',
    contenido: '',
    fechaCreacion: '',
    estado: '',
    categoria: {
        id: 0,
        nombre: '',
    },
    comentarios: [],
    tags: [],
    images: []
}

  interface Props {
    blog?:Blog
  }


export const BlogForm:FC<Props> = ({blog}) => {

    const checkToken = async() => {
  
        const Authorization= Cookies.get('token')

        try {
            const { data } = await blogApi.get('/validtoken', {'headers':{'Authorization': Authorization}});
            const user = data;
            return user.id
  
        } catch (error) {
            console.log(error)
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const { register, handleSubmit, formState:{ errors }, getValues, setValue } = useForm<Blog>({
        defaultValues:defectBlog
    })

    let editorState:EditorState = EditorState.createEmpty();
    const [contenido=editorState, setContenido] = useState<EditorState>();
    const [ newTagValue, setNewTagValue ] = useState('');
    const [isSaving, setIsSaving] = useState(false);


    const onEditorStateChange = (editorState:EditorState) => {
        setContenido(editorState);
    }

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');
        console.log(currentTags)
        if ( currentTags.find((tag)=>tag.nombre == newTag ) ) {
            console.log('ya existe tag')
            return;
        }
        
        currentTags.push({nombre:newTag});
        console.log(currentTags)
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t.nombre !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
        if ( !target.files || target.files.length === 0 ) {
            return;
        }
        try {
            console.log(target.files)
            // console.log( file );
            for( const file of target.files ) {
                const formData= new FormData();
                formData.append('multipartFile', file);
                console.log(file)
                const { data } = await blogApi.post('/image/cloud', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log(data)
                const imageInfo:Image ={
                    id:data.public_id,
                    url:data.secure_url,
                }
                console.log(imageInfo)

                setValue(`images`, [...getValues('images'), imageInfo], { shouldValidate: true });
            }

            
        } catch (error) {
            console.log(error );
        }
    }

    const onDeleteImage = async ( image: Image) =>{

        console.log(image)
        setValue(
            'images', 
            getValues('images').filter( ({url}) => url !== image.url ),
            { shouldValidate: true }
        );

        try {
        await blogApi.delete(`/image/cloud/${image.id}`);

        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data:Blog) => {
        if ( data.images.length < 2 ) return alert('Mínimo 2 imagenes');
        const idUsuario = await checkToken();
        console.log(idUsuario)
        const rawContentState = convertToRaw(contenido.getCurrentContent());
        const html = draftToHtml(rawContentState);
        const blog:Blog = { ...data, contenido: html, estado:'habilitado', fechaCreacion: new Date(Date.now()).toDateString(), idUsuario: idUsuario};
        console.log(blog);

        try {
            const { data } = await blogApi({
                url: '/post',
                method: blog.id ? 'PUT': 'POST',  // si tenemos un id, entonces actualizar, si no crear
                data: blog
            });
            console.log(data);
            router.replace('/user/blogs');


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }


    }




  return (
    <div>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
            <Button 
                color="secondary"
                startIcon={ <SaveOutlined /> }
                sx={{ width: '150px' }}
                type="submit"
                >
                Guardar
            </Button>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="blog_categorias_label">Categorias</InputLabel>
                    <Select
                    labelId="blog_categorias_label"
                    label="Categoria"
                    value={getValues('categoria.id')}
                    onChange={ ({ target })=> setValue('categoria', {id:Number(target.value), nombre:"defecto"}, { shouldValidate: true }) }
                    >
                        {
                            validCategorys.map( (category) => (
                                <MenuItem key={category.id} value={category.id}>{category.nombre}</MenuItem>
                            ))
                        }

                    </Select>   
                </FormControl> 
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                    label="tags"
                    variant="filled"
                    fullWidth 
                    sx={{ mb: 1 }}
                    helperText="Presiona [spacebar] para agregar"
                    value={ newTagValue }
                    onChange={ ({ target }) => setNewTagValue(target.value) }
                    onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
                    
                />
                
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                }}
                component="ul">
                    {
                        getValues('tags').map((tag) => {

                        return (
                            <Chip
                                key={tag.nombre}
                                label={tag.nombre}
                                onDelete={ () => onDeleteTag(tag.nombre)}
                                color="primary"
                                size='small'
                                sx={{ ml: 1, mt: 1}}
                            />
                        );
                    })}
                </Box>
              </Grid>
              <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type="file"
                                multiple
                                accept='image/jpg, image/gif, image/jpeg, image/png'
                                style={{ display: 'none' }}
                                onChange={ onFilesSelected }
                            />


                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( (image) => (
                                        <Grid item xs={4} sm={3} key={image.id}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ image.url }
                                                    alt={ image.url }
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
            </Grid>
          
            <Grid item xs={12} md={8}>
                  <TextField
                      label="Título"
                      variant="filled"
                      fullWidth 
                      sx={{ mb: 1 }}
                      { ...register('titulo', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                      })}
                      error={ !!errors.titulo }
                      helperText={ errors.titulo?.message }
                  />
                  <TextField
                      label="Subtitulo"
                      variant="filled"
                      fullWidth 
                      sx={{ mb: 1 }}
                      { ...register('subtitulo', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                      })}
                      error={ !!errors.subtitulo }
                      helperText={ errors.subtitulo?.message }
                  />
                <Typography variant='h2' component='h2' mb={2}>Contenido :</Typography>
                <Box border={"1px solid"}>
                  <Editor
                  editorState={contenido}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  />
                  <textarea style={{display:'none'}} disabled value={draftToHtml(convertToRaw(contenido.getCurrentContent())) } />
                </Box>

                <button type="submit"> Submit  </button>
            </Grid>
          </Grid>
        </form>

    </div>
  )
}
