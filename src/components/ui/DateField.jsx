import React from 'react';

export const DateField = ({ field, register, error }) => (
    <div className="flex flex-row items-center mb-4 w-full">

        <label
            htmlFor={field.id}
            className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4"
        >
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex-1 flex flex-col">
            <input
                id={field.id}
                type="date"
                {...register}
                min={field.minDate}
                max={field.maxDate}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                    /* Makes the placeholder text look consistent */
                    text-gray-700 placeholder-gray-400
                `}
            />
            {error && <span className="text-red-500 text-xs mt-1">Please select a valid date</span>}
        </div>
    </div>
);