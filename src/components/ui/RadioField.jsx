import React from 'react';

const RadioField = ({ field, register, error }) => {
    const isRequired = field.rules?.some(r => r.type === 'REQUIRED');

    return (
        <div className="flex flex-row items-start mb-4 w-full">
            <label className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4 pt-2">
                {field.label} {isRequired && <span className="text-red-500">*</span>}
            </label>

            <div className="flex-1 flex flex-col">
                <div className={`flex flex-row flex-wrap gap-x-6 gap-y-2 items-center ${error ? 'p-2 border border-red-200 rounded bg-red-50' : ''}`}>
                    {/* UPDATED: Mapping 'code' -> value, 'title' -> label */}
                    {field.options?.map((opt) => (
                        <label key={opt.code} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                            <input
                                type="radio"
                                value={opt.code}
                                {...register}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-gray-700 text-sm">{opt.title}</span>
                        </label>
                    ))}
                </div>

                {error && <span className="text-red-500 text-xs mt-1">{error.message || "Please make a selection"}</span>}
            </div>
        </div>
    );
};

export default RadioField;