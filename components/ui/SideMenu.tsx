import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined,AddCircleOutline, SourceOutlined, AutoAwesomeMosaicOutlined , SpeakerNotesOutlined, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/ui";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";


export const SideMenu = () => {

    const rol = {
        usuario : 1,
        cliente: 2,
        admin: 3
    }

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const [userId, setUserId] = useState<number>()
    const { user,userAuthorization ,isLoggedIn, logout} = useContext(  AuthContext );
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
      getUserId()
    }, [])
    

    const getUserId = async () => {
        const {idUsuario} = await userAuthorization()
        setUserId(idUsuario);
    }

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={toggleSideMenu}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {/* Inicio cliente */}   
                {
                    (user?.idRol == rol.cliente || user?.idRol == rol.admin ) && (
                        <>
                            <ListItem button onClick={() => navigateTo(`/user/profile/${userId}`)}>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/user/blogs/new')}>
                                <ListItemIcon>
                                    <AddCircleOutline/>
                                </ListItemIcon>
                                <ListItemText primary={'Agregar blog'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/user/blogs')}>
                                <ListItemIcon>
                                    <SourceOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Blogs'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/user/coments')}>
                                <ListItemIcon>
                                    <SpeakerNotesOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Comentarios'} />
                            </ListItem>
                        </>    
                    )
                }
                {/* Fin cliente */}   

                {/* Inicio categorias para celular */}   
                <Divider sx={{ display: { xs: '', sm: 'none' } }}/>
                <ListSubheader sx={{ display: { xs: '', sm: 'none' } }}>Categorias</ListSubheader>
                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/front-end')}>
                    <ListItemIcon>
                        <AutoAwesomeMosaicOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Front-end'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/back-end')}>
                    <ListItemIcon >
                        <AutoAwesomeMosaicOutlined sx={{transform:'scaleX(-1)'}}/>
                    </ListItemIcon>
                    <ListItemText primary={'Back-End'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/dev-op')}>
                    <ListItemIcon>
                        <AutoAwesomeMosaicOutlined sx={{transform:'rotate(90deg)'}}/>
                    </ListItemIcon>
                    <ListItemText primary={'Dev-Op'} />
                </ListItem>
                {/* Fin  categorias para celular */}   


                {/* Inicio ingresar/salir */}

                {
                    (isLoggedIn) 
                    ? (
                        <>
                            <Divider sx={{ display: { xs: '', sm: 'none' } }}/>
                            <ListSubheader sx={{ display: { xs: '', sm: 'none' } }}>Logout</ListSubheader>
                            <ListItem button onClick={logout}>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        </>
                    )
                    : (
                        <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }
                {/* Fin ingresar/salir */}



                {/* Inicio Admin */}
                {
                    (user?.idRol == rol.admin) && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button onClick={ () => navigateTo('/admin/blogs') }>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Posts'} />
                            </ListItem>
                            <ListItem button onClick={ () => navigateTo('/admin/users') }>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>    
                    )
                }
                {/* Fin Admin */}
            </List>
        </Box>
    </Drawer>
  )
}