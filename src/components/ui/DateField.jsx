import React from 'react';

const DateField = ({ field, register, error }) => {
    const isRequired = field.rules?.some(r => r.type === 'REQUIRED');

    // Optional: Extract min/max from validations array if they exist
    // Example validation: { type: "DATE_RANGE", parameter: { min: "2000-01-01" } }
    const dateRange = field.validations?.find(v => v.type === 'DATE_RANGE')?.parameter || {};

    return (
        <div className="flex flex-row items-center mb-4 w-full">
            <label
                htmlFor={field.id}
                className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4"
            >
                {field.label} {isRequired && <span className="text-red-500">*</span>}
            </label>

            <div className="flex-1 flex flex-col">
                <input
                    id={field.id}
                    type="date"
                    min={dateRange.min_date}
                    max={dateRange.max_date}
                    {...register}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                        text-gray-700 placeholder-gray-400`}
                />
                {error && <span className="text-red-500 text-xs mt-1">{error.message || "Please select a valid date"}</span>}
            </div>
        </div>
    );
};

export default DateField;