import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import blogApi from '../../../api/blogApi'
import { BlogLayout } from '../../../components/layouts'
import { User } from '../../../interfaces'
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

interface Props {
  user: User
}


const UserPage:NextPage<Props> = ({user}) => {
  return (
    <BlogLayout title={'Perfil del usuario'} pageDescription={'revisa el perfil del este usuario'}>
      <Typography variant="h1" component="h1" gutterBottom>
        Perfil del usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
            <Box display='flex' alignItems='center' sx={{ height: '350px'}} >
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
            </Box>

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
