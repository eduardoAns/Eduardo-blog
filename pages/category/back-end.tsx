import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { BlogLayout } from '../../components/layouts';
import { BlogList } from '../../components/blog';
import { initialPosts } from '../../database/blog';

const BackEndPage: NextPage = ( ) => {
  

   return (
    <BlogLayout title={'Blog - BackEnd'} pageDescription={'Encuentra blogs sobre Back-End'}>
        <Typography variant='h1' component='h1'>Back-end</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todo sobre esta area</Typography>

        <BlogList 
          blogs={ initialPosts}
        />
    

    </BlogLayout>
  )
}

export default BackEndPage
