import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { NextPage } from 'next'
import React, { useState } from 'react'
import blogApi from '../../api/blogApi';
import { BlogLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { Error404 } from '../../components/ui/Error404';
import { ComentList } from '../../components/user';
import { useComent } from '../../hooks/useComent';



const coments:NextPage = () => {

  const Authorization= Cookies.get('token')
                 
  return (

    <BlogLayout 
      // title={`Productos`} 
      title={`Comentarios`} pageDescription={'Encuentra todos tus comentarios'}    
    >
       {
            !Authorization ?
            <Error404 />
            :
            <ComentList />
        }
         
    </BlogLayout>
  )
}

export default coments