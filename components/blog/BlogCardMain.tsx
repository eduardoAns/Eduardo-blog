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
                <Paper
                    sx={{
                    height: { xs: 700, md: 450 },
                    position: 'relative',
                    pt: 4,
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
                                    <Typography fontWeight={500} mb={1} color={'secondary.light'}>Tags: </Typography>

                                    {
                                        blog?.tags.map( (tag) => (
                                            <NextLink href={`/tag/${tag.nombre}`} key={tag.id} passHref>
                                                <Link>
                                                    <Typography fontWeight={700} ml={1} color={'secondary.light'}>{ tag.nombre}</Typography>
                                                </Link>
                                            </NextLink>
                                    ))}
                                </Box>
                                
                            
                            </Box>
                        </Grid>
                        <Grid item md={5} alignSelf="center" >
                            <Box sx={{
                                    p: { xs: 3, md: 6 },
                                    pr: { md: 1 },
                                    backgroundColor:"white",
                                    borderBottomLeftRadius: "55%",
                                    
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
                                
                                <NextLink href={`/blog/${blog?.id}`} passHref>
                                    <Link>
                                        <Typography fontWeight={700} mb={1}>{'Categoria: '+ blog?.categoria.nombre}</Typography>
                                    </Link>
                                </NextLink>
                                <NextLink href={`/blog/${blog?.id}`} passHref>
                                    <Link>
                                        <Typography fontWeight={700} variant="h5" color={'black'} paragraph mt={5} mb={5}>
                                            Leer más ...
                                        </Typography>
                                    </Link> 
                                </NextLink>
                            </Box>
                            
                        </Grid>
                    </Grid>
                </Paper>
        </Grid>
  )
}
