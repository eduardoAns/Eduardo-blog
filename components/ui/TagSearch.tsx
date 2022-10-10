import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useBlogs } from '../../hooks';
import { FullScreenLoading } from '.';
import { BlogList } from '../blog/BlogList';

export const TagSearch = () => {
    const router = useRouter()
    const { name } = router.query
    const { blogs, isLoading } = useBlogs(`/post/tag/${name}`);
    const foundBlogs = blogs.length > 0;

    const DataBlogs =   foundBlogs ?   
                        <BlogList blogs={blogs} /> : 
                        <Typography variant='h2' sx={{ mb: 1 }}>No se encontraron blogs con este tag</Typography>
                        
  return (
    <div>
            
        <Typography variant='h1' component='h1' mb={2}>Tag: {name}</Typography>
        <Typography variant='h2' sx={{ mb: 2 }}>Resultados</Typography>   
    
        {
        isLoading
        ? <FullScreenLoading />
        : DataBlogs
        }
        
    </div>
  )
}
