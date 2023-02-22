import { SaveOutlined, UploadOutlined, AddCircleOutline } from '@mui/icons-material'
import { Box, Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Typography, Card, CardActions, CardMedia, Chip, Divider, FormLabel } from '@mui/material'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import React, { ChangeEvent, FC, useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import blogApi from '../../api/blogApi'
import { AuthContext, BlogContext } from '../../context'
import { Blog, categoria, Image } from '../../interfaces'
import { Toaster, toast } from 'react-hot-toast'
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
        id: 1,
        nombre: 'front-end',
    },
    comentarios: [],
    tags: [],
    images: []
}

  interface Props {
    blog?:Blog
  }


export const BlogForm:FC<Props> = ({blog}) => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    // REACT HOOK FORM
    const { register, handleSubmit, formState:{ errors }, getValues, setValue } = useForm<Blog>({
        defaultValues:blog?.id ? blog : defectBlog
    })
    // config Editor(DraftJs) state with content
    const blocksFromHTML = convertFromHTML(getValues('contenido'))
    let editorState:EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    ));

    // states
    const {userAuthorization} = useContext(AuthContext)  
    const {postBlog, deleteBlogImage, getUrlImage,isSaving} = useContext(BlogContext)  
    const [contenido=editorState, setContenido] = useState<EditorState>();
    const [ newTagValue, setNewTagValue ] = useState('');
 

    //methods
    const onEditorStateChange = (editorState:EditorState) => {
        setContenido(editorState);
    }

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');
        if ( currentTags.find((tag)=>tag.nombre == newTag ) ) {
            console.log('ya existe tag')
            return;
        }
        currentTags.push({nombre:newTag});
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
            for( const file of target.files ) {
                const formData= new FormData();
                formData.append('multipartFile', file);
                const { data } = await blogApi.post('/image/cloud', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                const imageInfo:Image ={
                    id:data.public_id,
                    url:data.secure_url,
                }

                setValue(`images`, [...getValues('images'), imageInfo], { shouldValidate: true });
            }

            
        } catch (error) {
            console.log(error );
        }
    }

    const onDeleteImage = async ( image: Image) =>{

        setValue(
            'images', 
            getValues('images').filter( ({url}) => url !== image.url ),
            { shouldValidate: true }
        );

        await deleteBlogImage(image.id!!)
    }

    const onGetUrlImage = (url:string) => {
        getUrlImage(url)
        toast('URL copiada',{position:'bottom-left'})
    }

    const onSubmit = async (data:Blog) => {
        if ( data.images.length < 2 ) return alert('Mínimo 2 imagenes');
        const {idUsuario} = await userAuthorization();
        const html = draftToHtml(convertToRaw(contenido.getCurrentContent()));
        const blog:Blog = { 
            ...data, 
            contenido: html, 
            estado:'habilitado', 
            fechaCreacion: new Date(Date.now()).toDateString(), 
            idUsuario: idUsuario
        };
       
        await postBlog(blog);

    }

  return (
    <div>
        <Typography variant='h1' component='h1' mb={2}>{blog?.id ? "Editar" : "Nuevo"} Blog</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' justifyContent='start' mb={2}>
              <Button 
                color="secondary"
                startIcon={ <SaveOutlined /> }
                sx={{ width: '150px' }}
                type="submit"
                disabled={ isSaving }
                >
                Guardar
              </Button>
          </Box>
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
              <Grid container item xs={12} mt={2}>
                <Grid item xs={9}>
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
                </Grid>
                <Grid item xs={3} pt={1}>
                    <Box display='flex' justifyContent='center' alignItems={"center"} >

                        <Button 
                            color="secondary"
                            startIcon={ <AddCircleOutline /> }
                            sx={{ width: '100px', height: '30px' }}
                            type="button"
                            onClick={ onNewTag }
                        >
                        Agregar
                        </Button>
                    </Box>
                </Grid>
                
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    }}
                    component="ul"
                >
                    {
                        getValues('tags').map((tag) => {

                        return (
                            <Chip
                                key={tag.nombre}
                                label={tag.nombre}
                                onDelete={ () => onDeleteTag(tag.nombre)}
                                color="default"
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
                                        <CardActions>
                                            <Button 
                                                fullWidth
                                                color="success" 
                                                onClick={()=> onGetUrlImage(image.url)}
                                            >
                                                URL
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Toaster />
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
                <Typography variant='h2' component='h2' mb={2}>recomendacion dimensiones para imagenes: 350 x 350 centrado</Typography>
                <Box border={"1px solid"}>
                  <Editor
                    editorState={contenido}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    
                  />
                   <textarea style={{display:'none'}} disabled value={draftToHtml(convertToRaw(contenido.getCurrentContent()))} /> 
                </Box>
            </Grid>
          </Grid>
        </form>

    </div>
  )
}
