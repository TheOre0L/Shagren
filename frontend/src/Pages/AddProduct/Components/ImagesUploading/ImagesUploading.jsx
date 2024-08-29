import React from 'react';
import { Carousel, FileInput, Label } from 'flowbite-react';
import { $api, API_URL } from '../../../../http';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import styles from '../../Post.module.scss';

const ImagesUploading = ({ images, setImages, isFullPost }) => {

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedImages = Array.from(images);
        const [movedImage] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, movedImage);

        setImages(updatedImages);
    };

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            const uniquePrefix = new Date().toISOString().replace(/[-:.]/g,'');
            const uniqueFile = new File([file], `${uniquePrefix}-${file.name}`, { type: file.type });
            formData.append("image", uniqueFile);

            const { data } = await $api.post("/upload", formData);

            setImages((prevImages) => [
                ...prevImages,
                {
                    id: prevImages.length + 1,
                    alt: 'Картинка',
                    file: `${data.url}`,
                },
            ]);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div
            className={`${clsx(
                styles.image,
                { [styles.imageFull]: isFullPost }
            )} rounded-lg border-2 border-dashed`}
        >
            <div>
                <div className="h-96 sm:h-[38.2rem] xl:h-[38.2rem] 2xl:h-[30rem] p-2">
                    <Carousel>
                        {images.map((image, index) => (
                            <img
                                className="h-96 sm:h-[38.2rem] xl:h-[38.2rem] 2xl:h-[30rem]"
                                key={index}
                                src={`${API_URL}${image.file}`}
                                alt={`${image.alt}`}
                            />
                        ))}
                    </Carousel>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {images.length > 0 && (
                        <Droppable droppableId="thumbnails" direction="horizontal">
                            {(provided) => (
                                <div
                                    className="flex flex-wrap"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {images.map((image, index) => (
                                        <Draggable key={image.id} draggableId={String(image.id)} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="relative m-2"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <img
                                                        className="w-20 h-20 object-cover rounded"
                                                        src={`${API_URL}${image.file}`}
                                                        alt={image.alt}
                                                    />
                                                    <button
                                                        onClick={() => handleDeleteImage(index)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
            </div>
            <div className="flex w-full items-center justify-center p-2">
                <Label
                    htmlFor="dropzone-file"
                    className="flex h-96 rounded-md w-full cursor-pointer flex-col items-center justify-center border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center ">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Нажмите чтобы загрузить картинки
                            </span>{' '}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>
                    <FileInput
                        id="dropzone-file"
                        onChange={handleChangeFile}
                        className="hidden"
                        type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    />
                </Label>

            </div>

        </div>
    );
};

export default ImagesUploading;
