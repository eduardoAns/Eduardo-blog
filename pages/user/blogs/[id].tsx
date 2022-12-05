import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { BlogLayout } from '../../../components/layouts'
import React,{ useState} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Blog } from '../../../interfaces';
import { useBlog } from '../../../hooks';
import { BlogForm } from '../../../components/blog';
import { FullScreenLoading } from '../../../components/ui';
import { Error404 } from '../../../components/ui/Error404';



const BlogPage:NextPage = () => {

  const router = useRouter()
  let { id } = router.query as { id:string };
  const { blogData , isLoading } = useBlog(`/post/${id}`);

  
  // const blog = isError == undefined ? defectBlog : blogData;
  
  // if(isError == undefined && id !='new') return <Error404 />


  return (
    <BlogLayout title={'Blog'} pageDescription={'Encuentra datos a tu blog'}>

        {
          isLoading ? <FullScreenLoading /> : <BlogForm blog={blogData} />
        }

    </BlogLayout>
  )

}

export default BlogPage
