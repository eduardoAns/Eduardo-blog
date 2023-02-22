import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useState, useEffect, useContext } from 'react'
import blogApi from '../../../api/blogApi'
import { BlogLayout } from '../../../components/layouts'
import {User } from '../../../interfaces'
import { BlogCard, BlogUsePerfil } from '../../../components/blog'
import { BlogComent } from '../../../components/coments'
import { useRouter } from 'next/router';
import { AuthContext, ComentContext } from '../../../context'
import { ProfileEditModal } from '../../../components/user'
import { useUser } from '../../../hooks/useUser'
import { UserContext } from '../../../context/user'
import { ProfileBlogList } from '../../../components/user/ProfileBlogList'
import { useBlog, useBlogs } from '../../../hooks'
import { FullScreenLoading } from '../../../components/ui'

interface Props {
  user: User
}


const UserPage:NextPage<Props> = ({user}) => {
  const {userId} = useContext(AuthContext)
  const { user:userData, isLoading } = useUser(`/usuario/${user.id}`);
  const {blogs, isLoading:isLoadingBlog} = useBlogs(`/post/ByUserId/${user.id}`)

  const allblogs =  blogs.length > 0 
                    ? 
                    <ProfileBlogList blogs={blogs}/> 
                    : 
                    <Typography variant="body1" paragraph>
                      Este usuario no ha realizado publicaciones
                    </Typography>;

  const lastComents = user.comentarios.length > 2 
                      ? 
                      user.comentarios.slice(user.comentarios.length-3).reverse() 
                      :
                      user.comentarios.reverse()

  
  
                    
  
  return (
    <BlogLayout title={'Perfil del usuario'} pageDescription={'revisa el perfil del este usuario'}>
      {
        user.id == userId && !isLoading ? <ProfileEditModal initialUser={userData!!}/> : null
      }
      <Typography variant="h1" component="h1" gutterBottom>
          Perfil del usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Box display='flex' flexDirection={"column"}>

                <BlogUsePerfil idUsuario={user.id} />

                <Grid item container xs={12} mt={2} mb={2}>
                  <Grid item xs={12} sm={6} >
                    <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            {blogs.length} Publicaciones
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
                  <Box display={"flex"} flexDirection="column" width={'100%'}>
                    <Typography variant="h6" gutterBottom component="div">
                      Ultimos comentarios
                    </Typography>
                    
                      {
                        user.comentarios.length > 0 
                        ? 
                          lastComents.map((coment) => (
                            <Box width={'100%'} key={coment.id}>
                              <BlogComent coment={coment} addName={false} addActions={false}/>
                            </Box>
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
                    <Typography variant="h4" gutterBottom component="div">
                      publicaciones
                    </Typography>
                    {
                      !isLoadingBlog
                      ?
                        allblogs
                      :
                        <FullScreenLoading />
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
    revalidate: 60
  }
}

export default UserPage
