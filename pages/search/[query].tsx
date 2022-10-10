import { Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { BlogLayout } from '../../components/layouts'
import { QuerySearch } from '../../components/ui'

const SearchPage:NextPage = () => {
  return (
    <BlogLayout title={'Blog - Tags'} pageDescription={'Encuentra blogs a travez de los tag'}>
        <Typography variant='h1' component='h1' mb={2}>Filtrando blogs por busqueda</Typography>
        <QuerySearch />
    </BlogLayout>
  )
}

export default SearchPage

