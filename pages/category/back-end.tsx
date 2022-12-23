import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';
import { BlogList } from '../../components/blog';
import { initialPosts } from '../../database/blog';
import { useBlogs } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const BackEndPage: NextPage = ( ) => {
  
  const { blogs, isLoading } = useBlogs('/post/categoria/back-end');


   return (
    <BlogLayout title={'Blog - BackEnd'} pageDescription={'Encuentra los mejores blog sobre backend'}>
        <Typography variant='h1' component='h1' mb={2}>Back-end</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>
        {
          isLoading
            ? <FullScreenLoading />
            : <BlogList blogs={ blogs}/>
        }
            
    </BlogLayout>
  )
}

export default BackEndPage
