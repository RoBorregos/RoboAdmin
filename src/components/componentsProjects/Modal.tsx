import React, { useEffect, useState } from 'react';
import CardMainProject from './CardMainProject';
import { Formik, Form, Field, FormikConsumer } from 'formik';
import { api } from 'rbrgs/utils/api';
import ImageUpload from './ImageUpload';
import ImageCropper from '../imagePreview';
import ImageDrop from '../imageDrop';



interface ModalProps {
    title: string;
    description: string;
    wiki: string | null;
    image: string;
    id: string
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    wiki,
    image,
    id
}) => {

    const update = api.projects.updateProject.useMutation()
    const util = api.useContext();



    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [croppedImage, setCroppedImage] = useState<string|null>(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setCroppedImage(null)
    };

    const handleFileSelect = (file: File) => {
        if (file) {
            setSelectedFile(file);
        }
    };

    const initialValues = { title, description, wiki };

    return (<>
        <button className="border border-white rounded-md px-2 py-1 mt-2 text-xs font-bold text-white"
            onClick={
                () => {
                    setIsOpen(!isOpen)
                    setCroppedImage(null)
                }}>
            {isOpen ? "Guardar" : "Editar"}
        </button>

        {isOpen && (
            <div className="fixed inset-0 text-black bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 ">
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        await update.mutateAsync({
                            id,
                            title: values.title,
                            description: values.description,
                            wiki: values.wiki ? values.wiki : ""
                        })
                        await util.projects.getProjects.invalidate();
                        toggleModal()

                    }}
                >{({ values }) => (
                    <Form className="bg-slate-800 text-white p-3 rounded-md w-5/6 flex justify-center items-center ">
                        <div className='w-1/2 mr-3'>
                            <label className="block mb-1 text-sm font-medium stext-white" htmlFor="title">Titulo</label>
                            <Field
                                className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700  placeholder-gray-400 text-white "
                                id="title"
                                name="title"
                                placeholder="Titulo"
                            />
                            <label className="block  text-sm font-medium stext-white" htmlFor="description">Descripcion</label>
                            <Field
                                className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                as="textarea"
                                rows={5}
                                id="description"
                                name="description"
                                placeholder="Descripción"
                            />

                            <label className="block  text-sm font-medium stext-white" htmlFor="wiki">Wiki</label>
                            <Field className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                id="wiki"
                                name="wiki"
                                placeholder="Wiki"
                            />

                            <ImageUpload handleFileSelect={handleFileSelect} />
                            {/* <ImageDrop handleFileSelect={handleFileSelect} /> */}
                            {selectedFile && (
                                <div>
                                    <ImageCropper image={URL.createObjectURL(selectedFile)} onFinishedCropping={(image) => { setCroppedImage(image);setSelectedFile(null)}} desiredWidth={200} desiredHeight={200} />
                                </div>
                            )}

                            <button
                                className="mr-5 border border-white rounded-md px-2 py-1 mt-2 text-xs font-bold text-white"
                                type="submit">
                                Guardar
                            </button>
                            <button
                                className="border border-white rounded-md px-2 py-1 mt-2 text-xs font-bold text-white"
                                onClick={toggleModal}>
                                Cerrar
                            </button>

                        </div>
                        <div className='w-1/2 mr-3'>
                            <CardMainProject title={values.title}
                                description={values.description}
                                wiki={values.wiki}
                                image={image}
                                editable={true}
                                id={id}
                                cropped={croppedImage}
                            />
                        </div>
                    </Form>
                )}

                </Formik>
            </div>
        )}
    </>)
}



export default Modal;


{/* <Formik initialValues={initialValues}
    onSubmit={async (values) => {
        console.log(values)
        // toggleModal()
    }}>
    {(props) => (
        <Form>
            {console.log(props)}
            <div>
                <label className="block mb-1 text-sm font-medium stext-white" htmlFor="title">Titulo</label>
                <Field className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    id="title" name="title" placeholder="Titulo"
                    onChange={ } />
            </div>
            <div>
                <label className="block  text-sm font-medium stext-white" htmlFor="description">Descripcion</label>
                <Field className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    id="description" name="description" placeholder="Descripción" />
            </div>
            <div>
                <label className="block  text-sm font-medium stext-white" htmlFor="wiki">Wiki</label>
                <Field className="block mb-1 w-full p-2 border  rounded-lg sm:text-xs  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    id="wiki" name="wiki" placeholder="Wiki" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                <input className="block mb-1 w-full text-sm  border  rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    aria-describedby="file_input_help" id="file_input" type="file" />
            </div>

            <button className="mr-5 border border-white rounded-md px-2 py-1 mt-2 text-xs font-bold text-white" type="submit">Guardar</button>
            <button className="border border-white rounded-md px-2 py-1 mt-2 text-xs font-bold text-white" onClick={toggleModal}>Cerrar</button>
        </Form>
    )}
</Formik> */}