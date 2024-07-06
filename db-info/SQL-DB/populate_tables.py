import mysql.connector
from faker import Faker

# Initialize Faker instance
fake = Faker()

# Establish a connection to the MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='', # Add SQL user
    password='', # Add SQL assword 
    database='HospitEase'
)
cursor = conn.cursor()

# Populate Doctor table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Doctor (doctor_name, doctor_gender, doctor_contact, specialization, years_of_exp)
    VALUES (%s, %s, %s, %s, %s);
    ''', (fake.name(), fake.random_element(elements=('Male', 'Female')), fake.phone_number(), fake.job(), fake.random_int(min=1, max=40)))

# Populate Patient table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Patient (patient_name, patient_age, patient_gender, patient_contact)
    VALUES (%s, %s, %s, %s);
    ''', (fake.name(), fake.random_int(min=1, max=100), fake.random_element(elements=('Male', 'Female')), fake.phone_number()))

# Populate Nurse table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Nurse (nurse_name, nurse_gender, nurse_contact)
    VALUES (%s, %s, %s);
    ''', (fake.name(), fake.random_element(elements=('Male', 'Female')), fake.phone_number()))

# Populate Ratings table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Ratings (doctor_id, patient_id, rating)
    VALUES (%s, %s, %s);
    ''', (fake.random_int(min=1, max=100), fake.random_int(min=1, max=100), fake.random_int(min=1, max=5)))

# # Populate Record table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status)
    VALUES (%s, %s, %s, %s, %s);
    ''', (fake.random_int(min=1, max=100), fake.random_int(min=1, max=100), None, None, fake.random_element(elements=('Admit', 'Discharge'))))

# # # Populate Appointment and AppointmentDetails tables
for _ in range(100):
    cursor.execute('''
    INSERT INTO Appointment (doctor_id, patient_id)
    VALUES (%s, %s);
    ''', (fake.random_int(min=1, max=100), fake.random_int(min=1, max=100)))

    cursor.execute('''
    INSERT INTO ApointmentDetails (time, notes)
    VALUES (%s, %s);
    ''', (fake.date_time_this_decade(), fake.sentence()))

# Populate Room table
for _ in range(100):
    cursor.execute('''
    INSERT INTO Room (nurse_id, record_id, stay_time)
    VALUES (%s, %s, %s);
    ''', (fake.random_int(min=1, max=100), fake.random_int(min=1, max=100), fake.time()))

# Populate HospitalBill table
for _ in range(100):
    cursor.execute('''
    INSERT INTO HospitalBill (patient_id, bill_amount)
    VALUES (%s, %s);
    ''', (fake.random_int(min=1, max=100), fake.random_int(min=100, max=10000)))

## Add some data to test complex queries 
queries = [
    'INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES ("1", "1", "X-ray", NULL, "Admit");',
    'INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES ("1", "2", "X-ray", NULL, "Admit");',
    'INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES ("1", "3", "X-ray", NULL, "Admit");',
    'INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES ("1", "4", "Blood test", NULL, "Admit");',
    'INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES ("1", "5", "Blood test", NULL, "Admit");',
    'INSERT INTO Room (record_id, stay_time) VALUES ("101", "1:00:00");',
    'INSERT INTO Room (record_id, stay_time) VALUES ("102", "1:00:00");',
    'INSERT INTO Room (record_id, stay_time) VALUES ("103", "1:00:00");',
    'INSERT INTO Room (record_id, stay_time) VALUES ("104", "5:00:00");',
    'INSERT INTO Room (record_id, stay_time) VALUES ("105", "5:00:00");',
    'INSERT INTO Appointment (doctor_id, patient_id) VALUES ("1", "1"); ',
    'INSERT INTO Appointment (doctor_id, patient_id) VALUES ("1", "2"); ',
    'INSERT INTO Appointment (doctor_id, patient_id) VALUES ("1", "3"); ',
    'INSERT INTO Appointment (doctor_id, patient_id) VALUES ("1", "4");',
    'INSERT INTO Appointment (doctor_id, patient_id) VALUES ("1", "5");', 
    'INSERT INTO ApointmentDetails (appointment_id, time, notes) VALUES ("101", "2023-10-30 01:00:00", NULL);', 
    'INSERT INTO ApointmentDetails (appointment_id, time, notes) VALUES ("102", "2023-10-30 01:00:00", NULL);',
    'INSERT INTO ApointmentDetails (appointment_id, time, notes) VALUES ("103", "2023-10-30 01:00:00", NULL);', 
]

for query in queries: 
    cursor.execute(query)

conn.commit()
cursor.close()
conn.close()