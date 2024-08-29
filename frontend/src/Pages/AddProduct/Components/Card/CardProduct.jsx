import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Button, FloatingLabel } from 'flowbite-react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import styles from '../../Post.module.scss';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/joy/CardContent';
import ColorList from './ColorList';

const CardProduct = ({title, type, colors, setColors, price, setPrice }) => {
    return (
        <div>
            <Box>
                <Card
                    className={'2xl:w-12/12'}
                    sx={{ marginTop: 5 }}
                >
                    <div>
                        <Typography level="title-lg">
                            <FloatingLabel
                                disabled
                                value={title}
                                className="w-100 h-15"
                                variant="outlined"
                                placeholder="Заголовок"
                                sizing="sm"
                            />
                        </Typography>
                        <Typography level="body-sm">
                            <FloatingLabel
                                disabled
                                value={type}
                                className="w-100 h-15"
                                variant="outlined"
                                placeholder="Тип"
                                sizing="sm"
                            />
                        </Typography>

                    </div>
                    <ColorList colors={colors} setColors={setColors}/>
                    <CardContent orientation="horizontal">
                        <div>
                            <Typography  level="body-xs">

                                Цена (без учета
                                доставки) <br />
                            </Typography>
                            <Typography
                                fontSize="lg"
                                fontWeight="lg"
                            >
                                <FloatingLabel
                                    value={price} onChange={(e) => {setPrice(e.target.value)}}
                                    variant="outlined"
                                    placeholder="Цена"
                                    sizing="sm"
                                />
                            </Typography>
                        </div>
                        <ul
                            className={
                                styles.postDetails
                            }
                        >

                        </ul>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default CardProduct;