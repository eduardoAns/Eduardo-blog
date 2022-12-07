import { Avatar, Box, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useUser } from '../../hooks/useUser'
import { Coment } from '../../interfaces'
import { FullScreenLoading } from '../ui'
import NextLink from 'next/link';


interface Props {
  coment: Coment
  addName?: boolean
}



export const BlogComent:FC<Props> = ({coment, addName=true}) => {

    // const { user, isLoading } = useUser(`/usuario/${coment?.idUser}`);

    const ID_USER_ANON = 6
    const usuarioNombre = addName ? `${coment.nombre}` : '';

    // if(isLoading) return <FullScreenLoading />
    
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {
            coment.idUser != ID_USER_ANON ?
            <NextLink href={`/user/profile/${coment.idUser}`} passHref>
              <Link >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Link>
            </NextLink>
            :
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

          }
        </ListItemAvatar>
        <ListItemText
          primary={coment?.contenido}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`${usuarioNombre}  `}
              </Typography>
              {coment?.fechaCreacion}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
  )
}

