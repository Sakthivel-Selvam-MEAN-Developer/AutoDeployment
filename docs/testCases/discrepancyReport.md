# Positive TestCases for DiscrepancyReport

- displaying the records matches the specific condition
- including the records with `acknowledgementStatus`field as true
- including `transporterInvoice` field which is not an empty string
- if the transporterType is own it should not included in the report
- including the report when final pay is completed 
- not including the amount difference because of shortage amount
- should include any other difference from the total transporter and total paid amount 

# Negative testCases for DiscrepancyReport
 
- displaying no records matches the specific condition
- including the records with `acknowledgementStatus` field as false
- including `transporterInvoice` field with an empty string
- trip with transporterType as own are included
- records without completed final pay are included
- amount difference because of shortage are included
