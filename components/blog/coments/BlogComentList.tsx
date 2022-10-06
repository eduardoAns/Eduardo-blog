import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { BlogComent } from './BlogComent'

interface Coment {
  user: String,
  content: String
}

interface Props {
  coments: Coment[]
}


export const BlogComentList:FC<Props> = ({coments}) => {
  return (
    <Grid item >
      {
        coments.map( coment => (
          <BlogComent coment={coment} />
        ))}
          


    </Grid>
  )
}
