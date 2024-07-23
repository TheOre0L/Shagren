import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import styles from '../../CartProduct/Post.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/joy/IconButton';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DeletePost from '../../DeletePost/DeletePostModal';
import EditIcon from '@mui/icons-material/Edit';
import { ModalClose } from '@mui/joy';

export default function ActionProduct({ id }: { id: number }) {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <IconButton
                onClick={() => setOpen(true)}
                
            >
                <MoreVertIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                // style={{ marginTop: '-538px' }}
            >
                <ModalDialog>
                <ModalClose variant="plain" className="m-[3vw] mb-[2vw]"/>
                    <p className="text-center font-mont text-md text-bold">
                        Действия с изделием
                    </p>
                    <Stack spacing={2}>
                        <Link to={`/product/${id}/edit`}>
                            <Button
                                variant="plain"
                                color="primary"
                                className="w-100"
                            >
                                <EditIcon />
                                Изменить
                            </Button>
                        </Link>
                        <Tooltip title="Удалить пост">
                            <DeletePost postId={id} />
                        </Tooltip>
                    </Stack>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
