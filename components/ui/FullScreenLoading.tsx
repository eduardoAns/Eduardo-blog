import { Box, CircularProgress, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { BlogLayout } from '../layouts';
import { Error404 } from './Error404';

interface Props {
  text?: string;
  isError?: boolean;
}

export const FullScreenLoading:FC<Props> = ({text='', isError=false}) => {

  const [isLoading, setIsLoading] = useState(true)
  const isError404 = isError ? <Error404 message={text} /> : <Typography variant='h1' component='h1' mb={2}>{text}</Typography>;

  setTimeout(() => {
    setIsLoading(false)
  }, 6000);

  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
    >
      {
        isLoading ?
        (
              <>
                <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 20 }>Cargando...</Typography>
                <CircularProgress thickness={ 2 } />  
              </>
        ) : ( 
              isError404
        )
      }
        

    </Box>
  )
}
