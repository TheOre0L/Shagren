import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import { IMaskInput } from 'react-imask';
import ModalDialog from '@mui/joy/ModalDialog';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Stack from '@mui/joy/Stack';
import { Context } from '../../..';
import e from 'express';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskAdapter(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="+7 (#00) 000-00-00"
                definitions={{
                    '#': /[1-9]/,
                }}
                onAccept={(value: any) =>
                    onChange({ target: { name: props.name, value } })
                }
                overwrite
            />
        );
    }
);

export default function RegistrationModal() {
    const { store } = React.useContext(Context);
    const [open, setOpen] = React.useState<boolean>(false);
    const [isActive, setActive] = React.useState<boolean>(true);
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [fio, setFio] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [replyPassword, setReplyPassword] = React.useState<string>('');
    const minLength = 12;
    return (
        <React.Fragment>
            <Button className="mx-2" onClick={() => setOpen(true)}>
                Зарегистрироваться
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{ marginTop: '-125px' }}
            >
                <ModalDialog>
                    <p className="text-center font-mont text-xl text-bold">
                        Зарегистрировать аккаунт
                    </p>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Логин</FormLabel>
                                <Input
                                    value={login}
                                    onChange={(event) =>
                                        setLogin(event.target.value)
                                    }
                                    autoFocus
                                    required
                                    placeholder="IvanIvanov"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="example@gmail.com"
                                    required
                                    type="email"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>ФИО</FormLabel>
                                <Input
                                    required
                                    value={fio}
                                    onChange={(event) =>
                                        setFio(event.target.value)
                                    }
                                    placeholder="Иванов Иван Иванович"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Город</FormLabel>
                                <Input
                                    required
                                    value={city}
                                    onChange={(event) =>
                                        setCity(event.target.value)
                                    }
                                    placeholder="Москва"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Телефон</FormLabel>
                                <Input
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        setPhoneNumber(event.target.value)
                                    }
                                    slotProps={{
                                        input: { component: TextMaskAdapter },
                                    }}
                                    required
                                    placeholder="+7 (000) 000-00-00"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        '--hue': Math.min(
                                            password.length * 10,
                                            120
                                        ),
                                    }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Введите пароль"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                    <LinearProgress
                                        determinate
                                        size="sm"
                                        value={Math.min(
                                            (password.length * 100) / minLength,
                                            100
                                        )}
                                        sx={{
                                            bgcolor: 'background.level3',
                                            color: 'hsl(var(--hue) 80% 40%)',
                                        }}
                                    />
                                    <Typography
                                        level="body-xs"
                                        sx={{
                                            alignSelf: 'flex-end',
                                            color: 'hsl(var(--hue) 80% 30%)',
                                        }}
                                    >
                                        {password.length < 3 && 'Очень слабый'}
                                        {password.length >= 3 &&
                                            password.length < 6 &&
                                            'Слабый'}
                                        {password.length >= 6 &&
                                            password.length < 10 &&
                                            'Надёжный'}
                                        {password.length >= 10 &&
                                            'Очень надёжный'}
                                    </Typography>
                                </Stack>
                            </FormControl>
                            <FormControl
                                error={
                                    replyPassword !== password ? true : false
                                }
                            >
                                <FormLabel>Подтверждение пароля:</FormLabel>
                                <Input
                                    value={replyPassword}
                                    onChange={(event) =>
                                        setReplyPassword(event.target.value)
                                    }
                                    type="password"
                                    placeholder="Повторите пароль"
                                />
                                {replyPassword !== password ? (
                                    <>
                                        <FormHelperText>
                                            <InfoOutlined />
                                            Пароли не совпадают!
                                        </FormHelperText>
                                    </>
                                ) : null}
                            </FormControl>
                            <Button
                                disabled={
                                    login.length &&
                                    email.length &&
                                    fio.length &&
                                    city.length &&
                                    phoneNumber.length &&
                                    password.length &&
                                    replyPassword.length &&
                                    replyPassword === password
                                        ? false
                                        : true
                                }
                                onClick={() => {
                                    store.registration(
                                        login,
                                        email,
                                        fio,
                                        city,
                                        phoneNumber,
                                        password
                                    );
                                }}
                            >
                                Зарегистрироваться
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
