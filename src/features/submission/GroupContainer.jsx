import React, { useState, useRef } from 'react';
import DynamicGroup from './DynamicGroup';

const GroupContainer = ({ summary, appId }) => {
    const [activeGroupId, setActiveGroupId] = useState(summary?.groups[0]?.id || 1);
    const [isSaving, setIsSaving] = useState(false);


    const formRef = useRef();


    const handleTabChange = async (targetGroupId) => {

        if (activeGroupId === targetGroupId) return;

        setIsSaving(true);

        if (formRef.current) {
            const saveSuccess = await formRef.current.triggerSave();

        }

        setActiveGroupId(targetGroupId);
        setIsSaving(false);
    };

    if (!summary) return <div>Loading Tabs...</div>;

    return (
        <div className="w-full flex flex-col bg-slate-50 p-6">

            <h1 className='h1 text-xl font-bold'>Tasklist</h1>
            <div className="flex border-b border-gray-200 overflow-x-auto bg-white">
                {summary.groups.map((group) => {
                    const isActive = activeGroupId === group.id;
                    return (
                        <button
                            key={group.id}
                            onClick={() => handleTabChange(group.id)}
                            disabled={isSaving}
                            className={`
                                py-4 px-6 text-sm font-medium focus:outline-none transition-colors whitespace-nowrap
                                ${isActive
                                    ? 'border-b-2 border-red-600 text-red-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                                ${isSaving ? 'opacity-50 cursor-wait' : ''}
                            `}
                        >
                            {group.label}
                        </button>
                    );
                })}
            </div>

            <div className="min-h-[400px] relative bg-white">
                {isSaving && (
                    <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                        <span className="text-blue-600 font-bold animate-pulse">Saving...</span>
                    </div>
                )}
                <DynamicGroup
                    ref={formRef}
                    appId={appId}
                    groupNo={activeGroupId}
                />
            </div>

        </div>
    );
};

export default GroupContainer;