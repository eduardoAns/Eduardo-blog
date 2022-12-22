import { Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, ComentContext } from '../../context';
import { useBlog } from '../../hooks';
import { useComent } from '../../hooks/useComent';
import { Coment } from '../../interfaces';
import { ActionsComent } from '../coments/ActionsComent';
import { FullScreenLoading } from '../ui';
import NextLink from 'next/link';


const columns: GridColDef[] = [
    { 
        field: 'Blog', 
        headerName: 'Blog', 
        width:150,
        renderCell: ({ row }: GridValueGetterParams ) => {
            return (
                <NextLink href={`/blog/${ row.idPost }`} passHref>
                    <Link underline='always' target={'_blank'}>
                        Ir al blog
                    </Link>
                </NextLink>
            )
        }
    },
    
    { field: 'contenido', headerName: 'Contenido',width: 250 },
    { 
        field: 'Actions', 
        headerName: 'Acciones',
        width: 450,
        renderCell: ({ row }: GridValueGetterParams ) => {
            return (
                <ActionsComent comment={row}/>
            )
        }
    },
    { field: 'fechaCreacion', headerName: 'fecha de creacion', width: 150 },

];

export const ComentList = () => {

    const [userId, setUserId] = useState<number>(0)
    const {userAuthorization} = useContext(AuthContext)
    const { coments, isLoading } = useComent(`/comentario/ByUserId/${userId}`, { refreshInterval: 1000 });
    const foundComents= coments.length > 0;
    const rows = coments!?.map( coment => ({
        id: coment.id,
        nombre: coment.nombre,
        idPost:coment.idPost,
        idUser:coment.idUser,
        fechaCreacion: coment.fechaCreacion,
        contenido: coment.contenido,
        estado:coment.estado
    }));

    const getUserId = async() => {
        const {idUsuario} = await userAuthorization()
        setUserId(idUsuario)
    }

    useEffect(() => {
        getUserId()
    }, [])
                  
    if (!foundComents) return <FullScreenLoading text='Este usuario no tiene comentarios' isError={true}/> 

  return (
        <Grid container className='fadeIn'>
            <Typography variant='h1' component='h1' mb={2}>{`comentarios: ${coments?.length}`} </Typography>
            
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
              <DataGrid 
                  rows={ rows }
                  rowHeight={75}
                  columns={ columns }
                  pageSize={ 10 }
                  rowsPerPageOptions={ [10] }
              />

            </Grid> 
            
        </Grid>
  )
}
