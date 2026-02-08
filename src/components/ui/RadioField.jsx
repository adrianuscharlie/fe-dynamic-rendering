import React from 'react';

export const RadioField = ({ field, register, error }) => (
    <div className="flex flex-row items-start mb-4 w-full">
        {/* Label Column (Fixed Width) */}
        <label className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4 pt-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>

        {/* Input Column */}
        <div className="flex-1 flex flex-col">
            {/* CHANGE LOG:
                1. flex-col -> flex-row (Horizontal layout)
                2. space-y-2 -> gap-x-6 (Horizontal spacing)
                3. Added 'flex-wrap' (Safety for small screens)
            */}
            <div className={`flex flex-row flex-wrap gap-x-6 gap-y-2 items-center ${error ? 'p-2 border border-red-200 rounded bg-red-50' : ''}`}>
                {field.options?.map((opt) => (
                    <label key={opt.value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                        <input
                            type="radio"
                            value={opt.value}
                            {...register}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700 text-sm">{opt.label}</span>
                    </label>
                ))}
            </div>

            {error && <span className="text-red-500 text-xs mt-1">Please make a selection</span>}
        </div>
    </div>
);