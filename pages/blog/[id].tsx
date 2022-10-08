import { Box, Grid, Link, Typography } from '@mui/material';
import { BlogLayout } from '../../components/layouts';
import { BlogSlideshow, BlogSidebar, BlogMain} from '../../components/blog';
import { initialData } from '../../database/products';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Coments } from '../../components/blog/coments';
import { initialPosts } from '../../database/blog';
import blogApi from '../../api/blogApi';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Blog } from '../../interfaces';


const sidebar = {
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

interface Props {
  blog: Blog
}

const ProductPage:NextPage<Props> = ({blog}) => {
  return (
    <BlogLayout title={ blog.titulo } pageDescription={ blog.titulo }>
    
      <Grid container spacing={3}>

        {/* sidebar */}
        <Grid item xs={ 12 } sm={ 4 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1' mb={1}>{blog.titulo}</Typography>

            <BlogSidebar
              social={sidebar.social}
              blog={blog}
            />
          </Box>
        </Grid>

        {/* Slideshow y tags*/}

        <Grid item xs={12} sm={ 8 } paddingRight={2}>
          {/* Slideshow */}
          <BlogSlideshow 
            images={ blog.images }
          />
          {/* Tags pantalla grande */}
          <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <Typography variant="h5" gutterBottom >Tags:</Typography>
                  {blog.tags.map((tag) => (
                      <Link display="flex" variant="button" href='' key={tag.id} mb={1} ml={1}>
                      {tag.nombre}
                      </Link>
                  ))}
            </Box>
          </Grid>
        </Grid>

        {/* Tags pantalla pequeña */}

        <Grid item xs={12} sx={{ display: { xs: '', sm: 'none' } }}>
          <Typography variant="h1" gutterBottom sx={{ mt: 2 }} display='flex' flexDirection='row' justifyContent='center' >Tags</Typography>
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
                {blog.tags.map((tag) => (
                    <Link display="flex" variant="button" href='' key={tag.id} mb={1} ml={1}>
                    {tag.nombre}
                    </Link>
                ))}
          </Box>
        </Grid>

      </Grid>

      {/* main */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <BlogMain blog={ blog } />
      </Grid>

      {/* coments */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Coments coments={blog.comentarios} />
      </Grid>
        
      
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

  const {data} = await blogApi.get('/post/listaId')
  const productosId = data

  return {
    paths: productosId.map( (id:string) => ({  
      params: {
        id
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  

  const { id = '' } = params as { id: string };

  const {data} = await blogApi.get(`/post/ ${parseInt(id)}`);

  const blog = data
  

  if ( !blog ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      blog
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage