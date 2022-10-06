import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';

import { initialPosts } from '../../database/blog';
import { BlogList } from '../../components/blog';

const FrontEndPage: NextPage = () => {

    return (
      
      <BlogLayout title={'Blog - FrontEnd'} pageDescription={'Encuentra los mejores accesorios para mascotas aquí'}>
          <Typography variant='h1' component='h1'>Front-End</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>
  
          <BlogList 
            blogs={ initialPosts}
          />
  
    
      </BlogLayout>
    )
}

export default FrontEndPage
