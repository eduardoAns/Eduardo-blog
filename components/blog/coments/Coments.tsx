import { Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import  AddComent  from './AddComent'
import { BlogComentList } from './BlogComentList'
import { initialPosts } from '../../../database/blog';
import { Blog, Coment } from '../../../interfaces';
import { useBlog } from '../../../hooks';
import axios from 'axios';
import blogApi from '../../../api/blogApi';

interface Props {
  blog: Blog;
}

export const Coments:FC<Props> = ({blog}) => {
  

  // const { blogData, isLoading } = useBlog(`/post/${blog.id}`);
  // if (isLoading) return <Typography variant='h1'>Cargando...</Typography>

  const [blogData, setData] = useState<Blog>(blog);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    blogApi(`/post/${blogData.id}`)
      .then(({data}) => {
        setData(data)
        console.log(data)
        setLoading(false);
      })
  }, [])


  return (
    <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' mb={4} >Comentarios</Typography>
        </Grid>
        <BlogComentList coments={blogData?.comentarios}   />
        <AddComent idBlog = {blogData.id}/>

    </Grid>
  )
}
