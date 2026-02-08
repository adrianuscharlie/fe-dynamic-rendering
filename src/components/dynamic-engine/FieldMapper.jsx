import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import RadioField from '../ui/RadioField';
import CheckboxField from '../ui/CheckboxField';


const NestedFormRenderer = ({ parentFieldId, optionCode, nestedForms }) => {
    const { control } = useFormContext();

    // 1. WATCH: Listen to the parent field's value
    const parentValue = useWatch({
        control,
        name: parentFieldId
    });

    // 2. CHECK: logic to see if this specific option is selected
    // Note: Checkbox values might be arrays, Radio values are strings.
    const isSelected = Array.isArray(parentValue)
        ? parentValue.includes(optionCode)
        : parentValue === optionCode;

    if (!isSelected || !nestedForms) return null;

    // 3. RENDER: If selected, render the nested form(s)
    return (
        <div className="mt-4 pl-4 border-l-2 border-blue-100 ml-2">
            {nestedForms.map((nestedForm, idx) => (
                <div key={idx} className="space-y-4">
                    {nestedForm.fields.map((nestedField) => (
                        <FieldMapper key={nestedField.field_key} field={nestedField} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export const FieldMapper = ({ field }) => {
    const { register, formState: { errors } } = useFormContext();

    // Normalize keys (API uses field_key, UI components might expect id)
    const fieldProps = {
        field: { ...field, id: field.field_key, label: field.label }, // Fallback label
        register: register(field.field_key, { required: isRequired(field.rules) }),
        error: errors[field.field_key]
    };

    // Helper to check standard "REQUIRED" rule
    function isRequired(rules) {
        return rules?.some(r => r.type === 'REQUIRED');
    }

    // RENDER CONTENT
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
                return <div className="text-red-500">Unknown Type: {field.type}</div>;
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