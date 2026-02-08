import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupContainer from '../features/submission/GroupContainer';
import SubmissionFooter from '../features/submission/SubmissionFooter';
import { getSummary, updateAppStatus } from '../services/api';

export default function SubmissionPage() {
    const { appId } = useParams();
    const [summary, setSummary] = useState(null);


    const [isSaving, setIsSaving] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);


    const containerRef = useRef();

    useEffect(() => {
        const fetchSummaryData = async (appId) => {
            await getSummary(appId)
                .then((resp) => {
                    setSummary(resp);
                    console.log("Fetched summary:", resp);
                }).catch((err) => {
                    console.error("Error fetching summary:", err);
                });
        }
        fetchSummaryData(appId);
    }, [appId]);


    const handleSaveDraft = async () => {
        if (!containerRef.current) return;

        setIsSaving(true);
        try {

            const success = await containerRef.current.triggerSave();
            if (success) {

                console.log("Saved successfully");
            }
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSetStatus = async (status) => {
        if (!window.confirm(`Are you sure you want to set status to ${status}?`)) return;

        setIsProcessing(true);
        try {
            await updateAppStatus(appId, status);
        } catch (error) {
            alert("Failed to update status");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen w-full px-20 flex flex-col justify-start bg-slate-100 pb-24">
            <div className="py-6">
                <h1 className="text-2xl font-bold">Review Application</h1>
            </div>

            <div className="py-6">
                <GroupContainer
                    ref={containerRef}
                    summary={summary}
                    appId={appId}
                />
            </div>
            <SubmissionFooter
                onSaveDraft={handleSaveDraft}
                onSetStatus={handleSetStatus}
                onCancel={() => console.log("Cancel")}
                isSaving={isSaving}
                isProcessing={isProcessing}
            />
        </div>
    );
}