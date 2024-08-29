import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Link, useParams } from 'react-router-dom';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';
import { Button, Modal } from 'flowbite-react';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import 'easymde/dist/easymde.min.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImagesUploading from './Components/ImagesUploading/ImagesUploading';
import MainInputs from './Components/Inputs/MainInputs';
import Accordions from './Components/AccordionsGroup/Accordions';
import CardProduct from './Components/Card/CardProduct';
import { Context } from '../../index';
import $api from '../../http';
import Add from '@mui/icons-material/Add';

const AddProduct = ({
    isFullPost,
    isLiked,
}) => {
    const [isLike, setIsLike] = useState(isLiked);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [type, setInputType] = useState('');
    const [categ, setInputCateg] = useState('');
    const [categId, setInputCategId] = useState('');
    const [typeId, setInputTypeId] = useState('');
    const [typeList, setTypeList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const { store } = useContext(Context);
    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [newEntry, setNewEntry] = useState('');
    const [addType, setAddType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [accordions, setAccordions] = useState([
        {
            id: 1,
            title: 'Описание',
            content: '',
        },
    ]);
    const [colors, setColors] = useState([]);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        document.title = 'Каталог | Shagren Shop';
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const types = await $api.post(`http://localhost:5000/api/v1.0/product/type?action=get&subjet=type`);
            const category = await $api.post(`http://localhost:5000/api/v1.0/product/type?action=get&subjet=category`);
            setTypeList(types.data.type);
            setCategoryList(category.data.categories);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async (index) => {
        if (index === 0 && !categId) return;
        if (index === 1 && !typeId) return;

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (index === steps.length - 1) {
            const response = await $api.post(`http://localhost:5000/api/v1.0/product/?action=added`, {
                title, description, price, images, typeId, categId, accordions, colors,
            });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleAddNewEntry = async () => {
        try {
            if (addType === 'category') {
                const response = await $api.post(`http://localhost:5000/api/v1.0/product/category?action=add`, {
                    title: newEntry,
                });
                setCategoryList([...categoryList, response.data]);
                setInputCategId(response.data.id);
            } else if (addType === 'type') {
                const response = await $api.post(`http://localhost:5000/api/v1.0/product/type?action=add`, {
                    title: newEntry,
                });
                setTypeList([...typeList, response.data]);
                setInputTypeId(response.data.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setOpenDialog(false);
            setNewEntry('');
        }
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
                        freeSolo
                        id="combo-box-demo"
                        inputValue={categ}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                setOpenDialog(true);
                                setAddType('category');
                                setNewEntry(newValue);
                            } else if (newValue && newValue.inputValue) {
                                setOpenDialog(true);
                                setAddType('category');
                                setNewEntry(newValue.inputValue);
                            } else {
                                setInputCategId(newValue?.id || '');
                            }
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputCateg(newInputValue);
                        }}
                        getOptionLabel={(option) => option.title || option.inputValue || ''}
                        options={categoryList}
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
                        freeSolo
                        inputValue={type}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                setOpenDialog(true);
                                setAddType('type');
                                setNewEntry(newValue);
                            } else if (newValue && newValue.inputValue) {
                                setOpenDialog(true);
                                setAddType('type');
                                setNewEntry(newValue.inputValue);
                            } else {
                                setInputTypeId(newValue?.id || '');
                            }
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputType(newInputValue);
                        }}
                        id="combo-box-demo"
                        getOptionLabel={(option) => option.title || option.inputValue || ''}
                        options={typeList}
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
                <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
                    <div className={styles.wrapper}>
                        <div className={styles.imageWrapper}>
                            <ImagesUploading images={images} setImages={setImages} isFullPost={true} />
                        </div>
                        <div className={styles.indention}>
                            <MainInputs setDescription={setDescription} setTitle={setTitle} title={title} description={description} type={type} isFullPost={true} />
                            <Accordions setAccordions={setAccordions} accordions={accordions} />
                            <CardProduct title={title} type={type} colors={colors} setColors={setColors} price={price} setPrice={setPrice} />
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="container ml-auto mr-auto" style={{ width: '70%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={index === 2 ? <Typography variant="caption">Последний шаг</Typography> : null}
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
                                            disabled={(index === 0 && !categId) || (index === 1 && !typeId)}
                                        >
                                            {index === steps.length - 1 ? 'Добавить' : 'Продолжить'}
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
                        <Typography>Все шаги завершены, товар добавлен!</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Заново
                        </Button>
                    </Paper>
                )}
            </div>

            <Modal show={openDialog} onClose={() => setOpenDialog(false)}>
                <Modal.Header>Добавить новую {addType === 'category' ? 'категорию' : 'тип'}</Modal.Header>
                <Modal.Body>
                    <TextField
                        label={addType === 'category' ? 'Новая категория' : 'Новый тип'}
                        value={newEntry}
                        onChange={(e) => setNewEntry(e.target.value)}
                        fullWidth
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddNewEntry}>Добавить</Button>
                    <Button color="gray" onClick={() => setOpenDialog(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default hot(AddProduct);
