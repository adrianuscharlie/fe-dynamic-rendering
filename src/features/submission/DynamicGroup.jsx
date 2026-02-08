import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldMapper } from '../../components/dynamic-engine/FieldMapper';
import { getGroup, saveDraft } from '../../services/api'; // Check your imports

const DynamicGroup = forwardRef(({ appId, groupNo }, ref) => {
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
    }, [appId, groupNo, methods]);

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
    }), [appId, groupNo, methods]);


    if (loading) return <div className="p-10 text-center animate-pulse">Loading...</div>;


    if (!data || !data.data || !data.data.items) {
        return <div className="p-10 text-red-500">Failed to load data or Invalid Schema</div>;
    }

    const formGroups = data.data.items;
    const renderFieldList = (fieldList) => (
        fieldList?.map((field) => (
            <div key={field.field_key} className="w-full">
                <FieldMapper field={field} />
            </div>
        ))
    );

    return (
        <FormProvider {...methods}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {formGroups.map((group, index) => {

                    const totalFields = group.fields?.length || 0;
                    const isGridMode = totalFields > 5;

                    let leftColumn = [];
                    let rightColumn = [];

                    if (isGridMode) {
                        const mid = Math.ceil(totalFields / 2);
                        leftColumn = group.fields.slice(0, mid);
                        rightColumn = group.fields.slice(mid);
                    } else {
                        leftColumn = group.fields;
                    }
                    return (
                        <div key={group.form_key || index} className="bg-white p-6 rounded shadow border border-gray-200">

                            {group.title && (
                                <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800">
                                    {group.title}
                                </h3>
                            )}


                            <div className={
                                isGridMode
                                    ? "flex flex-col lg:flex-row gap-8 items-start"
                                    : "flex flex-col space-y-6"
                            }>
                                <div className={`w-full ${isGridMode ? 'lg:w-1/2' : ''} space-y-6`}>
                                    {renderFieldList(leftColumn)}
                                </div>

                                {isGridMode && rightColumn.length > 0 && (
                                    <div className="w-full lg:w-1/2 space-y-6">
                                        {renderFieldList(rightColumn)}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </form>
        </FormProvider>
    );
});

export default DynamicGroup;