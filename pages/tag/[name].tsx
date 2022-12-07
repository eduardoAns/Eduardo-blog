import { Typography } from '@mui/material'
import { NextPage } from 'next';
import React from 'react'
import { TagSearch } from '../../components/ui/TagSearch';
import { BlogLayout } from '../../components/layouts'


const tagPage:NextPage = () => {


    return (
        <BlogLayout title={'Blog - Tags'} pageDescription={'Encuentra blogs a travez de los tag'}>
            <Typography variant='h1' component='h1' mb={2}>Blogs</Typography>
            <TagSearch />
        </BlogLayout>
    )
}


export default tagPage
