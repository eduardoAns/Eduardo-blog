import { FC, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { Blog } from '../../interfaces'
import { BlogCard, BlogCardMain } from '.'

interface Props {
    blogs: Blog[];
    addMainCard?: boolean;
}

export const BlogList: FC<Props> = ({ blogs, addMainCard=true }) => {

    const lastBlogsData:Blog[] = addMainCard ? blogs.reverse().slice(1) : blogs.reverse()
    const [mainBlog] = useState<Blog>(blogs[blogs.length - 1])
    const [lastBlogs] = useState<Blog[]>(lastBlogsData)
    console.log(lastBlogs)

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
