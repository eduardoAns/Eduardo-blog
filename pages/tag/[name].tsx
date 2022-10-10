import { Typography } from '@mui/material'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { BlogList } from '../../components/blog'
import { BlogTagSearch } from '../../components/blog/BlogTagSearch';
import { BlogLayout } from '../../components/layouts'
import { FullScreenLoading } from '../../components/ui';
import { useBlogs } from '../../hooks';

const tagPage:NextPage = () => {


    return (
        <BlogLayout title={'Blog - Tags'} pageDescription={'Encuentra blogs a travez de los tag'}>
            <Typography variant='h1' component='h1' mb={2}>Filtrando blogs por tag</Typography>
            <BlogTagSearch />
        </BlogLayout>
    )
}


export default tagPage
