import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicGroup from './DynamicGroup';
import * as api from '../../services/api';

// 1. FIX: Explicitly mock the API functions to prevent "undefined" errors
jest.mock('../../services/api', () => ({
    getGroup: jest.fn(),
    saveDraft: jest.fn()
}));

// 2. FIX: Create a simple, self-contained schema for testing
// This ensures we know EXACTLY what data the component is using.
const TEST_DATA = {
    meta: {
        title: "Test Group",
        description: "Unit Test Description"
    },
    forms: [
        {
            formId: "f1",
            title: "Identity",
            fields: [
                { id: "nik", type: "text", label: "NIK", required: true }
            ]
        }
    ],
    values: {
        nik: "12345" // Initial value
    }
};

// Helper Component to trigger the imperative handle
const TestWrapper = ({ onSaveResult }) => {
    const ref = useRef();
    return (
        <>
            <DynamicGroup ref={ref} appId="APP-001" groupNo={1} />
            <button onClick={async () => {
                if (ref.current) {
                    const result = await ref.current.triggerSave();
                    onSaveResult(result);
                }
            }}>
                Save
            </button>
        </>
    );
};

describe('DynamicGroup Logic', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('It fetches schema and renders the form with data', async () => {
        // A. Setup Mock to return our test data
        api.getGroup.mockResolvedValue(TEST_DATA);

        // B. Render
        render(<DynamicGroup appId="APP-001" groupNo={1} />);

        // C. Assert Loading State
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        // D. Assert Data Loaded
        await waitFor(() => {
            // Check if the input value "12345" (from TEST_DATA.values) is rendered
            expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
        });
    });

    test('It triggers API save when valid', async () => {
        // A. Setup Mocks
        // Ensure you mock the exported function that DynamicGroup actually imports (likely saveDraft or saveGroupDraft)
        api.getGroup.mockResolvedValue(TEST_DATA);
        api.saveDraft.mockResolvedValue({ success: true });

        const handleSave = jest.fn();

        // B. Render with Wrapper
        render(<TestWrapper onSaveResult={handleSave} />);

        // Wait for data to load
        await waitFor(() => expect(screen.getByDisplayValue("12345")).toBeInTheDocument());

        // C. User Interactions
        const input = screen.getByLabelText(/NIK/i);

        // Clear and Type new value
        await userEvent.clear(input);
        await userEvent.type(input, "99999");

        // D. Trigger Save
        const saveButton = screen.getByText("Save");
        await userEvent.click(saveButton);

        // E. Assertions
        expect(api.saveDraft).toHaveBeenCalledWith(
            "APP-001", // Arg 1: App ID
            1,         // Arg 2: Group No
            // Arg 3: The Data Payload
            // We use expect.objectContaining to ignore other potential form fields
            // and strictly check if 'nik' was updated to '99999'
            expect.objectContaining({
                nik: "99999"
            })
        );

        // Ensure the parent callback received the result from the mock
        expect(handleSave).toHaveBeenCalledWith({ success: true });
    });
});