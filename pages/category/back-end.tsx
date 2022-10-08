import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';
import { BlogList } from '../../components/blog';
import { initialPosts } from '../../database/blog';
import { useBlogs } from '../../hooks';

const BackEndPage: NextPage = ( ) => {
  
  const { blogs, isLoading } = useBlogs('/post/categoria/back-end');


   return (
    <BlogLayout title={'Blog - BackEnd'} pageDescription={'Encuentra blogs sobre Back-End'}>
        <Typography variant='h1' component='h1'>Back-end</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>

        <BlogList 
          blogs={ blogs}
        />
    

    </BlogLayout>
  )
}

export default BackEndPage
