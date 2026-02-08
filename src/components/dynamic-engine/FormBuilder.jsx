import React from 'react'
import { FieldMapper } from './FieldMapper'

const FormBuilder = ({ section, register, errors }) => {
    return (
        <div key={section.sectionId} className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="border-b border-gray-100 pb-3 mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                    {section.title}
                </h2>
                {section.description && (
                    <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                )}
            </div>

            {/* LAYOUT FIX: 
                1. Removed 'grid' and 'grid-cols-2'. 
                2. Used 'flex flex-col' to force a vertical stack.
                3. Added 'space-y-4' for consistent gap between rows.
            */}
            <div className="flex flex-col space-y-4 w-full">
                {section.fields.map((field) => (
                    <div key={field.id} className="w-full">
                        <FieldMapper
                            field={field}
                            register={register}
                            errors={errors}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FormBuilder