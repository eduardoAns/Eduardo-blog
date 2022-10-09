import { Box, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import blogApi from '../../api/blogApi';
import { BlogList } from '../../components/blog'
import { BlogLayout } from '../../components/layouts'
import { Blog } from '../../interfaces';

interface Props{
    blogs: Blog[];
    foundProducts: boolean;
    name: string;
}

const tagPage:NextPage<Props> = ({ blogs, foundProducts, name }) => {

    return (
        <BlogLayout title={'Blog - Tags'} pageDescription={'Encuentra blogs a travez de los tag'}>
            <Typography variant='h1' component='h1' mb={2}>Buscar blog</Typography>
            
            {
            foundProducts 
                ? (
                    <>
                        <Typography variant='h1' component='h1' mb={2}>Tag: {name}</Typography>
                        <Typography variant='h2' sx={{ mb: 2 }}>Resultados</Typography>
                    </>
                )
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }} mb={2}>No encontramos ningún blog</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} mb={2} color="secondary" textTransform="capitalize">Tag: {name}</Typography>
                    </Box>
                )
        }
    
            <BlogList 
              blogs={ blogs}
            />
        
    
        </BlogLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    let { name = '' } = params as { name: string };

    // name = name.charAt(0).toUpperCase() + name.slice(1)

    // if ( name.length === 0 ) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: true
    //         }
    //     }
    // }

    
    let {data} = await blogApi.get(`/post/tag/${name}`);
    let blogs = data
    // let products = initialData.products
    const foundProducts = blogs.length > 0;
    // si no hay productos
    // TODO: retornar otros productos
    if ( !foundProducts ) {
        const {data} = await blogApi.get(`/post`);
        blogs = data
    }

    console.log()

    return {
        props: {
            blogs,
            foundProducts,
            name
        }
    }
}

export default tagPage
