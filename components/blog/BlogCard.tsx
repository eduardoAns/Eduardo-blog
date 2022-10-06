import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Button } from '@mui/material'

import { Blog, IProduct } from '../../interfaces'

interface Props {
    blog: Blog;
}

export const BlogCard: FC<Props> = ({ blog }) => {

    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
          ? blog.images[1].url
          : blog.images[0].url;

    }, [isHovered, blog.images])

    return (
      <Grid item 
            xs={12} 
            sm={ 6 }
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) } 
      >
          <Card>
              <NextLink href="/blog/id" passHref prefetch={ false }>
                <Link>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="400"
                            image={ productImage }
                            alt={ blog.titulo }
                        />

                    </CardActionArea>
                </Link>
              </NextLink>
              
          </Card>

          <Box sx={{ mt: 1 }} className='fadeIn'>
              <Typography fontWeight={700} mb={1}>{ blog.titulo}</Typography>
              <Typography fontWeight={350} mb={1}>{ blog.fechaCreacion }</Typography>
              <Typography
                mb={1}
                fontWeight={500}
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}
                variant="body2">
                { blog.contenido}
            </Typography>
          </Box>

          <Button color='warning'>Ver mas</Button>      
        </Grid>
    )
}
