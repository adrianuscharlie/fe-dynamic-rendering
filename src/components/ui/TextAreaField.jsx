import React from 'react';

const TextAreaField = ({ field, register, error, disabled }) => {
    const isRequired = field.rules?.some(r => r.type === 'REQUIRED');

    return (
        <div className="flex flex-row items-start mb-4 w-full">
            <label
                htmlFor={field.id}
                className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4 pt-2"
            >
                {field.label} {isRequired && <span className="text-red-500">*</span>}
            </label>

            <div className="flex-1 flex flex-col">
                <textarea
                    id={field.id}
                    rows={field.rows || 3}
                    disabled={disabled}
                    placeholder={field.placeholder}
                    {...register}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition resize-y
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {error && <span className="text-red-500 text-xs mt-1">{error.message || "This field is required"}</span>}
            </div>
        </div>
    );
};

export default TextAreaField;