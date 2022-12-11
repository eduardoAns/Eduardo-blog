import { Grid, Paper, Box, Typography, Link, Button } from '@mui/material'
import NextLink from 'next/link'
import React, { FC } from 'react'
import { Blog } from '../../interfaces'

interface Props {
    blog?:Blog
}

export const BlogCardMain:FC<Props> = ({blog}) => {

  return (
    <Grid item xs={12} >
        <Paper
            sx={{
            height: { xs: 700, md: 450 },
            position: 'relative',
            mb: 4,                    
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${blog?.images[0].url})`,
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }}
        >
            {/* Increase the priority of the hero background image */}
            <Grid container sx={{
                opacity: 0.4,
                backgroundColor: 'white',
                height:{xs: '100%', md:'80%'}
            }}>
                <Grid item md={7}>
                    <Box
                        height={'100%'}
                        sx={{
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                        display='flex'
                        justifyContent='space-evenly'
                        flexDirection='column'  
                    >
                        <NextLink href={`/blog/${blog?.id}`} passHref>
                            <Link >
                                <Typography fontWeight={700} component="h1" variant="h3" color={'secondary.light'} gutterBottom>
                                    {blog?.titulo}
                                </Typography>
                            </Link> 
                        </NextLink>
                        
                        <Typography fontWeight={700} variant="h5" color={'secondary.light'} paragraph >
                            {blog?.subtitulo}
                        </Typography>
                        <Box display={'flex'} flexWrap="wrap" >
                            <Typography fontWeight={500} pt={0.5} color={'secondary.light'}>Tags: </Typography>

                            {
                                blog?.tags.map( (tag) => (
                                    <NextLink href={`/tag/${tag.nombre}`} key={tag.id} passHref>
                                        <Link>
                                            <Button variant='text' color='inherit'>
                                                <Typography fontWeight={700} ml={1} color={'secondary.light'}>{ tag.nombre}</Typography>
                                            </Button>
                                        </Link>
                                        
                                    </NextLink>
                            ))}
                        </Box>
                        
                    
                    </Box>
                </Grid>
                <Grid item md={5} width='100%'>
                    <Box sx={{
                            p: { xs: 3, md: 6 },
                        }}
                        height={'100%'}
                        display='flex'
                        justifyContent='space-evenly'
                        flexDirection='column' 
                    >
                        <Typography 
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                            }}
                            variant="subtitle1"
                            color={'black'}
                        > 
                            <div dangerouslySetInnerHTML={{ __html: blog!?.contenido }} />

                        </Typography>
                        
                        <Typography fontWeight={700} color={'black'}>{ blog?.fechaCreacion }</Typography>
                        
                        <NextLink href={`/category/${blog?.categoria.nombre}`} passHref>
                            <Link>
                                <Typography fontWeight={700}>{'Categoria: '+ blog?.categoria.nombre}</Typography>
                            </Link>
                        </NextLink>
                        <Box>
                            <NextLink href={`/blog/${blog?.id}`} passHref>
                                <Link >
                                    <Button variant='outlined' color='inherit'>
                                        <Typography fontWeight={700} variant="h5" color={'black'} >
                                            Leer más ...
                                        </Typography>
                                    </Button>
                                </Link> 
                            </NextLink>
                        </Box>
                        
                    </Box> 
                </Grid>
            </Grid>
        </Paper>
    </Grid>
  )
}
