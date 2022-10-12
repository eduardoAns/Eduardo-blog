import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../components/layouts';
import { initialPosts } from '../database/blog';
import { BlogList } from '../components/blog';
import { useBlogs } from '../hooks';
import { FullScreenLoading } from '../components/ui';




const Home: NextPage = () => {
  const { blogs, isLoading } = useBlogs('/post');

  

  return (
    <BlogLayout title={'EduardoBlog - Home'} pageDescription={'Encuentra datos relacionados a la informatica'}>
        <Typography variant='h1' component='h1' mb={2}>Blog</Typography>
        <Typography variant='h2' sx={{ mb: 1 }} >Todos los Post</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <BlogList blogs={ blogs}/>
        }
    

    </BlogLayout>
  )
}

export default Home
