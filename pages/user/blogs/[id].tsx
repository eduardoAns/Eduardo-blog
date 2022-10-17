import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { BlogLayout } from '../../../components/layouts'
import React,{ useState} from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Blog, BlogFormulario } from '../../../interfaces';
import { SaveOutlined } from '@mui/icons-material';
import register from '../../auth/register';
import { useForm } from 'react-hook-form';
import { useBlog } from '../../../hooks';
import Cookies from 'js-cookie';
import blogApi from '../../../api/blogApi';
import { BlogForm } from '../../../components/blog';
import { FullScreenLoading } from '../../../components/ui';

const defectBlog:Blog = {
  idUsuario: 0,
  titulo: '',
  subtitulo: '',
  contenido: '',
  fechaCreacion: '',
  estado: '',
  categoria: {
    id: 0,
    nombre: '',
  },
  comentarios: [],
  tags: [],
  images: []
}

const BlogPage:NextPage = () => {

  const router = useRouter()
  let { id } = router.query as { id:string };
  
  const { blogData=defectBlog , isLoading } = useBlog(`/post/${id}`);



  return (
    <BlogLayout title={'Blog'} pageDescription={'Encuentra datos a tu blog'}>
        <Typography variant='h1' component='h1' mb={2}>añadir/editar Blog</Typography>

        {
          isLoading ? <FullScreenLoading /> : <BlogForm blog={blogData} />
        }

    </BlogLayout>
  )

}

export default BlogPage
