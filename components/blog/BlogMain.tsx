import { Grid, Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Blog, Coment, Tag} from '../../interfaces';
import { BlogAllTags } from './BlogAllTags';
import { BlogCard } from './BlogCard'

interface Props {
    blog: Blog;
    allTags:Tag[]
}

export const BlogMain:FC<Props> = ({blog, allTags}) => {
  return (
    < >
        <Grid item xs={12}>
            <Grid container sx={{ mt:3 }}>
              <Grid item xs={12} md={8} sx={{mb:3}}>
                <Typography variant='h1' mb={2}>{blog.subtitulo}</Typography>
                <Box width={'100%'} className='contenido-img'>
                  <div style={{width:'100%', display:'flex', flexDirection:'column'}} dangerouslySetInnerHTML={{ __html: blog.contenido }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} >
                <BlogAllTags allTags={allTags}/>
              </Grid>
              
            </Grid>

        </Grid>
        
        
    </>
  )
}
