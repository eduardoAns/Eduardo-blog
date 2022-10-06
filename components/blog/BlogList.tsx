import { FC } from 'react'
import { Grid } from '@mui/material'
import { Blog, IProduct } from '../../interfaces'
import { BlogCard } from '.'

interface Props {
    blogs: Blog[];
}

export const BlogList: FC<Props> = ({ blogs }) => {

  return (
    <Grid container spacing={4}>
        {
            blogs.map( blog => (
                <BlogCard 
                    key={ blog.id }
                    blog={ blog }
                />
            ))
        }
    </Grid>
  )
}
