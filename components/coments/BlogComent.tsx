import { Avatar, Box, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Typography, } from '@mui/material'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Coment } from '../../interfaces'
import { FullScreenLoading } from '../ui'
import NextLink from 'next/link';
import { AuthContext, ComentContext } from '../../context'
import { ActionsComent } from './ActionsComent'
import { AvatarI } from '../../interfaces';
import blogApi from '../../api/blogApi';


interface Props {
  coment: Coment
  addName?: boolean
  addActions?: boolean
}



export const BlogComent:FC<Props> = ({coment, addName=true, addActions=true}) => {

    const ID_USER_ANON = 6
    const usuarioNombre = addName ? `${coment.nombre}` : '';
    
    const [userId, setUserId] = useState<number>(0)
    const [avatar, setAvatar] = useState<AvatarI>()
    const { userAuthorization} = useContext(AuthContext)
    const {isChangeEditComment, IdClickComment} = useContext(ComentContext)

    const getUserId = async() => {
        const {idUsuario} = await userAuthorization()
        setUserId(idUsuario)
    }

    const getAvatar = async() => {
       const {data} = await blogApi.get(`/avatar/byUserId/${coment.idUser}`)
       console.log('dataAvatar', data)
       setAvatar(data)
    }
    
    useEffect(() => {
      getUserId()
      getAvatar()
    }, [])

    // if(isLoading) return <FullScreenLoading />
    
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={!addName ? {display:'none'} : {} }>
          {
            coment.idUser != ID_USER_ANON?
            <NextLink href={`/user/profile/${coment.idUser}`} passHref>
              <Link >
                <Avatar alt={coment.nombre} src={avatar?.url ? avatar?.url : "/static/images/avatar/1.jpg"} />
              </Link>
            </NextLink>
            :
            <Avatar alt={coment.nombre} src={avatar?.url ? avatar?.url : "/static/images/avatar/1.jpg"} />

          }
        </ListItemAvatar>
        {
          isChangeEditComment && IdClickComment === coment.id ?
          null
          : 
          <ListItemText
            primary={coment?.contenido}
            secondary={
              <Box display={'flex'} mt={1} flexDirection={{xs: 'column', md: 'row' }} gap={{xs:0, md:1}} >
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {`${usuarioNombre}  `}
                </Typography>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {coment?.fechaCreacion}
                </Typography>
                
              </Box>
            }
            
          />
        }
          

        
        {
          coment.idUser == userId && addActions ?
          <ActionsComent comment={coment} />
          : null
        }
        
      </ListItem>
      

      <Divider variant="inset" component="li" />
      
    </List>
  )
}

