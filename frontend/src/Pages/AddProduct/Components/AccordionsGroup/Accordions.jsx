import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../../Post.module.scss';
import MemoRenderAccordions from './MemoRenderAccordions';

const Accordions = ({setAccordions, accordions}) => {
    const handleAddAccordion = useCallback(() => {
        setAccordions((prevAccordions) => [
            ...prevAccordions,
            {
                id: prevAccordions.length + 1,
                title: 'Новый аккордион',
                content: '',
            },
        ]);
    }, []);


    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) return;

            const newAccordions = Array.from(accordions);
            const [removed] = newAccordions.splice(result.source.index, 1);
            newAccordions.splice(result.destination.index, 0, removed);

            setAccordions(newAccordions);
        },
        [accordions]
    );

    return (
        <div>
            <div
                className={
                    'm-2 rounded-lg border-2 border-dashed'
                }
            >
                <Box
                    textAlign="center"
                    marginBottom={2}
                >
                    <IconButton
                        color="primary"
                        onClick={handleAddAccordion}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <Droppable droppableId="accordions">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={
                                    provided.innerRef
                                }
                                className={`${styles.accordionContainer} m-2`}
                            >
                                {<MemoRenderAccordions setAccordions={setAccordions} accordions={accordions}/>}
                                {
                                    provided.placeholder
                                }
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>{' '}
            </div>
        </div>
    );
};

export default Accordions;