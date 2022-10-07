import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { Coment } from '../../../interfaces'
import { BlogComent } from './BlogComent'

interface Props {
  coments: Coment[]
}


export const BlogComentList:FC<Props> = ({coments}) => {
  return (
    <Grid item >
      {
        coments.map( coment => (
          <BlogComent coment={coment} key={coment.id}/>
        ))}
          


    </Grid>
  )
}
