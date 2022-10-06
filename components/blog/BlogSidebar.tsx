import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FC } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';


interface Props {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  title: string;
}


export const BlogSidebar: FC<Props> = (props) => {
  const { description, social, title } = props;

  return (

    <Grid container spacing={3}>
        
        <Grid item xs={12} >
            <Box display='flex' justifyContent='center'>
            <Card sx={{ maxWidth: 300 }}>
                
                <CardActionArea sx={{ height: 500 }}>
                    <Box display='flex' flexDirection='row' justifyContent='center' mb={1}>
                        {social.map((network) => (
                            <Link
                            display="block"
                            variant="body1"
                            href="#"
                            key={network.name}
                            sx={{ mb: 0.5 }}
                            >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <network.icon />
                                <span>{network.name}</span>
                            </Stack>
                            </Link>
                        ))}
                    </Box>
                    
                    <CardMedia
                        component="img"
                        height="300"
                        image="/products/1740113-00-A_1.jpg"
                        alt="image"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Box>
        </Grid>
        
        
    </Grid>
  );
}