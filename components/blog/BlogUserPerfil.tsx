import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { FC, useEffect, useState} from 'react'
import { Card, CardMedia, CardContent, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { FullScreenLoading } from '../ui';
import { SocialMedia } from '../../interfaces';


interface Props {
    idUsuario: number;
}

type SocialMediaIcon = ReadonlyArray<
    {   icon: React.ElementType; 
        name: string;
        url?:string
    }
>

interface SocialMediaIcons {
    icon: React.ElementType; 
    name: string;
    url?:string
}


const DEFAULT_SOCIAL:SocialMediaIcons[]=[
    { name: 'Git', icon: GitHubIcon},
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Linkedin', icon: LinkedInIcon },
    { name: 'Web', icon: LanguageIcon},
]   



export const BlogUsePerfil: FC<Props> = (props) => {
  const { idUsuario } = props;
  const { user, isLoading } = useUser(`/usuario/${idUsuario}`, { refreshInterval: 1000 });
  const [social, setSocial] = useState<SocialMediaIcons[]>([])
    
  const socialMediasUser:SocialMedia[] = user?.socialMedias || [];

  useEffect(() => {
    getSocialMediaUser()
  }, [socialMediasUser])
  

  const getSocialMediaUser = () => {
    if(socialMediasUser.length == 0) return
    let socialMediaUserList:SocialMediaIcons[] =[]

    for (let socialMedia of DEFAULT_SOCIAL) {
        for(let socialMediaUser of socialMediasUser) {
            if(socialMedia.name.toLowerCase() === socialMediaUser.nombre.toLocaleLowerCase()){
                socialMediaUserList.push({...socialMedia, url: socialMediaUser.url})
            }
        }
    }

    setSocial(socialMediaUserList)
  }

//   if(socialMediasUser.length > 0) {
//     getSocialMediaUser()
//   }
  


  if(isLoading) return <FullScreenLoading />
  return (

    <Grid container spacing={3}>
        <Grid item xs={12} >
            <Box display='flex'  sx={{ height: 'auto'}} >
                <Card sx={{width:'100%'}}> 
                    <Box display={"flex"} alignItems={'center'} flexDirection={{xs:'column', md:'row'}}>
                        <Box sx={{ maxWidth: 170}}>
                            <NextLink href={`/user/profile/${idUsuario}`} passHref >
                                <Link underline='none'>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '100%', borderRadius:'100%', bgcolor:'yellow' }}
                                        image={user?.avatar[0] ? user?.avatar[0].url :  "/1740113-00-A_1.jpg"}
                                        alt={"image"}      
                                    />
                                </Link>
                            </NextLink>
                        </Box>
                            
                        <CardContent >
                            <Typography component="h2" variant="h5">
                            {user?.nombre + ' ' + user?.apellidoPaterno}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                            {user?.email}
                            </Typography>
                            <Typography variant="body1" paragraph>
                            {user?.descripcion}
                            </Typography>
                            <Box display='flex' flexDirection='row' flexWrap={"wrap"} justifyContent='center' mb={1}>
                                {social?.map((socialM) => (
                                    socialM.url !== undefined 
                                    ?
                                    <a href={socialM.url} key={socialM.name} target='_blank' rel="noreferrer" style={{marginRight:'0.25rem'}}>
                                        <Link
                                            display="block"
                                            variant="body1"
                                            sx={{ mb: 0.5 }}
                                        >
                                            <Stack direction="row" spacing={0} alignItems="center">
                                                <socialM.icon />
                                                <span>{socialM.name}</span>
                                            </Stack>
                                        </Link>
                                    </a>
                                    :
                                    null
                                ))}
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        </Grid>
    </Grid>


  );
}