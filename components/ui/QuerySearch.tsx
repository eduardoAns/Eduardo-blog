import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useBlogs } from '../../hooks';
import { BlogList } from '../blog';
import { Error404 } from './Error404';
import { FullScreenLoading } from './FullScreenLoading';

export const QuerySearch = () => {
    const router = useRouter()
    let { query = '' } = router.query as { query: string }
    console.log(query)
    query =query.toLowerCase();
    console.log(query)


    const { blogs, isLoading } = useBlogs(`/post/search/${query}`);
    const foundBlogs = blogs.length > 0;

    const DataBlogs =   foundBlogs ?   
                        <> <Typography variant='h2' sx={{ mb: 2 }}>Resultados</Typography>   
                        <BlogList blogs={blogs} addMainCard={false}/> </>: 
                        <Error404 message='No se encontraron resultados para esta busqueda'/>                      

                        
  return (
    <div>
            
        <Typography variant='h1' component='h1' mb={2}>Busqueda: {query}</Typography>
    
        {
        isLoading
        ? <FullScreenLoading />
        : DataBlogs
        }
        
    </div>
  )
}
