import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import { AddComent } from './AddComent'
import { BlogComentList } from './BlogComentList'
import { initialPosts } from '../../../database/blog';
import { Coment } from '../../../interfaces';

interface Props {
  coments: Coment[];
}

export const Coments:FC<Props> = ({coments}) => {
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
