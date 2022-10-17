import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Button } from '@mui/material'

import { Blog, IProduct } from '../../interfaces'

interface Props {
    blog: Blog;
    xs?: number;
    sm?: number;
}

//defectBlog sirve para cargar datos mientras espera las oeticiones de BlogsRelacionados.tsx
const DefectBlog = {
    id: 0,
    idUsuario: 0,
    titulo: '',
    subtitulo:'',
    contenido: '',
    comentarios: [],
    fechaCreacion: '',
    estado: '',
    tags:[],
    categoria:{
        id: 0,
        nombre: '',
    },
    images:[{
        id: "1",
        url: '',
    },
    {
        id: "2",
        url: '',
    }]
}
export const BlogCard: FC<Props> = ({ blog=DefectBlog, xs, sm }) => {

    const XS = xs || 12;
    const SM = sm || 6;
    const [isHovered, setIsHovered] = useState(false);

    const blogImage = useMemo(() => {
        return isHovered
          ? blog.images[1].url
          : blog.images[0].url;

    }, [isHovered, blog.images])

    return (
      <Grid item 
            xs={XS} 
            sm={SM}
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
      >
          <Card>
              <NextLink href={`/blog/${blog.id}`} passHref prefetch={ false }>
                <Link>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="400"
                            image={ blogImage }
                            alt={ blog.titulo }
                        />

                    </CardActionArea>
                </Link>
              </NextLink>
              
          </Card>

          <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700} mb={1}>{ blog.titulo}</Typography>
              <Typography fontWeight={350} mb={1}>{ blog.fechaCreacion }</Typography>
              <Typography fontWeight={350} mb={1}>{'Categoria: '+ blog.categoria.nombre}</Typography>
              <Box display={'flex'} flexWrap="wrap">
                <Typography fontWeight={350} mb={1}>Tags: </Typography>

                {
                    blog.tags.map( (tag) => (
                        <Typography fontWeight={350} mb={1} ml={1} key={tag.id}>{ tag.nombre}</Typography>
                ))}
              </Box>
              

              <Typography
                mb={1}
                fontWeight={500}
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}
                variant="body2">
                <div dangerouslySetInnerHTML={{ __html: blog.contenido }} />
            </Typography>

          </Box>

            <NextLink href={`/blog/${blog.id}`} passHref prefetch={ false }>
                <Button color='warning'>Leer más</Button>
            </NextLink>    
        </Grid>
    )
}
