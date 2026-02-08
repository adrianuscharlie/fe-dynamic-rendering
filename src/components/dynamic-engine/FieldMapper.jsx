import React from 'react';
import { useFormContext } from 'react-hook-form';

// --- SUB-COMPONENTS (Scroll down for definitions) ---
import { TextField } from '../ui/TextField';
import { RadioField } from '../ui/RadioField';
import { CheckboxField } from '../ui/CheckboxField';
import { TextAreaField } from '../ui/TextAreaField';
import { SelectField } from '../ui/SelectField';

export const FieldMapper = ({ field }) => {
    const { register, formState: { errors } } = useFormContext();

    const commonProps = {
        field,
        register: register(field.id, { required: field.required }),
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