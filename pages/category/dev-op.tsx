import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { BlogList } from '../../components/blog';
import { useBlogs } from '../../hooks';
import { Error404 } from '../../components/ui/Error404';


const DevOpPage: NextPage = () => {

  const { blogs, isLoading } = useBlogs('/post/categoria/dev-op');
  const foundBlogs = blogs.length > 0;
  const blogList = foundBlogs ? <BlogList blogs={ blogs} /> : <Error404 message='No se encontraron blogs en esta categoria'/>

    return (
      <BlogLayout title={'Blog - DevOp'} pageDescription={'Encuentra los mejores blog sobre devop'}>
          <Typography variant='h1' component='h1' mb={2}>Dev-Op</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>
      
          {
            isLoading 
            ? <FullScreenLoading />
            : blogList
          }

              
      </BlogLayout>
    )
}

export default DevOpPage

