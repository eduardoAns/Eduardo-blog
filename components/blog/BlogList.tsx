import { FC, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Blog } from '../../interfaces'
import { BlogCard, BlogCardMain } from '.'

interface Props {
    blogs: Blog[];
    addMainCard?: boolean;
}

export const BlogList: FC<Props> = ({ blogs, addMainCard=true }) => {

    const [mainBlog, setMainBlog] = useState<Blog>()
    const [lastBlogs, setLastBlogs] = useState<Blog[]>([])

    useEffect(() => {
        setMainBlog(blogs[blogs.length - 1])
        const lastBlogsData = addMainCard ? blogs.reverse().slice(1) : blogs.reverse()
        setLastBlogs(lastBlogsData)
    }, [])

    
    
    

  return (
    <Grid container  spacing={4}>
        {addMainCard && <BlogCardMain blog={mainBlog} />}
        {
            lastBlogs.map( blog => (
                <BlogCard 
                    key={ blog.id }
                    blog={ blog }
                />
            ))
        }
    </Grid>
  )
}
