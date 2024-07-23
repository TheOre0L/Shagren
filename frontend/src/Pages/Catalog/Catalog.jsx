import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { AuthHeader } from '../../components/AuthHeader';
import { Header } from '../../components/Header';
import CustomizedSnackbars from '../../components/Message/notification_msg';
import Post from '../../components/CartProduct';
import { $api, API_URL } from '../../http';
import { Context } from '../../index';
import styles from './Catalog.module.scss';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ComponentFooter from '../../components/Footer/Footer';

const Catalog = observer(() => {
    const { store } = useContext(Context);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComm, setIsLoadingComm] = useState(false);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState();
    const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
    const [totalItems, setTotalItems] = useState(0); // Состояние для общего количества товаров
    const itemsPerPage = 9; // Количество товаров на странице

    // Загрузка данных при изменении текущей страницы
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        setIsLoading(true);
        try {
            const response = await $api.get(`http://localhost:5000/api/v1.0/product/items?page=${page}&limit=${itemsPerPage}`);
            setData(response.data.items); // Предполагается, что API возвращает массив items
            setTotalItems(response.data.total); // Предполагается, что API возвращает общее количество товаров
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Обработчик изменения страницы
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (isLoading || isLoadingComm) {
        return <Post isLoading={isLoading} />;
    }

    return (
        <>
            {store.isAuth ? <AuthHeader /> : <Header />}
            {store.is_message ? (
                <CustomizedSnackbars
                    text={store.message}
                    is_msg={store.is_message}
                    color={store.color_msg}
                />
            ) : null}
            <div className="container">
                <h2 className='font-mont text-2xl text-center mb-3'>Каталог товаров</h2>
                <Box className="w-11/12 ml-auto mr-auto">
                    <AccordionGroup
                        sx={{
                            [`& .${accordionClasses.root}`]: {
                                marginTop: '0.5rem',
                                transition: '0.2s ease',
                                ['& button:not([aria-expanded="true"])']: {
                                    transition: '0.2s ease',
                                    paddingBottom: '0.625rem',
                                },
                                '& button:hover': {
                                    background: 'transparent',
                                },
                            },
                            [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                                bgcolor: 'background.level4',
                                borderRadius: 'md',
                                borderBottom: '1px solid',
                                borderColor: 'background.level2',
                            },
                            '& [aria-expanded="true"]': {
                                boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
                            },
                        }}
                    >
                        <div className="2xl:w-12/12">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>Фильтры</Typography>
                                </AccordionSummary>
                                <AccordionDetails></AccordionDetails>
                            </Accordion>
                        </div>
                    </AccordionGroup>
                </Box>
                <div className={`${styles.catalogContainer} container`}>
                    {data.map((item, index) => (
                        <Post
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            images={item.images}
                            categ={item.categ}
                            type={item.type}
                            accordions={item.accordions}
                            commentsCount={item.commentsCount}
                            colors={item.colors}
                            price={item.price}
                            isLiked={item.isLiked}
                        >
                            <Markdown children={item.description} />
                        </Post>
                    ))}
                </div>
                <div className="flex justify-center mt-3">
                    <Pagination 
                        count={Math.ceil(totalItems / itemsPerPage)} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        shape="rounded" 
                    />
                </div>
                <ComponentFooter />
            </div>
        </>
    );
});
export default hot(Catalog);
