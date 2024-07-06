import mysql.connector 

try: 
    conn = mysql.connector.connect(
        host='localhost',
        user='', # Add SQL User
        password='', # Add SQL Password
        database='HospitEase'
    )
    cursor = conn.cursor()

    
    cursor.execute('''
    CREATE TABLE Doctor (
        doctor_id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_name VARCHAR(50) NOT NULL,
        doctor_gender VARCHAR(10),
        doctor_contact VARCHAR(50),
        specialization VARCHAR(100),
        years_of_exp INT NOT NULL 
    );
    ''')

    cursor.execute('''
    CREATE TABLE Patient (
        patient_id INT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(50) NOT NULL,
        patient_age INT,
        patient_gender VARCHAR(10),
        patient_contact VARCHAR(50)
    );
    ''')

    cursor.execute('''
    CREATE TABLE Ratings (
        doctor_id INT,
        patient_id INT,
        rating INT NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
        FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
    );
    ''')

    cursor.execute('''
    CREATE TABLE Record (
        record_id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT,
        patient_id INT,
        diagnosis TEXT,
        prescription TEXT,
        patient_status VARCHAR(50) NOT NULL, 
        FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
        FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
    );
    ''')

    cursor.execute('''
    CREATE TABLE Appointment (
        appointment_id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT,
        patient_id INT,
        FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
        FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
    );
    ''')

    cursor.execute('''
    CREATE TABLE ApointmentDetails (
        appointment_id INT AUTO_INCREMENT PRIMARY KEY,
        time DATETIME NOT NULL,
        notes TEXT
    );
    ''')

    cursor.execute('''
    CREATE TABLE Nurse (
        nurse_id INT AUTO_INCREMENT PRIMARY KEY,
        nurse_name VARCHAR(50) NOT NULL,
        nurse_gender VARCHAR(10),
        nurse_contact VARCHAR(50)
    );
    ''')

    cursor.execute('''
    CREATE TABLE Room (
        room_id INT AUTO_INCREMENT PRIMARY KEY,
        nurse_id INT, 
        record_id INT,
        stay_time TIME,
        FOREIGN KEY (record_id) REFERENCES Record(record_id), 
        FOREIGN KEY (nurse_id) REFERENCES Nurse(nurse_id)
    );
    ''')


    cursor.execute('''
    CREATE TABLE HospitalBill (
        bill_id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT,
        bill_amount DECIMAL(10, 2),
        FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
    );
    ''')

    # Commit the changes
    conn.commit()

except mysql.connector.Error as e: 
    print(f'Error connecting to MySQL server: {e}')
finally:
    # Close the connection
    cursor.close()
    conn.close()
