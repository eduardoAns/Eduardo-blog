import { Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect, useState } from 'react'
import  AddComent  from './AddComent'
import { BlogComentList } from './BlogComentList'
import { initialPosts } from '../../database/blog';
import { Blog, Coment } from '../../interfaces';
import { useBlog } from '../../hooks';
import axios from 'axios';
import blogApi from '../../api/blogApi';
import { ComentContext } from '../../context/coment';

interface Props {
  idBlog: number;
}

export const Coments:FC<Props> = ({idBlog}) => {

  // const { blogData, isLoading } = useBlog(`/post/${blog.id}`);
  // if (isLoading) return <Typography variant='h1'>Cargando...</Typography>

  return (
    <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' mb={4} >Comentarios</Typography>
        </Grid>
        <BlogComentList idBlog = {idBlog}  />
        <AddComent idBlog = {idBlog}/>

    </Grid>
  )
}
