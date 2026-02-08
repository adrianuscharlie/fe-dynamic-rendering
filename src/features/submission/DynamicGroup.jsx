import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldMapper } from '../../components/dynamic-engine/FieldMapper';

import { getGroup, saveDraft } from '../../services/api';

const DynamicGroup = forwardRef(({ appId, groupNo }, ref) => {
    console.log("DynamicGroup rendered with appId:", appId, "and groupNo:", groupNo);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const methods = useForm();

    useEffect(() => {
        let active = true;
        setLoading(true);

        getGroup(appId, groupNo)
            .then((resp) => {
                if (active) {
                    setData(resp);
                    methods.reset(resp.values || {});
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("Failed to load group:", err);
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, [appId, groupNo, methods.reset]);


    useImperativeHandle(ref, () => ({
        triggerSave: async () => {
            return new Promise((resolve) => {
                methods.handleSubmit(
                    async (formData) => {
                        try {

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
    }), [appId, groupNo]);

    if (loading) return <div className="p-10 text-center animate-pulse">Loading...</div>;
    if (!data) return <div className="p-10 text-red-500">Failed to load data</div>;

    return (
        <FormProvider {...methods}>
            <form className="space-y-6 p-3" onSubmit={(e) => e.preventDefault()}>
                {data.forms?.map((form) => {

                    const isGridMode = form.fields.length > 5;


                    let leftColumn = [];
                    let rightColumn = [];

                    if (isGridMode) {
                        const mid = Math.ceil(form.fields.length / 2);
                        leftColumn = form.fields.slice(0, mid);
                        rightColumn = form.fields.slice(mid);
                    } else {
                        leftColumn = form.fields;
                    }

                    return (
                        <div key={form.formId} className="bg-white p-6 rounded shadow border border-gray-200">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800">
                                {form.title}
                            </h3>


                            {isGridMode ? (

                                <div className="flex flex-col lg:flex-row gap-8">

                                    {/* LEFT COLUMN (Fields 1-5) */}
                                    <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                                        {leftColumn.map((f) => (
                                            <FieldMapper key={f.id} field={f} />
                                        ))}
                                    </div>

                                    <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                                        {rightColumn.map((f) => (
                                            <FieldMapper key={f.id} field={f} />
                                        ))}
                                    </div>
                                </div>
                            ) : (

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