import { Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, ComentContext } from '../../context';
import { useComent } from '../../hooks/useComent';
import { ActionsComent } from '../coments/ActionsComent';
import { FullScreenLoading } from '../ui';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'fechaCreacion', headerName: 'fecha de creacion', width: 150 },
    { field: 'contenido', headerName: 'Contenido',width: 400 },
    { 
        field: 'Actions', 
        headerName: 'Acciones',
        width: 600,
        renderCell: ({ row }: GridValueGetterParams ) => {
            return (
                <ActionsComent comment={row}/>
            )
        }
    },
];

export const ComentList = () => {

    const router = useRouter();
    const [userId, setUserId] = useState<number>(0)
    const {userAuthorization} = useContext(AuthContext)


    const getUserId = async() => {
        const {idUsuario} = await userAuthorization()
        setUserId(idUsuario)
    }
    
    useEffect(() => {
        getUserId()
    }, [])
    
    const { coments, isLoading } = useComent(`/comentario/ByUserId/${userId}`);
    console.log(coments)
    const foundComents = coments.length > 0;

    const rows = coments!.map( coment => ({
        id: coment.id,
        nombre: coment.nombre,
        idPost:coment.idPost,
        idUser:coment.idUser,
        fechaCreacion: coment.fechaCreacion,
        contenido: coment.contenido,
        estado:coment.estado
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
