import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Button } from '@mui/material'

import { Blog } from '../../interfaces'

interface Props {
    blog: Blog;
    xs?: number;
    sm?: number;
}


export const BlogCard: FC<Props> = ({ blog, xs, sm }) => {

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
                            onMouseEnter={ () => setIsHovered(true) } 
                            onMouseLeave={ () => setIsHovered(false) } 
                        />

                    </CardActionArea>
                </Link>
              </NextLink>
              
          </Card>

          <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700} mb={1}>{ blog.titulo}</Typography>
              <Typography fontWeight={350} mb={1}>{ blog.fechaCreacion }</Typography>
              <Box display={'flex'} >
                <Typography fontWeight={350} sx={{mt:"2px"}}>Categoria: </Typography>
                <Link display="flex" variant='caption' href={`/category/${blog.categoria.nombre}`} key={blog.categoria.id}>
                    <Button variant='contained' >{blog.categoria.nombre}</Button>
                </Link>
              </Box>
              <Box display={'flex'} flexWrap="wrap">
                <Typography fontWeight={350} sx={{mt:"2px"}}>Tags: </Typography>
                {   blog.tags.map((tag) => (
                        <Link display="flex" variant='caption' href={`/tag/${tag.nombre}`} key={tag.id} mb={1} ml={1}>
                            <Button variant='contained' >{ tag.nombre}</Button>
                        </Link>
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
