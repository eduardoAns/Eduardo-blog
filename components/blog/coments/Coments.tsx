import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import  AddComent  from './AddComent'
import { BlogComentList } from './BlogComentList'
import { initialPosts } from '../../../database/blog';
import { Blog, Coment } from '../../../interfaces';

interface Props {
  blog: Blog;
}

export const Coments:FC<Props> = ({blog}) => {
  return (
    <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' mb={4} >Comentarios</Typography>
        </Grid>
        <BlogComentList coments={blog.comentarios}   />
        <AddComent idBlog = {blog.id}/>

    </Grid>
  )
}
