import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useUser } from '../../../hooks/useUser'
import { Coment } from '../../../interfaces'


interface Props {
  coment: Coment
}


export const BlogComent:FC<Props> = ({coment}) => {


  const { user, isLoading } = useUser(`/usuario/${coment.idUser}`);
  
  const usuarioNombre = user?.nombre + ' ' + user?.apellidoPaterno;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={coment.contenido}
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
              {coment.fechaCreacion}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
  )
}

