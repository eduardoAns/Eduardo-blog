import { CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { GridColDef, DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import blogApi from '../../api/blogApi';
import { useBlogs } from '../../hooks';
import { FullScreenLoading } from '../ui';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({ row }: GridValueGetterParams ) => {
            return (
                <a href={ `/blog/${ row.id }` } target="_blank" rel="noreferrer">
                    <CardMedia 
                        component='img'
                        alt={ row.titulo }
                        className='fadeIn'
                        image={ row.img }
                    />
                </a>
            )
        }
    },
    {   field: 'titulo', 
        headerName: 'Titulo', 
        width: 350,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/user/blogs/${ row.id }`} passHref>
                    <Link underline='always'>
                        { row.titulo}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'subtitulo', headerName: 'Subtitulo',width: 350},
    { field: 'fechaCreacion', headerName: 'fecha de creacion', width: 200 },
    { field: 'categoria', headerName: 'Categoria',width: 100}, 
    {
        field: 'check',
        headerName: 'Editar Blog',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={ `/user/blogs/${ row.id }` } target="_blank" rel="noreferrer" >
                    Editar Blog
                </a>
            )
        }
    },
];

export const BlogsList = () => {

    const [userId, setUserId] = useState<number>(0)
    const checkToken = async() => {

        const Authorization= Cookies.get('token')
        if ( !Authorization ) return
        try {
            const { data } = await blogApi.get('/validtoken', {'headers':{'Authorization': Authorization}});
            const user = data;
            setUserId(user.id)
        } catch (error) {
            console.log(error)
        }
    }
    checkToken();
    const { blogs, isLoading } = useBlogs(`/post/ByUserId/${userId}`);
    const foundBlogs = blogs.length > 0;

    const rows = blogs!.map( blog => ({
        id: blog.id,
        img:blog.images[0].url, 
        fechaCreacion: blog.fechaCreacion,
        titulo: blog.titulo,
        subtitulo: blog.subtitulo,
        idUsuario: blog.idUsuario,
        categoria: blog.categoria.nombre
    }));
                    
    if (!foundBlogs) return <FullScreenLoading text='Este usuario no tiene blogs' isError={true} /> 

    return (
        <Grid container className='fadeIn'>
            <Typography variant='h1' component='h1' mb={2}>{`blogs: ${blogs?.length}`} </Typography>
            
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid> 
                
        </Grid>
    )
}
