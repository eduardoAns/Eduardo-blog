import { Grid, Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Blog} from '../../interfaces';
import { BlogCard } from './BlogCard'

interface Props {
    blog: Blog;
}

export const BlogMain:FC<Props> = ({blog}) => {
  return (
    < >
        <Grid item xs={12}>
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle1' mb={2}>{blog.subtitulo}</Typography>
              <Typography variant='body1'>{blog.contenido }</Typography>
            </Box>
        </Grid>
        
        
    </>
  )
}
