import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FC } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { Blog } from '../../interfaces';


interface Props {
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  blog: Blog;
}


export const BlogUsePerfil: FC<Props> = (props) => {
  const {  social, blog } = props;

  const { user, isLoading } = useUser(`/usuario/${blog.idUsuario}`);

  const nombreUsuario = user?.nombre + ' ' + user?.apellidoPaterno || '';

  return (

    <Grid container spacing={3}>
        
        <Grid item xs={12} >
        <Typography variant='h5' component='h2' mb={1}>{`Categoria: ${blog.categoria.nombre}`}</Typography>
        <Typography variant='h2' component='h2' mb={3}>{blog.fechaCreacion}, por {nombreUsuario}</Typography>

            <Box display='flex' justifyContent='center'>
            <Card sx={{ maxWidth: 300 }}>
                
                <CardActionArea sx={{ height: 500 }}>
                    <Box display='flex' flexDirection='row' justifyContent='center' mb={1}>
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
                    
                    <CardMedia
                        component="img"
                        height="300"
                        image="/products/1740113-00-A_1.jpg"
                        alt="image"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Sobre mi
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.descripcion}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Box>
        </Grid>
        
        
    </Grid>
  );
}