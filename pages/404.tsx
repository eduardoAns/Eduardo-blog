import { Box, Typography } from '@mui/material';
import { BlogLayout } from "../components/layouts";
import { Error404 } from '../components/ui/Error404';

const Custom404 = () => {
  return (
    <BlogLayout title='Page not found' pageDescription='No hay nada que mostrar aquí'>
        <Error404 />
    </BlogLayout>
  )
}

export default Custom404;