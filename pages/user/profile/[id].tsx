import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import blogApi from '../../../api/blogApi'
import { BlogLayout } from '../../../components/layouts'
import { Coment, User } from '../../../interfaces'
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { BlogCard } from '../../../components/blog'
import { BlogComent } from '../../../components/coments'
import coments from '../coments'

interface Props {
  user: User
}


const UserPage:NextPage<Props> = ({user}) => {

  const lastComents = user.comentarios.length > 2 ? 
                      user.comentarios.slice(user.comentarios.length-3).reverse() :
                      user.comentarios.reverse();

  return (
    <BlogLayout title={'Perfil del usuario'} pageDescription={'revisa el perfil del este usuario'}>
      <Typography variant="h1" component="h1" gutterBottom>
        Perfil del usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Box display='flex' flexDirection={"column"}>
                <Grid item xs={12} >
                    <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex' }}> 
                            <CardMedia
                                component="img"
                                sx={{ width: 160 }}
                                image={"/products/1740113-00-A_1.jpg"}
                                alt={"image"}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                {user.nombre + ' ' + user.apellidoPaterno}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                {user.email}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                {user.descripcion}
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
                <Grid item container xs={12} mt={2} mb={2}>
                  <Grid item xs={12} sm={6} >
                    <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            {user.posts.length} Publicaciones
                        </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom component="div">
                             {user.comentarios.length} Comentarios
                        </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item container xs={12} >
                  <Box display={"flex"} flexDirection="column">
                    <Typography variant="h6" gutterBottom component="div">
                      Ultimos comentarios
                    </Typography>
                    
                      {
                        user.comentarios.length > 0 
                        ? 
                          lastComents.map((coment) => (
                            <BlogComent key={coment.id} coment={coment} addName={false} />
                          ))
                        :
                          <Typography variant="body1" paragraph >
                            Este usuario no ha realizado comentarios
                          </Typography>
                        
                      }

                  </Box>
                  
                  

                </Grid>
            </Box>

        </Grid>
        <Grid item xs={12} sm={6}>
                <Grid item xs={12} >
                  <Box display={"flex"} flexDirection="column">
                    <Typography variant="h6" gutterBottom component="div">
                      Ultima publicacion
                    </Typography>
                    {
                      user.posts.length > 0
                      ?
                        <BlogCard blog={user.posts[user.posts.length - 1]} sm={12}/>
                      :
                        <Typography variant="body1" paragraph>
                          Este usuario no ha realizado publicaciones
                        </Typography>
                    }
                  </Box>
                    
                    
                </Grid>

        </Grid>
    
      </Grid>
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

  const {data} = await blogApi.get('/usuario')
  const users:User[] = data
  let usersId:string[] = []
  users.map( (user) => usersId.push(user.id.toString()) )

  return {
    paths: usersId.map( (id:string) => ({  
      params: {
        id
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  

  const { id = '' } = params as { id: string };

  const {data} = await blogApi.get(`/usuario/ ${parseInt(id)}`);

  const user = data
  
  if ( !user ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user
    },
    revalidate: 60*60*24
  }
}

export default UserPage
