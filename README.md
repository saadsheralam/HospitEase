
# HospitEase

HospitEase is a full stack hospital management system developed by gathering requirements from [Mughal Labs](https://mughallabs.com/). 

### Features
- [x] Patient and doctor authentication.
- [x] Ability to add new doctors to the system. 
- [x] Ability to add new nurses to the system. 
- [x] Retrieve patient and doctor data. 
- [x] Create and retrieve medical records for patients.
- [x] Add appointment notes for patients. 
- [x] Discharge patient from hospital. 
- [x] Schedule an appointment with a doctor. 
- [x] Leave rating for a doctor. 
- [ ] Billing mechanism. 

The schema and the ER-diagram that depicts relationships within the entire system are available [here](https://github.com/saadsheralam/HospitEase/tree/main/db-info).

### Building 
1. Start by cloning the repository: 
```
git clone https://github.com/saadsheralam/HospitEase.git
```
2. If you do not have npm installed, install npm by following [these](https://nodejs.org/en/download/package-manager) instructions.  

3. Navigate to the cloned directory. 
4. Run the following command to install node modules. 
```
cd client && npm i && cd ../server && npm i
```
5. Create an .env file in the server directory and set it up with the `PORT` and `MONG_URI` (MongoDB connection string). An example .env file might look like this: 

```
PORT=3000
MONG_URI=mongodb+srv://<user>:<password>@<cluster0.example.mongodb.net>/?retryWrites=true&w=majority
```

6. Start the server
```
cd server 
node server.js
```

7. Start the client 
```
cd client 
npm start
```

### Testing 
To test the schema and the relationships in the DB, automated Python scripts to create a MySQL database for the given [schema](https://github.com/saadsheralam/HospitEase/blob/main/db-info/Schema.drawio) are contained [here](https://github.com/saadsheralam/HospitEase/tree/main/db-info/SQL-DB). 

1. Install [MySQL Server](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://www.mysql.com/products/workbench/) and set up and admin account for MySQL server. 
2. Run MySQL Workbench. 
3. Add user and password for SQL server in the following places: [here](https://github.com/saadsheralam/HospitEase/blob/0be223f7ddc75cd41a0ccaf7b214042210c9ed5f/db-info/SQL-DB/create_db.py#L7), [here](https://github.com/saadsheralam/HospitEase/blob/0be223f7ddc75cd41a0ccaf7b214042210c9ed5f/db-info/SQL-DB/create_tables.py#L6), [here](https://github.com/saadsheralam/HospitEase/blob/0be223f7ddc75cd41a0ccaf7b214042210c9ed5f/db-info/SQL-DB/populate_tables.py#L10), and [here](https://github.com/saadsheralam/HospitEase/blob/0be223f7ddc75cd41a0ccaf7b214042210c9ed5f/db-info/SQL-DB/test_db.py#L6).
4. Navigate to the SQL-DB directory and install all dependencies: 
```
cd db-info/SQL-DB/
pip3 install mysql-connector
```
4. Run the create-db.py file to create a `HospitEase` DB. Observe the newly created DB in MySQL Workbench.
```
cd db-info/SQL-DB/
python3 create-db.py
```
5. Run the create-tables.py file to create all tables in the `HospitEase` DB. Observe the newly created tables in MySQL Workbench. 
```
python3 create-tables.py
```
6. Run the populate-tables.py file to add test data to all tables in the `HospitEase` DB. Observe data in MySQL Workbench. You can run queries in Workbench to verify all tables have been populated correctly. 
```
python3 populate-tables.py
```
7. Finally, run the test-db.py file to test the database with an interactive prompt. MySQL Workbench will reflect any changes made by the python script. 
```
python3 test_db.py
```
