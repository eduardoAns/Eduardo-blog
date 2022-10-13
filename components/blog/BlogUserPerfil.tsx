import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FC } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { Blog, User } from '../../interfaces';


interface Props {
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  blog: Blog;
}

const defectUser:User = {
    id: 0,
    nombre: '',
    apellidoPaterno: '',
    password:'',
    estado: '',
    idRol: 0,
    email: '',
    fechaCreacion: '',
    comentarios: [],
    posts: [],
    descripcion: '',
}


export const BlogUsePerfil: FC<Props> = (props) => {
  const {  social, blog } = props;

  const { user=defectUser, isLoading } = useUser(`/usuario/${blog.idUsuario}`);

  const nombreUsuario = user?.nombre + ' ' + user?.apellidoPaterno ;

  return (

    <Grid container spacing={3}>
        <Grid item xs={12} >
            <Box display='flex' alignItems='center' sx={{ height: '350px'}} >
                <Grid item xs={12} >
                    <CardActionArea component="a" href={`/user/profile/${blog.idUsuario}`}>
                        <Card sx={{ display: 'flex' }}> 
                            <CardMedia
                                component="img"
                                sx={{ width: 160 }}
                                image={"/products/1740113-00-A_1.jpg"}
                                alt={"image"}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                {user?.nombre + ' ' + user?.apellidoPaterno}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                {user?.email}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                {user?.descripcion}
                                </Typography>
                                <Box display='flex' flexDirection='row' flexWrap={"wrap"} justifyContent='center' mb={1}>
                                    {social.map((network) => (
                                        <Link
                                        display="block"
                                        variant="body1"
                                        href="#"
                                        key={network.name}
                                        sx={{ mb: 0.5 }}
                                        >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <network.icon />
                                            <span>{network.name}</span>
                                        </Stack>
                                        </Link>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
            </Box>

        </Grid>
    
    </Grid>


  );
}