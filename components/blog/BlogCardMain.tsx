import { Grid, Paper, Box, Typography, Link } from '@mui/material'
import NextLink from 'next/link'
import React, { FC } from 'react'
import { Blog } from '../../interfaces'

interface Props {
    blog?:Blog
}

export const BlogCardMain:FC<Props> = ({blog}) => {

  return (
    <Grid item xs={12} >
        <NextLink href={`/blog/${ blog?.id }`} passHref prefetch={ false }>
            <Link>
                <Paper
                    sx={{
                    height: { xs: 700, md: 450 },
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${blog?.images[0].url})`,
                    }}
                >
                    {/* Increase the priority of the hero background image */}
                    {<img style={{ display: 'none' }} src={blog?.images[0].url} alt={blog?.titulo} />}
                    <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    }}
                    />
                    <Grid container>
                        <Grid item md={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    p: { xs: 3, md: 6 },
                                    pr: { md: 0 },
                                }}
                            >
                                <Typography fontWeight={700} component="h1" variant="h3" color={'white'} gutterBottom>
                                    {blog?.titulo}
                                </Typography>
                                <Typography fontWeight={700} variant="h5" color={'white'} paragraph mt={5} >
                                    {blog?.subtitulo}
                                </Typography>
                                <Box display={'flex'} flexWrap="wrap">
                                    <Typography fontWeight={500} mb={1} color={'white'}>Tags: </Typography>

                                    {
                                        blog?.tags.map( (tag) => (
                                            <Typography fontWeight={700} ml={1} key={tag.id} color={'white'}>{ tag.nombre}</Typography>
                                    ))}
                                </Box>
                                
                            
                            </Box>
                        </Grid>
                        <Grid item md={6} alignSelf="center">
                            <Box sx={{
                                    p: { xs: 3, md: 6 },
                                    pr: { md: 0 },
                                }}>
                                <Typography 
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }}
                                    variant="subtitle1"
                                    color={'white'}
                                    mb={1}
                                > 
                                    <div dangerouslySetInnerHTML={{ __html: blog!?.contenido }} />
                                </Typography>
                                <Typography fontWeight={700} mb={1} color={'white'}>{ blog?.fechaCreacion }</Typography>
                                <Typography fontWeight={700} mb={1} color={'white'}>{'Categoria: '+ blog?.categoria.nombre}</Typography>
                                
                                <NextLink href={`/blog/${blog?.id}`} passHref>
                                    <Link>
                                        <Typography fontWeight={700} variant="h5" color={'white'} paragraph mt={5} mb={5}>
                                            Leer más ...
                                        </Typography>
                                    </Link> 
                                </NextLink>
                            </Box>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
        </NextLink>
            
        </Grid>
  )
}
