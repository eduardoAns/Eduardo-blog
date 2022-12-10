import Cookies from 'js-cookie';
import { NextPage } from 'next'
import React from 'react'
import { BlogLayout } from '../../../components/layouts';
import { Error404 } from '../../../components/ui/Error404';
import { ComentList } from '../../../components/user';

const coments:NextPage = () => {

  const Authorization= Cookies.get('token')
                 
  return (

    <BlogLayout 
      title={`Comentarios`} pageDescription={'Encuentra todos tus comentarios'}    
    >
       {
            !Authorization ?
            <Error404 />:
            <ComentList />
        } 
    </BlogLayout>
  )
}

export default coments