import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';

import { initialPosts } from '../../database/blog';
import { BlogList } from '../../components/blog';
import { useBlogs } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const FrontEndPage: NextPage = () => {

  const { blogs, isLoading } = useBlogs('/post/categoria/front-end');

    return (
      
      <BlogLayout title={'Blog - FrontEnd'} pageDescription={'Encuentra los mejores accesorios para mascotas aquí'}>
          <Typography variant='h1' component='h1' mb={2}>Front-End</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Encuentra todos los blos relacionados a esta area</Typography>
  
          {
          isLoading
            ? <FullScreenLoading />
            : <BlogList blogs={ blogs}/>
         }
  
    
      </BlogLayout>
    )
}

export default FrontEndPage
