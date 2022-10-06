import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '../../context/ui';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }
    
  return (
    <AppBar sx={{ bgcolor: 'secondary.light' }}>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6' color={'white'}>Eduardo |</Typography>
                    <Typography sx={{ ml: 0.5 }} color={'white'}>Blog</Typography>
                </Link>  
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className="fadeIn">
                <NextLink href='/category/front-end' passHref>
                    <Link>
                        <Button color={asPath === '/category/front-end'?'info':'secondary'}>Front-end</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/back-end' passHref>
                    <Link>
                        <Button color={asPath === '/category/back-end'?'info':'secondary'}>Back-end</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/dev-op' passHref>
                    <Link>
                        <Button color={asPath === '/category/dev-op'?'info':'secondary'}>Dev-Op</Button>
                    </Link>
                </NextLink>
                
                
            </Box>


            <Box flex={ 1 } />

            {/* Pantallas pantallas grandes */}
            {
                    isSearchVisible 
                        ? (
                            <Input
                                
                                color='info'
                                sx={{ display: { xs: 'none', sm: 'flex' } } }
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                            
                                        >
                                            <ClearOutlined 
                                                color='info'
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined
                                color='info' />
                        </IconButton>
                    )
                }

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined 
                        color='info'/>
                </IconButton>

        

            <Button color={'secondary'} onClick={toggleSideMenu}>
                    Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}
