import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import Markdown from 'react-markdown';
import { useParams } from "react-router-dom";
import { AuthHeader } from "../../components/AuthHeader";
import { Header } from "../../components/Header";
import CustomizedSnackbars from "../../components/Message/notification_msg";
import Post from "./index";
import { $api, API_URL } from "../../http";
import { Context } from "../../index";


const AddProduct = observer(() => {
    const {store} = useContext(Context);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingComm, setIsLoadingComm] = useState(false)
    const [data, setData] = useState()
    const [comment, setComment] = useState()

    if(isLoading || isLoadingComm){
        return <Post isLoading={isLoading}/>
    }

  return (
    <>
        {store.isAuth ? <AuthHeader/> : <Header/>}
        {store.is_message ? <CustomizedSnackbars text={store.message} is_msg = {store.is_message} color={store.color_msg}/>: null}
        {(
            <Post
            isLiked      
            isFullPost
          >

          </Post>

        )}

    </>
  );
});
export default hot(AddProduct);
