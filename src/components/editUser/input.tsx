import { Field } from 'formik';

interface InputProps {
    title: string;
    data: string;
    id: string;
    component?: string;
}

const Input: React.FC<InputProps> = ({ title, data, id, component }) => {
    return (
        <div className="flex flex-row gap-2 items-left">
            <label className="w-1/6 text-white self-start" htmlFor={id}>{title}</label>
            {component ? (
                <Field className="w-full p-1 bg-zinc-500 text-neutral-100  rounded-sm focus:outline-0 focus:ring-sky-500" id={id} name={id} component={component} >
                    {data}
                </Field>
                ) : (
                <Field className="w-full p-1 bg-zinc-500 text-neutral-100 rounded-sm focus:outline-0 focus:ring-sky-500" id={id} name={id} />
            )}
        </div>
    )
}

export default Input;