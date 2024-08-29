import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
const ImageEditorModal = ({ isOpen, onRequestClose, imageSrc, onSave }) => {
    const cropperRef = useRef(null);

    const handleSave = () => {
        const cropper = cropperRef.current.cropper;
        const croppedImage = cropper.getCroppedCanvas().toDataURL();
        console.log('Cropped Image:', croppedImage); // Логирование обрезанного изображения
        onSave(croppedImage);
        onRequestClose();
    };


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={isOpen}
            onClose={() => onRequestClose()}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div>
                <h2>Редактирование изображения</h2>
                <Cropper
                    src={imageSrc}
                    style={{ height: 400, width: '100%' }}
                    // Cropper.js options
                    initialAspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                />
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={onRequestClose}
                    >
                        Отмена
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={handleSave}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ImageEditorModal;
