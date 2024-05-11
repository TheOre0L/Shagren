import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';

export default function AuthModal() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <Button className="bg-[#0abab5]" onClick={() => setOpen(true)}>
                Войти
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{ marginTop: '-538px' }}
            >
                <ModalDialog>
                    <p className="text-center font-mont text-xl text-bold">
                        Вход в аккаунт
                    </p>

                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Логин или эл.почта</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    placeholder="Введите логин или эл.почту"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Input required placeholder="Введите пароль" />
                            </FormControl>
                            <FormLabel>
                                <a href="/">Забыли пароль? Восстановите его!</a>
                            </FormLabel>
                            <Button className="bg-[#0abab5]">Войти</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
