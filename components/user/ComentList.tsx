import { Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import blogApi from '../../api/blogApi';
import { useComent } from '../../hooks/useComent';
import { FullScreenLoading } from '../ui';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'fechaCreacion', headerName: 'fecha de creacion', width: 200 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'contenido', headerName: 'Contenido',width: 500 },
    { field: 'idUsuario', headerName: 'idUsuario',width: 150},
    { field: 'idPost', headerName: 'idPost',width: 150 },
];

export const ComentList = () => {
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
    useEffect(() => {
        checkToken()
    }, [])
    
    const { coments, isLoading } = useComent(`/comentario/ByUserId/${userId}`);
    console.log(coments)
    const foundComents = coments.length > 0;

    const rows = coments!.map( coment => ({
        id: coment.id,
        nombre: coment.nombre,
        fechaCreacion: coment.fechaCreacion,
        contenido: coment.contenido,
        idUsuario: coment.idUser,
        idPost: coment.idPost
    }));
                  
    if (!foundComents) return <FullScreenLoading text='Este usuario no tiene comentarios' isError={true}/> 

  return (
        <Grid container className='fadeIn'>
            <Typography variant='h1' component='h1' mb={2}>{`comentarios: ${coments?.length}`} </Typography>
            
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
