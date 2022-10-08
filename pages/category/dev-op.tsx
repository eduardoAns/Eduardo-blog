import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';

import { initialPosts } from '../../database/blog';
import { BlogList } from '../../components/blog';
import { useBlogs } from '../../hooks';


const DevOpPage: NextPage = () => {

  const { blogs, isLoading } = useBlogs('/post/categoria/dev-op');


    return (
      <BlogLayout title={'Blog - DevOp'} pageDescription={'Encuentra los mejores juguetes para mascotas aqui'}>
          <Typography variant='h1' component='h1'>Dev-Op</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>
      
          <BlogList 
            blogs={ blogs}
          />        
      </BlogLayout>
    )
}

export default DevOpPage

