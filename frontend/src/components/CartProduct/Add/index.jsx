import clsx from 'clsx';
import { useState, useRef, useCallback, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';
import BasicModal from '../../ShareModal/ShareModal';
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
import { SimpleMdeReact } from 'react-simplemde-editor';
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

const Post = ({
    images,
    commentsCount,
    children,
    isFullPost,
    isLoading,
    isLiked,
    isEditable,
    isPreview,
}) => {
    const [isLike, setIsLike] = useState(isLiked);
    const [newColor, setNewColor] = useState('');
    const [newId, setNewId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
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

    const [open, setOpen] = useState(false);

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
        if (newColor && newId) {
            setColors([
                ...colors,
                { color: newColor, id: parseInt(newId, 10) },
            ]);
            setNewColor('');
            setNewId('');
            handleClose(); // Закрыть модальное окно после добавления
        }
    };
    // Обработчик для удаления цвета
    const handleDeleteColor = (id) => {
        setColors(colors.filter((color) => color.id !== id));
    };

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

    const handleAddAccordion = useCallback(() => {
        setAccordions((prevAccordions) => [
            ...prevAccordions,
            {
                id: prevAccordions.length + 1,
                title: 'Новый аккордион',
                content: '',
            },
        ]);
    }, []);

    const handleRemoveAccordion = useCallback((index) => {
        setAccordions((prevAccordions) =>
            prevAccordions.filter((_, i) => i !== index)
        );
    }, []);

    const handleTitleChange = useCallback(
        (index, event) => {
            const newAccordions = [...accordions];
            newAccordions[index].title = event.target.value;
            setAccordions(newAccordions);
        },
        [accordions]
    );

    const handleContentChange = useCallback(
        (index, value) => {
            const newAccordions = [...accordions];
            newAccordions[index].content = value;
            setAccordions(newAccordions);
        },
        [accordions]
    );

    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) return;

            const newAccordions = Array.from(accordions);
            const [removed] = newAccordions.splice(result.source.index, 1);
            newAccordions.splice(result.destination.index, 0, removed);

            setAccordions(newAccordions);
        },
        [accordions]
    );

    const renderAccordions = useMemo(
        () => (
            <div>
                {accordions.map((accordion, index) => (
                    <Draggable
                        key={accordion.id}
                        draggableId={String(accordion.id)}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${styles.accordionItem} m-2`}
                            >
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${accordion.id}-content`}
                                        id={`panel${accordion.id}-header`}
                                        {...provided.dragHandleProps}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <DragHandleIcon />
                                                <TextField
                                                    value={accordion.title}
                                                    onChange={(event) =>
                                                        handleTitleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    variant="outlined"
                                                    size="small"
                                                    margin="none"
                                                    className={
                                                        styles.accordionTitle
                                                    }
                                                />
                                            </Box>
                                            <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                    handleRemoveAccordion(index)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Textarea
                                            value={accordion.content}
                                            onChange={(e) => {
                                                handleContentChange(
                                                    index,
                                                    e.target.value
                                                );
                                                console.log(e.target.value);
                                            }}
                                            placeholder="Введите текст..."
                                            required
                                            rows={4}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        ),
        [
            accordions,
            handleTitleChange,
            handleContentChange,
            handleRemoveAccordion,
        ]
    );

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
                                        {images && images.length > 0 && (
                                            <div
                                                className={`${clsx(
                                                    styles.image,
                                                    {
                                                        [styles.imageFull]:
                                                            isFullPost,
                                                    }
                                                )}  rounded-lg border-2 border-dashed`}
                                            >
                                                <div
                                                    className={`h-96 sm:h-[38.2rem] xl:h-[38.2rem] 2xl:h-[30rem] p-2`}
                                                >
                                                    <Carousel>
                                                        {images.map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={image}
                                                                    alt={`Product image ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                    </Carousel>
                                                </div>
                                                <div className="flex w-full items-center justify-center p-2">
                                                    <Label
                                                        htmlFor="dropzone-file"
                                                        className="flex h-96 rounded-md w-full cursor-pointer flex-col items-center justify-center border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                    >
                                                        <div className="flex flex-col items-center justify-center ">
                                                            <svg
                                                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">
                                                                    Нажмите
                                                                    чтобы
                                                                    загрузить
                                                                    картинки
                                                                </span>{' '}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                SVG, PNG, JPG or
                                                                GIF
                                                            </p>
                                                        </div>
                                                        <FileInput
                                                            id="dropzone-file"
                                                            className="hidden"
                                                        />
                                                    </Label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.indention}>
                                        <h2
                                            className={`${clsx(styles.title, {
                                                [styles.titleFull]: isFullPost,
                                            })} m-2 h-14 rounded-lg border-2 border-dashed`}
                                        >
                                            <FloatingLabel
                                            value={title}
                                            onChange={(e) => {setTitle(e.target.value)}}
                                                className="w-100 h-15"
                                                variant="outlined"
                                                placeholder="Заголовок"
                                                sizing="sm"
                                            />
                                        </h2>
                                        <ul className={`m-2 `}>
                                            <li key={type}>
                                                <FloatingLabel
                                                value={type}
                                                    className={`w-100`}
                                                    variant="outlined"
                                                    disabled
                                                    placeholder="Тип"
                                                    sizing="sm"
                                                />
                                            </li>
                                        </ul>
                                        <Box className="m-2 rounded-lg border-2 border-dashed">
                                            <SimpleMdeReact
                                                className={`${styles.editor} w-12/12 m-2 font-mont `}
                                                options={{
                                                    spellChecker: false,
                                                    maxHeight: '150px',
                                                    placeholder:
                                                        'Самое главное описание товара ',
                                                    status: false,
                                                    autosave: {
                                                        enabled: true,
                                                        delay: 1000,
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <div
                                            className={
                                                'm-2 rounded-lg border-2 border-dashed'
                                            }
                                        >
                                            <Box
                                                textAlign="center"
                                                marginBottom={2}
                                            >
                                                <IconButton
                                                    color="primary"
                                                    onClick={handleAddAccordion}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <DragDropContext
                                                onDragEnd={onDragEnd}
                                            >
                                                <Droppable droppableId="accordions">
                                                    {(provided) => (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            className={`${styles.accordionContainer} m-2`}
                                                        >
                                                            {renderAccordions}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>{' '}
                                        </div>
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
                                                        <TextField
                                                            label="ID"
                                                            variant="outlined"
                                                            type="number"
                                                            value={newId}
                                                            onChange={(e) =>
                                                                setNewId(
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
                                                <CardContent orientation="horizontal">
                                                    <div>
                                                        <Typography level="body-xs">
                                                            Цена (без учета
                                                            доставки) <br />
                                                        </Typography>
                                                        <Typography
                                                            fontSize="lg"
                                                            fontWeight="lg"
                                                        >
                                                            <FloatingLabel
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
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        </>
    );
};

export default hot(Post);
