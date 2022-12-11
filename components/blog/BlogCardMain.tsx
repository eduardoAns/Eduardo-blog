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
            height: { xs: 'auto', md: 450 },
            position: 'relative',
            pt: { xs: 0, md: 4 },
            mb: 4,                    
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${blog?.images[0].url})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            <Grid container sx={{
                opacity: 0.4,
                backgroundColor: 'white',
            }}>
                <Grid item md={7}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 7 },
                            pr: { md: 0 },
                        }}
                    >
                        <NextLink href={`/blog/${blog?.id}`} passHref>
                            <Link>
                                <Typography fontWeight={700} component="h1" variant="h3" color={'secondary.light'} gutterBottom>
                                    {blog?.titulo}
                                </Typography>
                            </Link> 
                        </NextLink>
                        
                        <Typography fontWeight={700} variant="h5" color={'secondary.light'} paragraph mt={5} >
                            {blog?.subtitulo}
                        </Typography>
                        <Box display={'flex'} flexWrap="wrap">
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
                                pr: { md: 1 },
                            }}
                            
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
                                mb={1}
                            > 
                                <div dangerouslySetInnerHTML={{ __html: blog!?.contenido }} />

                            </Typography>
                            
                            <Typography fontWeight={700} mb={1} color={'black'}>{ blog?.fechaCreacion }</Typography>
                            
                            <NextLink href={`/category/${blog?.categoria.nombre}`} passHref>
                                <Link>
                                    <Typography fontWeight={700} mb={1}>{'Categoria: '+ blog?.categoria.nombre}</Typography>
                                </Link>
                            </NextLink>
                            <Box my={4}>
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
