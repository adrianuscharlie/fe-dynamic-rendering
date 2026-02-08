import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldMapper } from '../../components/dynamic-engine/FieldMapper';
// 1. FIX IMPORT NAMES
import { getGroup, saveDraft } from '../../services/api';

const DynamicGroup = forwardRef(({ appId, groupNo }, ref) => {
    console.log("DynamicGroup rendered with appId:", appId, "and groupNo:", groupNo);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const methods = useForm();

    // 2. FETCH DATA
    useEffect(() => {
        let active = true;
        setLoading(true);

        // Use the corrected function name
        getGroup(appId, groupNo)
            .then((resp) => {
                if (active) {
                    setData(resp);
                    // Use methods.reset inside the callback
                    methods.reset(resp.values || {});
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("Failed to load group:", err);
                if (active) setLoading(false);
            });

        return () => { active = false; };
        // 3. FIX DEPENDENCIES (Remove 'methods', use 'methods.reset')
    }, [appId, groupNo, methods.reset]);

    // 4. EXPOSE TRIGGER
    useImperativeHandle(ref, () => ({
        triggerSave: async () => {
            return new Promise((resolve) => {
                methods.handleSubmit(
                    async (formData) => {
                        try {
                            // Use corrected function name
                            await saveDraft(appId, groupNo, formData);
                            resolve(true);
                        } catch (error) {
                            console.error("Save failed:", error);
                            alert("Save failed");
                            resolve(false);
                        }
                    },
                    (errors) => {
                        console.warn("Validation errors:", errors);
                        resolve(false);
                    }
                )();
            });
        }
    }), [appId, groupNo]); // <--- Added dependency array

    if (loading) return <div className="p-10 text-center animate-pulse">Loading...</div>;
    if (!data) return <div className="p-10 text-red-500">Failed to load data</div>;

    return (
        <FormProvider {...methods}>
            <form className="space-y-6 p-3" onSubmit={(e) => e.preventDefault()}>
                {data.forms?.map((form) => {

                    const isGridMode = form.fields.length > 5;

                    // 1. IF GRID MODE: Split the fields into two arrays
                    let leftColumn = [];
                    let rightColumn = [];

                    if (isGridMode) {
                        const mid = Math.ceil(form.fields.length / 2); // e.g. 10 / 2 = 5
                        leftColumn = form.fields.slice(0, mid);        // Fields 0-4 (1-5)
                        rightColumn = form.fields.slice(mid);          // Fields 5-9 (6-10)
                    } else {
                        leftColumn = form.fields; // If not grid, put everything in left (main)
                    }

                    return (
                        <div key={form.formId} className="bg-white p-6 rounded shadow border border-gray-200">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800">
                                {form.title}
                            </h3>

                            {/* 2. RENDER LOGIC */}
                            {isGridMode ? (
                                // --- TWO COLUMN LAYOUT (Desktop) ---
                                // On mobile (flex-col), Right stacks BELOW Left.
                                // On Desktop (lg:flex-row), Right sits NEXT TO Left.
                                <div className="flex flex-col lg:flex-row gap-8">

                                    {/* LEFT COLUMN (Fields 1-5) */}
                                    <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                                        {leftColumn.map((f) => (
                                            <FieldMapper key={f.id} field={f} />
                                        ))}
                                    </div>

                                    {/* RIGHT COLUMN (Fields 6-10) */}
                                    <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                                        {rightColumn.map((f) => (
                                            <FieldMapper key={f.id} field={f} />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // --- SINGLE COLUMN LAYOUT ---
                                <div className="flex flex-col space-y-6">
                                    {leftColumn.map((f) => (
                                        <FieldMapper key={f.id} field={f} />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </form>
        </FormProvider>
    );
});

export default DynamicGroup;