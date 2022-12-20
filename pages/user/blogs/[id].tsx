import { Typography } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { BlogLayout } from '../../../components/layouts'
import React,{ useContext, useEffect, useState} from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Blog, User } from '../../../interfaces';
import { useBlog } from '../../../hooks';
import { BlogForm } from '../../../components/blog';
import { FullScreenLoading } from '../../../components/ui';
import { Error404 } from '../../../components/ui/Error404';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../context';
import blogApi from '../../../api/blogApi';



const BlogPage:NextPage= () => {

  const router = useRouter()
  let { id } = router.query as { id:string };
  const { blogData , isLoading } = useBlog(`/post/${id}`);
  const {userAuthorization, userId} = useContext(AuthContext)
  const [isPermission, setIsPermission] = useState(false)

  const loginAuthorization = async () => {
    const data = await userAuthorization()
    if(data.idUsuario != blogData?.idUsuario){
      if(id === 'new' && data.idUsuario != 0) {
        setIsPermission(true)
      }
      return
    }
    setIsPermission(true)
  }
  
  loginAuthorization()



  return (
    <BlogLayout title={'Blog'} pageDescription={'Encuentra datos a tu blog'}>

        {
          !isPermission 
          ? <FullScreenLoading isError={true} text='Usuario no autorizado'/> 
          : isLoading ? <FullScreenLoading /> : <BlogForm blog={blogData} />
        }

        {/* {
          isPermission
          ? isLoading ?<FullScreenLoading /> :<BlogForm blog={blogData} />
          : <Error404 />
        } */}

    </BlogLayout>
  )

}


export default BlogPage
