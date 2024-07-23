import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import './BurgerMenu.css'; // Создадим CSS файл для анимаций

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState('main');

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleMenuClick = (menu: string) => () => {
    setMenu(menu);
  };

  const handleBackClick = () => {
    setMenu('main');
  };

  const renderMenuItems = () => {
    if (menu === 'main') {
      return (
        <CSSTransition key="main" timeout={300} classNames="fade">
          <div className="menu-content">
            <ListItem button onClick={handleMenuClick('bags')}>
              <ListItemText primary="Сумки" />
            </ListItem>
            <ListItem button onClick={handleMenuClick('cases')}>
              <ListItemText primary="Чехлы" />
            </ListItem>
          </div>
        </CSSTransition>
      );
    } else if (menu === 'bags') {
      return (
        <CSSTransition key="bags" timeout={300} classNames="fade">
          <div className="menu-content">
          <Button className='mb-2' onClick={handleBackClick}><ArrowBackIcon className='mr-2'/>Назад</Button>
            <ListItem button>
              <ListItemText primary="Рюкзаки" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Поясные сумки" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Клатчи" />
            </ListItem>
          </div>
        </CSSTransition>
      );
    } else if (menu === 'cases') {
      return (
        <CSSTransition key="cases" timeout={300} classNames="fade">
          <div className="menu-content">
          <Button className='mb-2' onClick={handleBackClick}><ArrowBackIcon className='mr-2'/>Назад</Button>
            <ListItem button>
              <ListItemText primary="Чехлы для телефонов" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Чехлы для ноутбуков" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Чехлы для планшетов" />
            </ListItem>
            
          </div>
        </CSSTransition>
      );
    }
  };

  return (
    <div>
      <Navbar expand="lg">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 350,
              transition: 'width 0.3s ease-in-out',
            },
          }}
        >
          <Box sx={{ transition: 'opacity 0.3s ease-in-out', opacity: open ? 1 : 0 }}>
            <IconButton className='mx-3 mt-3' onClick={toggleDrawer(false)}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <TransitionGroup className={"p-4"}>
              {renderMenuItems()}
            </TransitionGroup>
          </Box>
        </Drawer>
      </Navbar>
    </div>
  );
};

export default BurgerMenu;
