import { Grid, Typography } from '@mui/material'
import React from 'react'
import { AddComent } from './AddComent'
import { BlogComentList } from './BlogComentList'
import { initialPosts } from '../../../database/blog';

const coments = initialPosts[0].comentarios

export const Coments = () => {
  return (
    <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' mb={4} >Comentarios</Typography>
        </Grid>
        <BlogComentList coments={coments}   />
        <AddComent />

    </Grid>
  )
}
