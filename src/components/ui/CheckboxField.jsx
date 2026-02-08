import React from 'react';

export const CheckboxField = ({ field, register, error }) => (
    <div className="flex flex-row items-start mb-4 w-full">
        {/* Empty Label Column to maintain alignment with other fields */}
        <div className="w-48 flex-shrink-0 mr-4"></div>

        <div className="flex-1 flex flex-col">
            <div className={`flex items-start space-x-3 p-3 rounded border ${error ? 'bg-red-50 border-red-300' : 'border-gray-200'}`}>
                <div className="flex items-center h-5">
                    <input
                        id={field.id}
                        type="checkbox"
                        {...register}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>
                <div className="text-sm">
                    <label htmlFor={field.id} className="font-medium text-gray-700 cursor-pointer select-none">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.description && (
                        <p className="text-gray-500 text-xs mt-1">{field.description}</p>
                    )}
                </div>
            </div>
            {error && <span className="text-red-500 text-xs mt-1">This field is required</span>}
        </div>
    </div>
);