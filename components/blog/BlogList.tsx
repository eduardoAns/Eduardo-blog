import { FC, useEffect, useMemo, useState } from 'react'
import { Grid } from '@mui/material'
import { Blog } from '../../interfaces'
import { BlogCard, BlogCardMain } from '.'

interface Props {
    blogs: Blog[];
    addMainCard?: boolean;
}

export const BlogList: FC<Props> = ({ blogs, addMainCard=true }) => {
    const dataBlogs: Blog[] = [...blogs]
    const lastBlogsData:Blog[] = addMainCard ? dataBlogs.reverse().slice(1) : dataBlogs.reverse()
    const [lastBlogs] = useState<Blog[]>(lastBlogsData)
    const [mainBlog] = useState<Blog>(blogs[blogs.length - 1])
    // console.log(lastBlogsData)
    // console.log(mainBlogData)


  return (
    <Grid container  spacing={4} height='100%'>
        {addMainCard && <BlogCardMain blog={mainBlog} />}
        <Grid item container spacing={4} height='100%' >
            {
                lastBlogs.map( blog => (
                    <BlogCard 
                        key={ blog.id }
                        blog={ blog }
                    />
                ))
            }
        </Grid>
        
    </Grid>
  )
}
