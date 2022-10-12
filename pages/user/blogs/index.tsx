import Cookies from 'js-cookie'
import { NextPage } from 'next'
import React from 'react'
import { BlogLayout } from '../../../components/layouts'
import { Error404 } from '../../../components/ui/Error404'
import { BlogsList } from '../../../components/user'

const blogs:NextPage = () => {

    const Authorization= Cookies.get('token')
    
  return (
    <BlogLayout 
      title={`Blogs`} pageDescription={'Encuentra todos tus blogs'}    
    >
        {
            !Authorization ?
            <Error404 />:
            <BlogsList />
        }
         
    </BlogLayout>
  )
}

export default blogs