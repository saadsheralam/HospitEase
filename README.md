
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
- [] Billing mechanism. 

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
