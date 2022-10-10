import { Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useBlogs } from '../../hooks';
import { Blog } from '../../interfaces';
import { BlogCard } from './BlogCard'



export const BlogsRelacionados = () => {

    const [blogsData, setblogsData] = useState<Blog[]>([]);
    const { blogs, isLoading } = useBlogs('/post');

    useEffect(() => {
        const lastBlogs = blogs.slice(blogs.length-3).reverse();
        setblogsData(lastBlogs);
    }, [ isLoading ])


  return (
    <Grid item xs={12}>
        <Typography variant='h1' component='h2' mb={4} >Blogs relacionados</Typography>
        <Grid container item xs={12} spacing={3}>
            {
                blogsData.map( blog => (
                    <BlogCard blog={blog} key={blog.id} xs={12} sm={4}/>
            ))}

        </Grid>    
    </Grid>

    
  )
}
