import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import styles from '../../Post.module.scss';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import { Button } from 'flowbite-react';

const ColorList = ({colors, setColors}) => {
    const [open, setOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newId, setNewId] = useState('');

    // Обработчик для открытия модального окна
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Обработчик для закрытия модального окна
    const handleClose = () => {
        setOpen(false);
    };

    // Обработчик для добавления нового цвета
    const handleAddColor = () => {
        if (newColor) {
            setColors([
                ...colors,
                { color: newColor, id: colors.length + 1 },
            ]);
            setNewColor('');
            handleClose(); // Закрыть модальное окно после добавления
        }
    };
    // Обработчик для удаления цвета
    const handleDeleteColor = (id) => {
        setColors(colors.filter((color) => color.id !== id));
    };

    return (
        <div>
            <Box>
                <ul
                    className={
                        styles.postDetails
                    }
                >
                    <List>
                        {colors.map(
                            (color) => (
                                <ListItem
                                    key={
                                        color.id
                                    }
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleDeleteColor(
                                                    color.id
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            color.color
                                        }
                                    />
                                </ListItem>
                            )
                        )}
                    </List>
                    <IconButton
                        color="primary"
                        onClick={
                            handleClickOpen
                        }
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </ul>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Добавить цвет
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Цвет"
                        variant="outlined"
                        value={newColor}
                        onChange={(e) =>
                            setNewColor(
                                e.target
                                    .value
                            )
                        }
                        size="small"
                        style={{
                            marginBottom:
                                '16px',
                            width: '100%',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={
                            handleClose
                        }
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={
                            handleAddColor
                        }
                        color="primary"
                    >
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ColorList;