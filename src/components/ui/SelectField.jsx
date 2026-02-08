import React from 'react';

export const SelectField = ({ field, register, error }) => (
    <div className="flex flex-row items-center mb-4 w-full">
        <label
            htmlFor={field.id}
            className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4"
        >
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex-1 flex flex-col">
            <select
                id={field.id}
                {...register}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition bg-white
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            >
                <option value="">-- Select --</option>
                {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <span className="text-red-500 text-xs mt-1">Please select an option</span>}
        </div>
    </div>
);