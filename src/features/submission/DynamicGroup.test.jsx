import React, { useRef } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicGroup from './DynamicGroup';
import * as api from '../../services/api'; // Mock the API

// 1. Mock the API module
jest.mock('../../services/api');

// 2. Test Data (The Schema)
const MOCK_SCHEMA = {
    meta: { title: "Test Group", groupNo: 1 },
    forms: [
        {
            formId: "f1",
            title: "Identity",
            fields: [
                { id: "nik", type: "text", label: "NIK", required: true }
            ]
        }
    ],
    values: { nik: "12345" } // Draft data
};

// 3. Helper Wrapper (Because we use forwardRef)
const TestWrapper = ({ onSaveResult }) => {
    const ref = useRef();
    return (
        <>
            <DynamicGroup ref={ref} appId="APP-001" groupNo={1} />
            <button onClick={async () => {
                const result = await ref.current.triggerSave();
                onSaveResult(result);
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
        // A. Setup Mock
        api.getJourneyGroup.mockResolvedValue(MOCK_SCHEMA);

        // B. Render
        render(<DynamicGroup appId="APP-001" groupNo={1} />);

        // C. Assert Loading
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        // D. Assert Data Loaded
        await waitFor(() => {
            expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
        });
    });

    test('It triggers API save when valid', async () => {
        // A. Setup Mock
        api.getJourneyGroup.mockResolvedValue(MOCK_SCHEMA);
        api.saveGroupDraft.mockResolvedValue({ success: true });
        const handleSave = jest.fn();

        // B. Render with Wrapper
        render(<TestWrapper onSaveResult={handleSave} />);

        // Wait for load
        await waitFor(() => screen.getByDisplayValue("12345"));

        // C. User Interactions
        const input = screen.getByLabelText("NIK");
        await userEvent.clear(input);
        await userEvent.type(input, "99999"); // Change value

        // D. Trigger Save
        await userEvent.click(screen.getByText("Save"));

        // E. Assertions
        expect(api.saveGroupDraft).toHaveBeenCalledWith(
            "APP-001",
            1,
            expect.objectContaining({ nik: "99999" }) // Check payload
        );
        expect(handleSave).toHaveBeenCalledWith(true);
    });
});