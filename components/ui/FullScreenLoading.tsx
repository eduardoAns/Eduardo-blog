import { Box, CircularProgress, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { BlogLayout } from '../layouts';

interface Props {
  text?: string;
}

export const FullScreenLoading:FC<Props> = ({text=''}) => {

  const [isVoid, setisVoid] = useState(true)

  setTimeout(() => {
    setisVoid(false)
  }, 5000);

  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
    >
      {
        isVoid ?
        (
              <>
                <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 20 }>Cargando...</Typography>
                <CircularProgress thickness={ 2 } />  
              </>
        ) : ( 
              <Typography sx={{ mb: 3 }} variant="h1" fontWeight={ 200 } fontSize={ 20 }>{text}</Typography>
        )
      }
        

    </Box>
  )
}
