import React from 'react';
import { useFormContext } from 'react-hook-form';

// --- SUB-COMPONENTS (Scroll down for definitions) ---
import { TextField } from '../ui/TextField';
import { RadioField } from '../ui/RadioField';
import { CheckboxField } from '../ui/CheckboxField';
import { TextAreaField } from '../ui/TextAreaField';
import { SelectField } from '../ui/SelectField';

export const FieldMapper = ({ field }) => {
    // We grab the register function here to keep the child components clean
    const { register, formState: { errors } } = useFormContext();

    // Standardize props for all field types
    const commonProps = {
        field,
        // Registers the input with React Hook Form
        register: register(field.id, { required: field.required }),
        // Passes the error object for this specific field
        error: errors[field.id],
    };

    switch (field.type) {
        case 'select':
            return <SelectField {...commonProps} />;

        case 'radio':
            return <RadioField {...commonProps} />;

        case 'checkbox':
            return <CheckboxField {...commonProps} />;

        case 'textarea':
            return <TextAreaField {...commonProps} />;

        default:
            return <TextField {...commonProps} type={field.type} />;
    }
};