import { FC } from 'react'
import { Grid } from '@mui/material'
import { Blog } from '../../interfaces'
import { BlogCard, BlogCardMain } from '.'

interface Props {
    blogs: Blog[];
    addMainCard?: boolean;
}

export const BlogList: FC<Props> = ({ blogs, addMainCard=true }) => {

    const mainBlog = blogs[blogs.length - 1]
    const lastBlogs = addMainCard ? blogs.reverse().slice(1) : blogs.reverse()
    console.log("mainBlog", mainBlog)
    console.log("lastBlogs",lastBlogs)

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
