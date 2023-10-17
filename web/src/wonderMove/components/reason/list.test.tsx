import { render, fireEvent, screen } from '@testing-library/react';
// import {getAllReasons} from '../../services/reason.ts'
import ReasonList from './list.tsx';

// jest.mock("../../services/reason", () => ({
//     getAllReasons: jest.fn(),
// }))

describe('Reason Page', () => {
    test('clicking add button shows input field', () => {
        render(<ReasonList />);
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull();
        fireEvent.click(screen.getByTestId('add-button'));
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument();
    })
    test('clicking close button closes input field', () => {
        render(<ReasonList />);
        fireEvent.click(screen.getByTestId('add-button'));
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('close-button'));
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull();
    })
    // it("fetches data from backend on mount", async () => {
    //     const mockReasons = [
    //         { id: 1, name: "Reason 1" },
    //         { id: 2, name: "Reason 2" },
    //     ];
    //
    //     // @ts-ignore
    //     (getAllReasons as jest.Mock).mockResolvedValue(mockReasons);
    //
    //     render(<ReasonList />);
    //     await screen.findByText("List All Reasons");
    //
    //     // Check if the service function was called
    //     expect(getAllReasons).toHaveBeenCalled();
    //
    //     // Check if the data is rendered in the component
    //     mockReasons.forEach((reason) => {
    //         expect(screen.getByText(reason.name)).toBeInTheDocument();
    //     });
    // })
})
