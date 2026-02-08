import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupContainer from '../features/submission/GroupContainer';
import { getSummary } from '../services/api';
export default function SubmissionPage() {
    const { appId } = useParams();
    const [summary, setSummary] = useState(null);
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

    return (
        <div className="min-h-screen w-full px-20 flex flex-col justify-between bg-slate-100">
            {/* Header */}
            <div className="py-6">
                <h1 className="text-2xl font-bold">dkowhsoidns</h1>
            </div>
            <div className="py-6">
                <GroupContainer summary={summary} appId={appId} />
            </div>
            <div className="py-6">
                <h1 className="text-2xl font-bold">dkowhsoidns</h1>
            </div>
        </div>
    );
}