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
              <Grid container >
              
                <Grid item xs={12} md={8}>
                  <Typography variant='h1' mb={2}>{blog.subtitulo}</Typography>
                  <Typography variant='body1'><div dangerouslySetInnerHTML={{ __html: blog.contenido }} /></Typography>
                </Grid>
                
                
              </Grid>
              
            </Box>
        </Grid>
        
        
    </>
  )
}
