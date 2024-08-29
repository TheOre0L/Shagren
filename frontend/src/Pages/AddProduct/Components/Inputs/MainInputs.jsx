import React from 'react';
import clsx from 'clsx';
import styles from '../../Post.module.scss';
import { FloatingLabel } from 'flowbite-react';
import { Box } from '@mui/material';
import { SimpleMdeReact } from 'react-simplemde-editor';

const MainInputs = ({setDescription, setTitle, title, description, type, isFullPost}) => {

    const onChange = React.useCallback((value) => {
        setDescription(value);
    }, []);

    return (
        <div>
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
                    value={description}
                    onChange={onChange}
                    className={`${styles.editor} m-2 font-mont`}
                    style={{ width: '96%' }} // Фиксация ширины SimpleMdeReact на 100% контейнера
                />
            </Box>
        </div>
    );
};

export default MainInputs;