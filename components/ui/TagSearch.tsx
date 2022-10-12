import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useBlogs } from '../../hooks';
import { FullScreenLoading } from '.';
import { BlogList } from '../blog/BlogList';
import { Error404 } from './Error404';

export const TagSearch = () => {
    const router = useRouter()
    let { name } = router.query
    const { blogs, isLoading } = useBlogs(`/post/tag/${name}`);
    const foundBlogs = blogs.length > 0;

    const DataBlogs =   foundBlogs 
                        ?   
                          <> 
                            <Typography variant='h2' sx={{ mb: 2 }}>Resultados</Typography>   
                            <BlogList blogs={blogs} addMainCard={false}/> 
                          </> 
                        : 
                          <Error404 message='No se encontraron blogs en este tag'/>                      
  return (
    <div>
            
        <Typography variant='h1' component='h1' mb={2}>Tag: {name}</Typography>
    
        {
        isLoading
        ? <FullScreenLoading />
        : DataBlogs
        }
        
    </div>
  )
}
