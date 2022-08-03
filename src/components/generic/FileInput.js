import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';

export const FileUploadDemo = () => {
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    return(
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Escoja" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Subir" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Limpiar" position="bottom" />

            <div className="card">
            <h5>Comprobante </h5>
                <FileUpload name="comprobante" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} accept="image/*" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Arrastre y suelte el comprobante para subir.</p>} />
            </div>
        </div>
    );

}