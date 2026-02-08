import React from 'react';

const TextField = ({ field, register, error, type = "text" }) => {
    // Check if "REQUIRED" rule exists
    const isRequired = field.rules?.some(r => r.type === 'REQUIRED');

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
                    type={type} // 'text', 'email', 'number', etc.
                    {...register}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {error && <span className="text-red-500 text-xs mt-1">{error.message || "This field is required"}</span>}
            </div>
        </div>
    );
};

export default TextField;