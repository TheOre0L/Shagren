import React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';


const filter = createFilterOptions();
const Category = ({categList}) => {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            title: '',
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            title: dialogValue.title,
        });

        handleClose();
    };
    return (
        <div>
            <FormControl id="free-solo-dialog-demo">
                <FormLabel>Free solo dialog</FormLabel>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                toggleOpen(true);
                                setDialogValue({
                                    title: newValue,
                                });
                            });
                        } else if (newValue && newValue.inputValue) {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                title: `Add "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    options={categList}
                    getOptionLabel={(option) => {
                        // for example value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.title;
                    }}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                        <AutocompleteOption {...props}>{option.title}</AutocompleteOption>
                    )}
                    sx={{ width: 300 }}
                />
            </FormControl>
            <Modal open={open} onClose={handleClose}>
                <ModalDialog>
                    <form onSubmit={handleSubmit}>
                        <Typography
                            id="basic-modal-dialog-title"
                            component="h2"
                            level="inherit"
                            fontSize="1.25em"
                            mb="0.25em"
                        >
                            Add a new film
                        </Typography>
                        <Typography
                            id="basic-modal-dialog-description"
                            mt={0.5}
                            mb={2}
                            textColor="text.tertiary"
                        >
                            Did you miss any film in our list? Please, add it!
                        </Typography>
                        <Stack spacing={2}>
                            <FormControl id="name">
                                <FormLabel>Title</FormLabel>
                                <Input
                                    autoFocus
                                    type="text"
                                    value={dialogValue.title}
                                    onChange={(event) =>
                                        setDialogValue({
                                            ...dialogValue,
                                            title: event.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                <Button variant="plain" color="neutral" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add</Button>
                            </Stack>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    );
};

export default Category;