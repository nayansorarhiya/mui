import * as React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Divider from '@mui/material/Divider/Divider';
import CustomButton from '../../CustomButton';
import { Search, SearchIconWrapper, StyledInputBase, LogoTypography, Connected } from '../../CustomStyles';
import ConnectionModal from '../../modals/ConnectionModal';
import { useWeb3React } from '@web3-react/core';
import { Button, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import card_img from '../../../assets/images/cart_image.svg'
import close from '../../../assets/images/close.svg'
import vector from '../../../assets/images/vector.svg'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import eth from '../../../assets/images/eth.svg';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 280;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: '0px',
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header(props) {

    const navigate = useNavigate();
    const profile = () => {

        navigate(`/profile`);

    }
    const { active, account, deactivate } = useWeb3React();
    const theme = useTheme();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [topdrawerwidth, setTopDrawerwidth] = React.useState(280);

    const [open, setOpen] = React.useState(false);

    const [cartopen, setCartOpen] = React.useState(false);

    const [cartvariant, setCartVariant] = React.useState({
        view: '', width: '', direction: ''
    });

    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    React.useEffect(() => {
        setCartVariant({ view: isMobile ? 'persistent' : 'persistent', width: isMobile ? 0 : 280, direction: isMobile ? 'bottom' : 'right' })
        setTopDrawerwidth(isMobile ? '100%' : 280);
        props.setcartWidth(0);
    }, [isMobile])

    const handleDrawerOpen = () => {
        setCartOpen(true);
        !isMobile && props.setcartWidth(280);
    };
    const handleDrawerClose = () => {
        setCartOpen(false);
        props.setcartWidth(0);
    };

    const ConnectModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        if (active) {
            setOpen(false);
        }
        // console.log(open, active)
    }, [active])


   
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            className="menulist"
        >
            <MenuItem onClick={props.onClickTheme} sx={{ display: { sm: 'block', md: 'none' } }}>
                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 32 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 32 }} />}
            </MenuItem>
            <MenuItem>
                discover
            </MenuItem>
            <Divider />
            <MenuItem>
                states
            </MenuItem>
            <Divider />
            <MenuItem>
                staking
            </MenuItem>
            <Divider />
            <MenuItem>
                sell
            </MenuItem>
            <MenuItem onClick={profile}>
                Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => active ? deactivate() : ConnectModal()}>
                {active ? <Connected > </Connected> :
                    <CustomButton sx={{ whiteSpace: 'nowrap' }} variant="contained">Connect Wallet </CustomButton>
                }
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: '5px' }}>
                <CssBaseline />
                <Box sx={{ boxShadow: `1px 0px 0px  ${theme.palette.primary.borderDrawer}`, background: alpha(theme.palette.primary.main, 1), display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                    {/* <DoubleArrowOutlinedIcon
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ m: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </DoubleArrowOutlinedIcon> */}
                </Box>
                <AppBar position="fixed" sx={{ boxShadow: theme.palette.mode === 'dark' ? '0px 1px 0px #343742' : '0px 1px 0px rgba(0, 0, 0, 0.1)', background: alpha(theme.palette.primary.main, 1), minHeight: '64px', justifyContent: 'center' }}>
                    <Toolbar>
                        <Box>
                            <LogoTypography />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Container>
                            <Grid container
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around', alignItems: 'center', position: 'relative',
                                }}>
                                <Grid item lg={4.5} >
                                    <Search sx={{ display: 'flex' }}>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search items, collections and profiles "
                                            inputProps={{ 'aria-label': 'search' }}
                                            sx={{ width: '50vw' }}
                                        />
                                    </Search>
                                </Grid>
                                <Grid item >
                                    <Box sx={{ display: { lg: 'flex', xs: 'none' }, color: alpha(theme.palette.primary.dark) }} className="menulist">
                                        <Box>
                                            <MenuItem>
                                                discover
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem>
                                                states
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem>
                                                staking
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem>
                                                sell
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem onClick={profile}>
                                                Profile
                                            </MenuItem>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
                            <Box onClick={props.onClickTheme} sx={{
                                pl: 0, '&:hover,&:focus': {
                                    backgroundColor: alpha(theme.palette.primary.main, 1),
                                }, display: 'flex', alignItems: 'center', pr: 2
                            }}>
                                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 32, cursor: 'pointer' }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 32, cursor: 'pointer' }} />}
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { lg: 'flex', xs: 'none' } }}>
                            <Box sx={{
                                pl: 0,
                                cursor: 'pointer',
                                pr: 2,
                                '&:hover': { backgroundColor: 'none' },
                            }} onClick={() => active ? deactivate() : ConnectModal()}>
                                {active ? <Connected > </Connected> :
                                    <CustomButton sx={{ whiteSpace: 'nowrap' }} variant="contained">Connect Wallet </CustomButton>
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{ padding: 0, }} onClick={!cartopen ? handleDrawerOpen : handleDrawerClose}>
                                <Badge badgeContent={1} color="error">
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
                                </Badge>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                            <MenuItem
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon fontSize="large" />
                            </MenuItem>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                <ConnectionModal open={open && !active} onClose={handleClose}></ConnectionModal>

                <Drawer
                    sx={{
                        // width: drawerWidth,
                        width: { xs: '0', sm: '0', md: topdrawerwidth, lg: topdrawerwidth },
                        background: alpha(theme.palette.primary.main, 1),
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: topdrawerwidth,
                            boxSizing: 'border-box',
                            // mt: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                            // pb: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                            mt: 8.1,
                            background: alpha(theme.palette.primary.main, 1),
                            // position: { xs: 'fixed', sm: 'fixed', md: 'relative', lg: 'relative' },
                            // position: 'fixed',
                            maxHeight: '100%',
                            zIndex: 1,
                        },
                    }}
                    variant={cartvariant.view}
                    anchor={cartvariant.direction}
                    open={cartopen}
                >

                    <Divider />
                    <Box sx={{ padding: '30px 20px 20px 20px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Box sx={{ fontSize: '22px', lineHeight: '120%' }}>My Cart</Box>
                                {/* <MenuItem sx={{ mt: 0.4 }} >
                                    <Badge badgeContent={1} sx={{backgroundColor: '#485FE6'}}>
                                    </Badge>
                                </MenuItem> */}
                                <Box sx={{ border: '1px solid', width: '1.5rem', display: 'flex', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#485FE6', borderColor: '#485FE6', color: '#ffffff' }}>
                                    1
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '16px', lineHeight: '21px', color: '#485FE6', mt: 0.5, cursor: 'pointer' }}>Clear</Box>
                        </Box>

                        <Box sx={{ width: '100%', py: 0.5 }}>
                            <Box sx={{
                                display: 'flex', mb: 3
                            }}>
                                <Box sx={{
                                    display: 'flex', width: '100%', alignItems: 'center', cursor: 'pointer',
                                    padding: '0.5rem',
                                    '&:hover,&:focus': {
                                        backgroundColor: alpha(theme.palette.primary.main, 1),
                                        borderRadius: '15px'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={card_img} />
                                    </Box>
                                    <Box sx={{
                                        cursor: 'pointer', position: 'relative', bottom: '20px',
                                        right: '10px'
                                    }}>
                                        {/* <img src={close} /> */}
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11" cy="11" r="10" fill="#91939B" stroke={alpha(theme.palette.primary.main, 1)} stroke-width="2" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83433 6.77424C7.54144 6.48135 7.06656 6.48135 6.77367 6.77424C6.48078 7.06714 6.48078 7.54201 6.77367 7.8349L9.99645 11.0577L6.77367 14.2805C6.48078 14.5733 6.48078 15.0482 6.77367 15.3411C7.06656 15.634 7.54144 15.634 7.83433 15.3411L11.0571 12.1183L14.2799 15.3411C14.5728 15.634 15.0476 15.634 15.3405 15.3411C15.6334 15.0482 15.6334 14.5733 15.3405 14.2805L12.1178 11.0577L15.3405 7.8349C15.6334 7.54201 15.6334 7.06714 15.3405 6.77424C15.0476 6.48135 14.5728 6.48135 14.2799 6.77424L11.0571 9.99702L7.83433 6.77424Z" fill="white" />
                                        </svg>

                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                <Box sx={{ marginRight: '0.5rem', fontSize: '14px' }}>
                                                    7258
                                                </Box>
                                                <span style={{ display: 'flex' }}>
                                                    {/* <img src={vector} /> */}
                                                    <InfoRoundedIcon sx={{ color: '#EB5757', width: '18px' }} />
                                                </span>
                                            </span>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Box sx={{ fontSize: '14px' }}>
                                                    97.99
                                                </Box>
                                                <span style={{ display: 'flex' }}>
                                                    <img src={eth} />
                                                </span>
                                            </Box>

                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                                Mutant Ape Yacht club
                                            </Box>
                                            <Box>
                                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                                    $207.55k
                                                </Box>
                                            </Box>
                                        </Box>

                                    </Box>
                                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <Box sx={{ textAlign: 'left' }}>
                                            Mutant Ape Yacht club
                                        </Box>
                                    </Box> */}
                                </Box>

                            </Box>
                        </Box>
                        <Divider sx={{ borderBottomWidth: 1.5, color: '#D9DADC' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                            <Box sx={{ fontSize: '22px', fontWeight: 600, lineHeight: '120%', textTransform: 'capitalize', color: '#91939B', display: 'flex', alignItems: 'center' }}>
                                You pay
                            </Box>
                            <Box >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: '6px' }}>
                                    <Box sx={{ fontSize: '14px' }}>
                                        97.99
                                    </Box>
                                    <img src={eth} />
                                </Box>
                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                    $207.55k
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, alignItems: 'center' }}>

                        </Box>
                        <Box>
                            <Button sx={{
                                background: 'linear-gradient(90deg, #E875D2 0%, #642CC8 100%)', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none', '&:hover,&:focus': {
                                    border: '1px solid #485FE6',
                                }
                            }}>Buy Now</Button>
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <Button sx={{
                                background: '#485FE6', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none',
                                '&:hover,&:focus': {
                                    border: '1px solid #485FE6',
                                }
                            }}>Proceed to Checkout</Button>
                        </Box>
                    </Box>
                </Drawer>
            </Box >

        </>
    );
}
