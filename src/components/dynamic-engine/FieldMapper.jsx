import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

// Import your UI components
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import RadioField from '../ui/RadioField';
import CheckboxField from '../ui/CheckboxField';
import DateField from '../ui/DateField';
import TextAreaField from '../ui/TextAreaField';

const NestedFormRenderer = ({ parentFieldId, optionCode, nestedForms }) => {
    const { control } = useFormContext();
    const parentValue = useWatch({ control, name: parentFieldId });
    const isSelected = Array.isArray(parentValue)
        ? parentValue.includes(optionCode)
        : parentValue === optionCode;

    if (!isSelected || !nestedForms) return null;

    return (
        <div className="mt-4 pl-4 border-l-2 border-blue-100 ml-2 space-y-4">
            {nestedForms.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-4">
                    {group.fields?.map((nestedField) => (
                        <FieldMapper key={nestedField.field_key} field={nestedField} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export const FieldMapper = ({ field }) => {
    const { register, formState: { errors } } = useFormContext();
    const isRequiredRule = field.rules?.some(r => r.type === 'REQUIRED');
    const isDisabled = field.rules?.some(r => r.type === 'DISABLED' || r.type === 'READ_ONLY');
    const fieldProps = {
        field: {
            ...field,
            id: field.field_key,
            label: field.label || field.field_key
        },

        disabled: isDisabled,

        register: register(field.field_key, {
            required: (!isDisabled && isRequiredRule) ? "This field is required" : false,
            disabled: isDisabled
        }),

        error: errors[field.field_key],
    };

    const renderField = () => {
        switch (field.type) {
            case 'FREE_TEXT':
                return <TextField {...fieldProps} />;
            case 'DROP_DOWN_BASIC':
                return <SelectField {...fieldProps} />;
            case 'RADIO_BUTTON':
                return <RadioField {...fieldProps} />;
            case 'CHECK_BOX_BASIC':
                return <CheckboxField {...fieldProps} />;

            default:
                return <div className="text-red-500 font-bold p-2">Unknown Type: {field.type}</div>;
        }
    };

    return (
        <div className="w-full">
            {renderField()}
            {field.options?.map((option) => (
                option.form && (
                    <NestedFormRenderer
                        key={option.code}
                        parentFieldId={field.field_key}
                        optionCode={option.code}
                        nestedForms={option.form}
                    />
                )
            ))}
        </div>
    );
};