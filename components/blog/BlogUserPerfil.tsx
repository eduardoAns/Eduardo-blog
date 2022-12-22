import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FC, useContext, useEffect } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { Blog, User } from '../../interfaces';
import { FullScreenLoading } from '../ui';
import { UserContext } from '../../context/user';


interface Props {
  social?: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  idUsuario: number;
}

export const BlogUsePerfil: FC<Props> = (props) => {
  const {  social, idUsuario } = props;
  const { user, isLoading } = useUser(`/usuario/${idUsuario}`, { refreshInterval: 1000 });
    
  if(isLoading) return <FullScreenLoading />

  return (

    <Grid container spacing={3}>
        <Grid item xs={12} >
            <Box display='flex'  sx={{ height: 'auto'}} >
                <CardActionArea component="a" href={`/user/profile/${idUsuario}`}>
                    <Card> 
                        <Box display={{md:"flex"}}  >
                            <CardMedia
                                component="img"
                                sx={{ maxWidth: 160 }}
                                image={"/products/1740113-00-A_1.jpg"}
                                alt={"image"}
                            />
                            <CardContent >
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
                                    {social?.map((network) => (
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
                        </Box>
                    </Card>
                </CardActionArea>
            </Box>
        </Grid>
    </Grid>


  );
}