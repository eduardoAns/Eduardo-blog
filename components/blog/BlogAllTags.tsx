import { Box, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import blogApi from '../../api/blogApi';
import { Tag } from '../../interfaces';

interface Props {
    allTags:Tag[]
}

export const BlogAllTags:FC<Props> = ({allTags}) => {

    
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={{xs:'start', md:'center'}} >
        <Box justifyContent={'center'} mb={{xs:8, md:4}} >
            <Typography variant='h1'>Te puede interesar:</Typography>
        </Box>
        <Grid container >

            {allTags &&
                allTags.map(tag => (
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

