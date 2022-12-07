import { Box, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import blogApi from '../../api/blogApi';
import { Tag } from '../../interfaces';


export const BlogAllTags:FC = () => {

    const [tags, setTags] = useState<Tag[]>()

    const getTags = async () => {
        const {data} = await blogApi.get('/tag')
        console.log(data)
        setTags(data)
    }

    useEffect(() => {
      getTags()
    
    }, [])
    
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <Box justifyContent={'center'} mb={2}>
            <Typography variant='h1'>Te puede interesar:</Typography>
        </Box>
        <Grid container >

            {tags &&
                tags.map(tag => (
                    <Grid item xs={4} md={12} key={tag.id} mb={1}>
                        <NextLink href={`/tag/${ tag.nombre }`} passHref>
                            <Link underline='always'>
                                <Typography variant='subtitle1' textAlign={'center'}>{tag.nombre}</Typography>
                            </Link>
                        </NextLink>
                    </Grid>
                ))
            }
        </Grid>
        
   
    </Box>
  )
}

