import { Box, Grid, Link, Typography } from '@mui/material';
import { BlogLayout } from '../../components/layouts';
import { BlogSlideshow, BlogSidebar, BlogMain} from '../../components/blog';
import { initialData } from '../../database/products';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Coments } from '../../components/blog/coments';
import { initialPosts } from '../../database/blog';


const product = initialData.products[0];
const blog = initialPosts[0];
const sidebar = {
  title: 'Sobre mi',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March', url: '#' },
    { title: 'February', url: '#' },
    { title: 'January', url: '#' },
    { title: 'November', url: '#' },
    { title: 'October', url: '#' },
    { title: 'September', url: '#' },
    { title: 'August', url: '#' },
    { title: 'July', url: '#' },
    { title: 'June', url: '#' },
    { title: 'May', url: '#' },
    { title: 'April', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const ProductPage = () => {
  return (
    <BlogLayout title={ blog.titulo } pageDescription={ blog.titulo }>
    
      <Grid container spacing={3}>

        {/* sidebar */}
        <Grid item xs={ 12 } sm={ 4 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1' mb={1}>{blog.titulo}</Typography>
            <Typography variant='h2' component='h2' mb={3}>{blog.fechaCreacion}, por eduardo ansa</Typography>
            
            <BlogSidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Box>
        </Grid>

        {/* Slideshow */}

        <Grid item xs={12} sm={ 7 } paddingRight={2}>
          <BlogSlideshow 
            images={ blog.images }
          />
        </Grid>

        {/* Tags */}
        <Grid item xs={12} sm={ 1 } borderLeft={'1px solid'} borderColor="gray">
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            <Typography variant="h1" gutterBottom sx={{ mt: 3 }}>Tags</Typography>
                {blog.tags.map((tag) => (
                    <Link display="block" variant="body1" href='' key={tag.nombre} mb={1}>
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
        <Coments />
      </Grid>
        
      
    </BlogLayout>
  )
}

export default ProductPage