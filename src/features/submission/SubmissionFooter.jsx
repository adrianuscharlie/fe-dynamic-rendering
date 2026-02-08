import React from 'react';

const SubmissionFooter = ({
    onSaveDraft,
    onCancel,
    onSetStatus,
    isSaving,
    isProcessing
}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t py-3 px-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
            <div className="flex justify-between items-center">

                {/* Left Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isSaving || isProcessing}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Cancel Review
                    </button>
                    <button
                        onClick={onSaveDraft}
                        disabled={isSaving || isProcessing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving && <span className="animate-spin">⏳</span>}
                        {isSaving ? "Saving..." : "Save Draft"}
                    </button>
                </div>

                {/* Right Actions (Status) */}
                <div className="flex gap-3">
                    <button
                        onClick={() => onSetStatus('REJECT')}
                        disabled={isProcessing}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Set Status: REJECT
                    </button>
                    <button
                        onClick={() => onSetStatus('HOLD')}
                        disabled={isProcessing}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Set Status: HOLD
                    </button>
                    <button
                        onClick={() => onSetStatus('CLEAR')}
                        disabled={isProcessing}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Set Status: CLEAR
                    </button>
                </div>
            </div>
        </div>
    );
};


export default SubmissionFooter;