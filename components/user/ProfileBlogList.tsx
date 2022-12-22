import { CardMedia, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { Blog } from '../../interfaces'
import NextLink from 'next/link';


interface Props {
    blogs:Blog[]
}

const columns: GridColDef[] = [
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
                <NextLink href={`/blog/${ row.id }`} passHref>
                    <Link underline='always' target={"_blank"}>
                        { row.titulo}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'fechaCreacion', headerName: 'fecha de creacion', width: 200 },

];

export const ProfileBlogList:FC<Props> = ({blogs}) => {

    const rows = blogs!.map( blog => ({
        id: blog.id,
        img:blog.images[0].url, 
        fechaCreacion: blog.fechaCreacion,
        titulo: blog.titulo,
    }));

  return (
    <Grid container className='fadeIn'>
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
