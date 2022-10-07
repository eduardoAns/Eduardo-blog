import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Coment } from '../../../interfaces'


interface Props {
  coment: Coment
}


export const BlogComent:FC<Props> = ({coment}) => {
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
                {`${coment.nombre}  `}
              </Typography>
              - 1 de abril de 2021
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
  )
}

