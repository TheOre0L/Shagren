import clsx from 'clsx';
import { useState, useRef, useCallback, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';
import BasicModal from '../../components/ShareModal/ShareModal';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Carousel, Breadcrumb, Button } from 'flowbite-react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import ButtonMU from '@mui/joy/Button';
import 'easymde/dist/easymde.min.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import TypographyMU from '@mui/joy/Typography';
import Markdown from 'react-markdown';
import { Textarea } from 'flowbite-react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FileInput, Label, FloatingLabel } from 'flowbite-react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { $api, API_URL } from '../../http';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ImagesUploading from './Components/ImagesUploading/ImagesUploading';
import MainInputs from './Components/Inputs/MainInputs';
import Accordions from './Components/AccordionsGroup/Accordions';
import CardProduct from './Components/Card/CardProduct';
const AddProduct = ({
    isFullPost,
    isLoading,
    isLiked,
}) => {
    const [isLike, setIsLike] = useState(isLiked);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([])
    const [type, setInputType] = useState('');
    const [categ, setInputCateg] = useState('');
  
    const [accordions, setAccordions] = useState([
        {
            id: 1,
            title: 'Описание',
            content: '',
        },
    ]);
    const [colors, setColors] = useState([
        { color: '🟠', id: 1 },
    ]);

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = (index) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (index === steps.length - 1) {
            console.log(accordions);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    if (isLoading) {
        return <PostSkeleton />;
    }
    const steps = [
        {
            label: 'Выбор категории товара',
            description: (
                <>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        inputValue={categ}
                        onInputChange={(event, newInputValue) => {
                          setInputCateg(newInputValue);
                        }}
                        options={[
                            { label: 'Сумка'},
                        ]}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Категория товара" />
                        )}
                    />
                </>
            ),
        },
        {
            label: 'Выбор типа товара',

            description: (
              <>
                  <Autocomplete
                      disablePortal
                      inputValue={type}
                      onInputChange={(event, newInputValue) => {
                        setInputType(newInputValue);
                      }}
                      id="combo-box-demo"
                      options={[
                          { label: 'Шоппер'},
                      ]}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                          <TextField {...params} label="Тип товара" />
                      )}
                  />
              </>
          ),
        },
        {
            label: 'Добавление товара',
            description: (
                <>
                    <>
                        <div
                            className={clsx(styles.root, {
                                [styles.rootFull]: isFullPost,
                            })}
                        >
                            <>
                                <div className={styles.wrapper}>
                                    <div className={styles.imageWrapper}>
                                        {(
                                            <ImagesUploading images={images} setImages={setImages} isFullPost={true} />
                                        )}
                                    </div>
                                    <div className={styles.indention}>
                                        <MainInputs setDescription={setDescription} setTitle={setTitle} title={title} description={description} type={type} isFullPost={true}/>
                                        <Accordions setAccordions={setAccordions} accordions={accordions}/>
                                        <CardProduct title={title} type={type} colors={colors} setColors={setColors}/>
                                    </div>
                                </div>
                            </>
                        </div>
                    </>
                </>
            ),
        },
    ];

    return (
        <>
            <div
                className={'container ml-auto mr-auto'}
                style={{ width: '70%' }}
            >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">
                                            Последний шаг
                                        </Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            color={'primary'}
                                            className="text-black"
                                            onClick={() => handleNext(index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1
                                                ? 'Добавить'
                                                : 'Продолжить'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                            variant="contained"
                                            color={'primary'}
                                            className="text-black"
                                        >
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            Все шаги завершены, товар добавлен!
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Заново
                        </Button>
                    </Paper>
                )}
            </div>
        </>
    );
};

export default hot(AddProduct);
