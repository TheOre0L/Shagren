import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import Markdown from 'react-markdown';
import { useParams } from "react-router-dom";
import { AuthHeader } from "../components/AuthHeader";
import { Header } from "../components/Header";
import CustomizedSnackbars from "../components/Message/notification_msg";
import Post from "../components/CartProduct";
import { $api, API_URL } from "../http";
import { Context } from "../index";


const FullPost = observer(() => {
    const {store} = useContext(Context);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingComm, setIsLoadingComm] = useState(false)
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [type, setType] = useState()
    const [comment, setComment] = useState()


    useEffect(async () => {
        document.title = 'Страница товара | Shagren Shop'
        try {
            await $api.post(`http://localhost:5000/api/v1.0/product/?action=get`, {id}).then(async (response) => {
                const types = await $api.post(`http://localhost:5000/api/v1.0/product/type?action=get&subjet=type`, {id: response.data.product.typeid});
                const category = await $api.post(`http://localhost:5000/api/v1.0/product/type?action=get&subjet=category`, {id: response.data.product.categoryid});
                setData(response.data); // Предполагается, что API возвращает массив items
                setCategory(category.data.categories)
                setType(types.data.type)
            })

        } catch (error) {
            console.error(error);
        } finally {

            setIsLoading(false);
        }
        if (localStorage.getItem('token')) {
            store.checkAuth();

        }
    }, []);
    if(isLoading || isLoadingComm){
        return <Post isLoading={isLoading}/>
    }

  return (
    <>
        {console.log(category, type)}
        {store.isAuth ? <AuthHeader/> : <Header/>}
        {store.is_message ? <CustomizedSnackbars text={store.message} is_msg = {store.is_message} color={store.color_msg}/>: null}
        {(
            <Post
            key={data.product.id}
            id={data.product.id}
            categ={category.title}
            title={data.product.title}
            images={data.product.images}
            type={type.title}
            accordions={data.product.accordions}
            commentsCount={4}
            colors={data.product.colors}
            price={data.product.price}
            isLiked
            isFullPost
            isEditable
          >
            <Markdown children={data.product.description}/>
          </Post>

        )}

    </>
  );
});
export default hot(FullPost);
