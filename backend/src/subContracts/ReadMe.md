| Vehicle         | Transporter     | Customer       | Trip                      | Bunk     | Acknowledgement |
|-----------------|-----------------|----------------|---------------------------|----------|----------------|
| Number          | TransporterName | Name           | VehicleNumber             | Name     | number          
| Capacity        | vehicle No      | Location       | Quantity                  | Location 
| TransporterName | GST             | InvoiceNumber1 | InvoiceNumber1 From Place | Amount   
|                 | Invoice         | InvoiceNumber2 | InvoiceNumber1 To Place   | Quantity 
|                 | date            | VehicleNumber  | InvoiceNumber1 From Date  | DueDate  
|                 | Quantity        |                | InvoiceNumber1 To Date    | VehicleNumber
|                 | TransporterRate |                | InvoiceNumber2 From Place |
|                 | TDS%            |                | InvoiceNumber2 From Place |
|                 | Bank Details    |                | InvoiceNumber2 From Date  |
|                 | Due Date        |                | InvoiceNumber2 From Date  |
|                 | CSM Name        |                | InvoiceNumber1No          |
|                 | Margin          |                | InvoiceNumber2No          |
|                 | Actual Rate     |                |                           |




### Vehicles
 - Want to add the vehicle details like number, capacity

### Customer Details
 - add the customer details like factory name, location
 - page to view list of customers with no. of trips bind by vehicle with those customers with search bar

### Transporters
 - add the transporter details 
 - map those transporters to their corresponding vehicles
 - can able to see the due date to pay remaining for their trips
 - input the price per tonnes, actual price, transporter price and done the tds calculation
 - want to add the payments details like
   - total amount want to give
   - advance paid
   - remaining balance
 - page to show the payment status, dues to pay and margin

### Bunk
 - add bunk details with location
 - see their payment dues like pending payments, due date

### Trip
 - can able to add the trip details like
   - loading point - map with customer detail & add corresponding invoice
     - add the payload detail
   - stock point - add corresponding invoice
   - customer point - add the acknowledge details
 - loading to stock point trip
   - if refuel
     - add the fueling details like bunk details, diesel price, quantity
   - trip duration
- stock to customer point trip
  - if refuel
      - add the fueling details like bunk details, diesel price, quantity
  - trip duration


## Stories - as a csm
1. should be able to create a factory to customer trip  
   1. without fuel
   2. without payment dues
2. should be able to view payment dues for transporter for the trip created
3. should be able to add fuel and view the payment dues for bunk
4. should be able to create a trip from factory to stock point
5. should be able to create a trip from stock point to customer point
6. should be able to add acknowledgement for any trip
7. should be able to generate invoice for customer
8. should be able to manage customer details
9. should be able to manage transporter & their vehicles
10. should be able to manage bunk
11. should be able to close payment dues with transaction details
12. should be able to generate reports for transporter
13. should be able to generate reports for bunk
14. should be able to generate reports for profit or loss
15. summary of transporter with date
16. summary of total quantity lifted  


## Test Cases for Deployment

1. should test Loading - Unloading trip without fuel with advanceType 70%
2. should test Loading - Unloading trip before fuel with advanceType 70%
3. should test Loading - Unloading trip after fuel with advanceType 70%
4. should test Loading - Unloading trip without fuel with advanceType 100%
5. should test Loading - Unloading trip before fuel with advanceType 100%
6. should test Loading - Unloading trip after fuel with advanceType 100%
7. should test Loading - Unloading trip for Own Vehicle 

8. should test Loading - Stock - Unloading trip without fuel with advanceType 70%
9. should test Loading - Stock - Unloading trip before fuel with advanceType 70%
10. should test Loading - Stock - Unloading trip after fuel with advanceType 70%
11. should test Loading - Stock - Unloading trip without fuel with advanceType 100%
12. should test Loading - Stock - Unloading trip before fuel with advanceType 100%
13. should test Loading - Stock - Unloading trip after fuel with advanceType 100%
14. should test Loading - Stock - Unloading trip for Own Vehicle 

15. should check negative initial pay should be generated without transactionId and Date 
