import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../components/layouts';
import { initialPosts } from '../database/blog';
import { BlogList } from '../components/blog';


const Home: NextPage = () => {
  return (
    <BlogLayout title={'EduardoBlog - Home'} pageDescription={'Encuentra datos relacionados a la informatica'}>
        <Typography variant='h1' component='h1'>Blog</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los Post</Typography>

        <BlogList 
          blogs={ initialPosts}
        />
    

    </BlogLayout>
  )
}

export default Home
