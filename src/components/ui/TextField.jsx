export const TextField = ({ field, register, error, type = "text" }) => (
    <div className="flex flex-row items-center mb-4 w-full">

        {/* FIX 1: Change 'w-1/3' to 'w-48' (fixed width approx 200px) 
           FIX 2: Ensure 'text-left' is used
           FIX 3: Add 'flex-shrink-0' so the label never squishes
        */}
        <label
            htmlFor={field.id}
            className="w-48 text-sm font-medium text-gray-700 text-left flex-shrink-0 mr-4"
        >
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>

        {/* FIX 4: Use 'flex-1' (or w-full) to make the input take the REST of the space */}
        <div className="flex-1 flex flex-col">
            <input
                id={field.id}
                type={type}
                {...register}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            />
            {error && <span className="text-red-500 text-xs mt-1">{field.label} is required</span>}
        </div>
    </div>
);