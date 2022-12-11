import { FC } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';
import { Box, Container } from '@mui/material';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const BlogLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head> 

        <nav>
            <Navbar />
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
        }}>
            <Box maxWidth={'100%'} px={{xs:'2rem', md:'4rem'}}>
                { children }
            </Box>
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>

    </>
  )
}


