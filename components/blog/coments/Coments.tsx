import { Grid, Typography } from '@mui/material'
import React from 'react'
import { AddComent } from './AddComent'
import { BlogComentList } from './BlogComentList'

const coments = [{
    user: 'usuario 1',
    content: 'content 1'
},
{
    user: 'usuario 2',
    content: 'content 2'
},
{
    user: 'usuario 3',
    content: 'content 3'
}]

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
