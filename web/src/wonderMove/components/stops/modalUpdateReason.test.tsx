// import { render, fireEvent, screen } from '@testing-library/react'
// import ModalUpdateReason from './modalUpdateReason'



// describe('Update Reasin in Modal', () => {
//     test('shold delete stop whileclicking delete button', () => {
//         const setSelectedRow = jest.fn();
//         const tableState = {}
//         render(<ModalUpdateReason
//             open={true}
//             selectedRow={[
//                 {
//                     id: 1,
//                     startTime: 10,
//                     endTime: 20,
//                     durationInMillis: 10,
//                     gpsStopId: 123,
//                     stopReasonId: 456,
//                     reason: { name: 'Puncture' },
//                 },
//             ]}
//             setSelectedRow={setSelectedRow}
//             tableState={tableState} />)
//         fireEvent.click(screen.getByTestId('delete-button'))
//         expect(screen.findAllByText(10)).toBeNull()
//         })
// })