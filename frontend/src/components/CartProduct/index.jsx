import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import Button from '@mui/joy/Button';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';
import ComplaintsModal from '../ComplaintsModal/ComplaintsModal';
import DeletePost from '../DeletePost/DeletePostModal';
import BasicModal from '../ShareModal/ShareModal';
import { UserInfo } from '../UserInfo';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Carousel, Breadcrumb, Button } from 'flowbite-react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import ButtonMU from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import TypographyMU from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActionProduct from '../Modal/ActionProduct/ActionProduct';

const Post = ({
  id,
  title,
  price,
  colors,
  accordions,
  images,
  type,
  categ,
  commentsCount,
  children,
  isFullPost,
  isLoading,
  isLiked,
  isEditable,
  isPreview,
}) => {
  const [isLike, setIsLike] = useState(isLiked);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        {isEditable && (
          <div className={styles.editButtons}>
            <ActionProduct id={id}/>
          </div>
        )}

        {isFullPost ? (
          <>
            <Breadcrumb className="m-4" aria-label="Default breadcrumb example">
              <Breadcrumb.Item href="/product">Каталог</Breadcrumb.Item>
              <Breadcrumb.Item href={`/product/categ=${categ}`}>{categ}</Breadcrumb.Item>
              <Breadcrumb.Item href={`/product/categ=${categ}/type=${type}`}>{type}</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.wrapper}>
              <div className={styles.imageWrapper}>
                {images && images.length > 0 && (
                  <div className={clsx(styles.image, { [styles.imageFull]: isFullPost })}>
                    <div className={`h-96 sm:h-[38.2rem] xl:h-[38.2rem] 2xl:h-[38.2rem] `}>
                      <Carousel>
                        {images.map((image, index) => (
                          <img key={index} src={image} alt={`Product image ${index + 1}`} />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.indention}>
                <h2 className={`${clsx(styles.title, { [styles.titleFull]: isFullPost })} m-2`}>
                  {isFullPost ? title : <Link to={`/product/${id}`}>{title}</Link>}
                </h2>
                <ul className={`${styles.tags}, m-2`}>
                  <li key={type}>
                    {isPreview ? (
                      `${type}`
                    ) : (
                      <Link to={`/product/categ=${categ}/type=${type}`}>{type}</Link>
                    )}
                  </li>
                </ul>
                {children && <div className={`${styles.content} m-3`}>{children}</div>}
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
                    {accordions.map((accordion) => (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{accordion.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{accordion.content}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                </AccordionGroup>
                <Box>
                  <Card className={'2xl:w-12/12'} sx={{ marginTop: 5 }}>
                    <div>
                      <Typography level="title-lg">{title}</Typography>
                      <Typography level="body-sm">{}</Typography>
                      <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        size="sm"
                        sx={{
                          position: 'absolute',
                          top: '0.875rem',
                          right: '0.5rem',
                        }}
                      >
                        <BookmarkAdd style={isLike ? { color: 'red' } : { color: 'black' }} />
                      </IconButton>
                    </div>
                    <Box>
                      <ul className={styles.postDetails}>
                      <Typography level="body-xs">Цвета (Выбран: {})</Typography>
                        <li>
                          <Button.Group className="h-10 w-12/12">
                            {colors.map((color) => (
                              <Button color="gray" key={color.id}>{color.color}</Button>
                            ))}
                          </Button.Group>
                        </li>
                      </ul>
                    </Box>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography level="body-xs">Цена (без учета доставки)</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                          {price} руб.
                        </Typography>
                      </div>
                      <ul className={styles.postDetails}>
                        <li className="-mt-10">
                          <Button.Group>
                            <Button color="blue" className="ml-2">
                              Купить
                            </Button>
                            <Button color="gray" disabled>
                              <ReviewsIcon />
                              <span>{commentsCount}</span>
                            </Button>
                          </Button.Group>
                          {isFullPost && !isPreview ? <BasicModal /> : null}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Box>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.catalogGrid}>
            <Card key={id} className={`${styles.catalogCard} w-12/12 mt-2`}>
              <AspectRatio minHeight="120px" maxHeight="200px">
              <div className={`h-96 sm:h-[200px] xl:h-[200px] 2xl:h-[200px] `}>
                      <Carousel>
                        {images.map((image, index) => (
                          <img key={index} src={image} alt={`Product image ${index + 1}`} />
                        ))}
                      </Carousel>
                    </div>
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg"><Link to={`/product/${id}`}>{title}</Link></Typography>
                <Typography level="body-sm">{type}</Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  size="sm"
                  sx={{
                    position: 'absolute',
                    top: '14rem',
                    right: '0.5rem',
                  }}
                >
                  <BookmarkAdd className='m-2' style={isLike ? { color: 'red' } : { color: 'black' }} />
                </IconButton>
                <Typography level="body-xs">Цена (без учета доставки)</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {price} руб.
                </Typography>
                {/* <ul className={styles.postDetails}>
                  <li>
                    <Button.Group>
                      <Button color="warning" className="ml-auto mr-auto">
                        Купить
                      </Button>
                    </Button.Group>
                  </li>
                </ul> */}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default hot(Post);
