# SubContract Trip with Stock

| Real World Event                  | FrontEnd Event                                             | performed by | backend event                                                                    | Allowed condition                  |
|-----------------------------------|------------------------------------------------------------|--------------|----------------------------------------------------------------------------------|------------------------------------|
| Fueling in bunk                   | add a fuel entry for vehicle                               | CSM          | create fuel                                                                      |                                    |
| Truck loaded in cement factory    | create a trip                                              | CSM          | create overall trip<br/> create 'Loading to Stock Point Trip'                    |                                    |
| -                                 | validate trip details enterd <br> add actual price of trip | Admin        | create initial pay <b>if trip marked as without fule</b>                         |                                    |
| Truck Reached Stock Point         | -                                                          | -            |                                                                                  |
| Truck Leaves Stock Point          | add stock to unloading details                             | CSM          | create 'Stock to Unloading Point Trip'                                           |                                    |
| Fueling in bunk                   | add a fuel entry for vehicle                               | CSM          | create fuel <br> associate it with trip <br>                                     | only when trip is enabled for fuel |
| Truck unloaded in unloading point | close trip                                                 | CSM          | mark overall trip as unloaded                                                    |                                    |
| acknowledgement sent to Magnum    | add acknowledgement details <br> add shortage              | CSM          | update acknowledgement details  <br> add shortage details                        |                                    |
| acknowledgement approved by       | validate shortage details and approve                      | Admin        | update shortage <br> create final payment <b>if bill is uploaded </b>            |                                    |
| Bill from transporter received    | add bill details in trip                                   | Admin        | update overall trip status <br> create final payment <b>if bill is uploaded </b> |                                    |



