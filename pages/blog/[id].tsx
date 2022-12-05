import { Box, Grid, Link, Typography } from '@mui/material';
import { BlogLayout } from '../../components/layouts';
import { BlogSlideshow, BlogUsePerfil, BlogMain} from '../../components/blog';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Coments } from '../../components/coments';
import blogApi from '../../api/blogApi';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Blog } from '../../interfaces';
import { BlogsRelacionados } from '../../components/blog/BlogsRelacionados';


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

        {/* Titulos Perfil de usuario */}
        <Grid item xs={ 12 } md={ 6 }>
          <Box display='flex' flexDirection='column'>

            {/* titulo */}
            <Typography variant='h1' component='h1' mb={1}>{blog.titulo}</Typography>
            <Typography variant='h5' component='h2' mb={1}>{`Categoria: ${blog.categoria.nombre}`}</Typography>
            <Typography variant='h2' component='h2' mb={3}>{blog.fechaCreacion}, por :</Typography>
              <BlogUsePerfil
                social={sidebar.social}
                blog={blog}
              />
          </Box>
        </Grid>

        {/* Slideshow y tags*/}

        <Grid item xs={12} md={ 6 } paddingRight={2}>
            {/* Slideshow */}
            <BlogSlideshow 
              images={ blog.images }
            />
            {/* Tags pantalla grande */}
            <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box display='flex' flexDirection='row' justifyContent='center' flexWrap={'wrap'} alignItems='center' >
              <Typography variant="h5" gutterBottom >Tags:</Typography>
                    {blog.tags.map((tag) => (
                        <Link display="flex" variant="button" href={`/tag/${tag.nombre}`} key={tag.id} mb={1} ml={1}>
                        {tag.nombre}
                        </Link>
                    ))}
              </Box>
            </Grid>
        </Grid>

        {/* Tags pantalla pequeña */}

        <Grid item xs={12} sx={{ display: { xs: '', sm: 'none' } }}>
          <Typography variant="h1" gutterBottom sx={{ mt: 2 }} display='flex' flexDirection='row' justifyContent='center' >Tags</Typography>
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' flexWrap={'wrap'} >
                {blog.tags.map((tag) => (
                    <Link display="flex" variant="button" href={`/tag/${tag.nombre}`} key={tag.id} mb={1} ml={1}>
                    {tag.nombre}
                    </Link>
                ))}
          </Box>
        </Grid>

      </Grid>

      {/* main */}
      <Grid container spacing={3} sx={{ mt: 3 }} >
        <BlogMain blog={ blog } />
      </Grid>

      {/* blogs relacionados */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <BlogsRelacionados />
      </Grid>

      {/* coments */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Coments idBlog={blog.id!!} />
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
    revalidate: 60*60*24
  }
}

export default ProductPage