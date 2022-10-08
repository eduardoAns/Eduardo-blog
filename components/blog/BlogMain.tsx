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
        <Grid item xs={12}>
          <Typography variant='h1' component='h2' mb={4} >Blogs relacionados</Typography>
          <Grid container spacing={3}>

            <BlogCard blog={blog} />
            <BlogCard blog={blog} />
            <BlogCard blog={blog} />

          </Grid>    

        </Grid>
        
    </>
  )
}
