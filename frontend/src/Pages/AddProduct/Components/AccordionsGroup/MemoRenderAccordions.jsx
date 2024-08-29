import React, { useCallback, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from '../../Post.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Textarea } from 'flowbite-react';

const MemoRenderAccordions = ({setAccordions, accordions}) => {
    const handleRemoveAccordion = useCallback((index) => {
        setAccordions((prevAccordions) =>
            prevAccordions.filter((_, i) => i !== index)
        );
    }, []);

    const handleTitleChange = useCallback(
        (index, event) => {
            const newAccordions = [...accordions];
            newAccordions[index].title = event.target.value;
            setAccordions(newAccordions);
        },
        [accordions]
    );

    const handleContentChange = useCallback(
        (index, value) => {
            const newAccordions = [...accordions];
            newAccordions[index].content = value;
            setAccordions(newAccordions);
        },
        [accordions]
    );

    return (
            <div>
                {accordions.map((accordion, index) => (
                    <Draggable
                        key={accordion.id}
                        draggableId={String(accordion.id)}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${styles.accordionItem} m-2`}
                            >
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${accordion.id}-content`}
                                        id={`panel${accordion.id}-header`}
                                        {...provided.dragHandleProps}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <DragHandleIcon />
                                                <TextField
                                                    value={accordion.title}
                                                    onChange={(event) =>
                                                        handleTitleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    variant="outlined"
                                                    size="small"
                                                    margin="none"
                                                    className={
                                                        styles.accordionTitle
                                                    }
                                                />
                                            </Box>
                                            <IconButton
                                                color="secondary"
                                                onClick={() =>
                                                    handleRemoveAccordion(index)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Textarea
                                            value={accordion.content}
                                            onChange={(e) => {
                                                handleContentChange(
                                                    index,
                                                    e.target.value
                                                );
                                                console.log(e.target.value);
                                            }}
                                            placeholder="Введите текст..."
                                            required
                                            rows={4}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        )

};

export default MemoRenderAccordions;