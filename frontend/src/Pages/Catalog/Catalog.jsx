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
    const [data, setData] = useState();
    const [comment, setComment] = useState();

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
                                '& button:not([aria-expanded="true"])': {
                                    transition: '0.2s ease',
                                    paddingBottom: '0.625rem',
                                },
                                '& button:hover': {
                                    background: 'transparent',
                                },
                            },
                            [`& .${accordionClasses.root}.${accordionClasses.expanded}`]:
                                {
                                    bgcolor: 'background.level4',
                                    borderRadius: 'md',
                                    borderBottom: '1px solid',
                                    borderColor: 'background.level2',
                                },
                            '& [aria-expanded="true"]': {
                                boxShadow: (theme) =>
                                    `inset 0 -1px 0 ${theme.vars.palette.divider}`,
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
                    {[...Array(9)].map((_, index) => (
                        <Post
                            key={index}
                            id={index}
                            title={`Шоппер`}
                            images={[
                                'https://sun9-22.userapi.com/s/v1/ig2/zPZLrfmAJay4Co-Uo1or35bsnz9ups4Js8sHFL-WOcNnJIB7q3mAuybSEVN5wmTXjOHFvd5Lar19Khp4MF8IzIIi.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=5O7siFJP7WhsNhuqB_Ie5yUzcqipVp86b1S-yNw7aDk&cs=510x680',
                                'https://sun9-65.userapi.com/s/v1/ig2/-YagQcngvbouq5e0iZ1AUm4pY7mhrKaml2coQPEFFdbhsBm1MFSsNLQbLrsrqixF0cqBnZCN907NYN51tg_-9tsJ.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=8OoL32yFmvgUnHCMygb8ApQkoVW7iWXZUezFtPvu6VY&cs=510x680',
                            ]}
                            categ={'Сумки'}
                            type={'Шоппер'}
                            accordions={[
                                {
                                    id: 1,
                                    title: 'Описание',
                                    content:
                                        'Стильная и вместительная сумка-шоппер. На фото из кожи оливкового цвета, также в ассортименте присутствует большой выбор и других классных цветов.',
                                    position: 0,
                                },
                                {
                                    id: 2,
                                    title: 'Размеры и другое',
                                    content:
                                        'Размер 32 на 40 см, плоское дно. Объемные ручки делают носку множества предметов, которые он может в себя вместить, очень комфортной, даже просто трогать их приятно. Кроме прочного шва, нагруженные элементы усилены латунными хольнитенами.',
                                },
                                {
                                    id: 3,
                                    title: 'Особенности',
                                    content:
                                        'Отлично подходит для тех, кто хочет сделать свой личный кабинет, чтобы хранить все свои вещи в одном месте. Обладает надежностью и удобством использования.',
                                },
                                {
                                    id: 4,
                                    title: 'Преимущества',
                                    content:
                                        'Сумка-шоппер обладает высокой степенью универсальности и долговечностью, что позволяет ее использовать в любых условиях.',
                                },
                            ]}
                            commentsCount={4}
                            colors={[
                                { color: '🟠', id: 1 },
                                { color: '🟢', id: 2 },
                                { color: '⚫', id: 3 },
                            ]}
                            price={10000}
                            isLiked
                        >
                            <Markdown children={'Тут самая главная'} />
                        </Post>
                        
                    ))}
                    
                </div>
                <div className="flex justify-center mt-3">
                    <Pagination count={10} shape="rounded" />
                </div>

                <ComponentFooter/>
            </div>
            
        </>
    );
});
export default hot(Catalog);
