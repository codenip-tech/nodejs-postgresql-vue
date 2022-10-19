* Add 2 new fields called created_at and updated_at
* Add a new endpoint that returns all distinct dates (without using DISTINCT keyword in postgres)
For example we have todos created in
  * 2022-10-19 18:30:00 
  * 2022-10-19 18:35:00
  * 2022-10-20 18:30:00
The endpoint will return
  * 2022-10-19
  * 2022-10-20
