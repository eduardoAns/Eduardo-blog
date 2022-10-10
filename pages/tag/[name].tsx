import { Typography } from '@mui/material'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { BlogList } from '../../components/blog'
import { BlogLayout } from '../../components/layouts'
import { FullScreenLoading } from '../../components/ui';
import { useBlogs } from '../../hooks';

const tagPage:NextPage = () => {

    const router = useRouter()
    const { name } = router.query
    const { blogs, isLoading } = useBlogs(`/post/tag/${name}`);
    const foundProducts = blogs.length > 0;

    const DataBlogs =   foundProducts ?   
                        <BlogList blogs={blogs} /> : 
                        <Typography variant='h2' sx={{ mb: 1 }}>No se encontraron blogs con este tag</Typography>


    return (
        <BlogLayout title={'Blog - Tags'} pageDescription={'Encuentra blogs a travez de los tag'}>
            <Typography variant='h1' component='h1' mb={2}>Buscar blog</Typography>
            
            <Typography variant='h1' component='h1' mb={2}>Tag: {name}</Typography>
            <Typography variant='h2' sx={{ mb: 2 }}>Resultados</Typography>   
        
            {
            isLoading
            ? <FullScreenLoading />
            : DataBlogs
            }
    
        </BlogLayout>
    )
}


export default tagPage
