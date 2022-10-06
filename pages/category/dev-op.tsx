import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';

import { initialPosts } from '../../database/blog';
import { BlogList } from '../../components/blog';


const DevOpPage: NextPage = () => {

  

    return (
      <BlogLayout title={'Blog - DevOp'} pageDescription={'Encuentra los mejores juguetes para mascotas aqui'}>
          <Typography variant='h1' component='h1'>Dev-Op</Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>
      
          <BlogList 
            blogs={ initialPosts}
          />        
      </BlogLayout>
    )
}

export default DevOpPage

