import mysql.connector

# Establish a database connection
conn = mysql.connector.connect(
    host='localhost',
    user='', # Add SQL user
    password='', # Add SQL password
    database='HospitEase'
)
cursor = conn.cursor()

# Display menu for doctor
def doctor_menu(): 
    while True: 
        print()
        print("Select CRUD or complex operation to perform:")
        print("1. Check all patients (Read)")
        print("2. Schedule appointment with a new patient (Create)")
        print("3. Update appointment notes for an appointment (Update)")
        print("4. Create medical record for a patient (Create)")
        print("5. Discharge a patient (Update)")
        print("6. Get average feedback provided by patients (Complex)")
        print("0. Exit")

        user_input = input("Enter operation number: ")

        if user_input == "1": 
            query = "SELECT * FROM Patient"
            cursor.execute(query)
            records = cursor.fetchall() 
            print() 
            for record in records: 
                print(record)
            
        elif user_input == "2": 
            doctor_id = input("Enter doctor id:")
            patient_id = input("Enter patient id:") 
            query = "INSERT INTO Appointment (doctor_id, patient_id) VALUES (%s, %s)"
            values = (doctor_id, patient_id)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"New entry added to Appointment table for doctor_id: {doctor_id} and patient_id: {patient_id}.")
            
        elif user_input == "3": 
            appointment_id = input("Enter appointment id:")
            notes = input("Add notes:")
            query = "UPDATE ApointmentDetails SET notes = %s WHERE appointment_id = %s"
            values = (notes, appointment_id)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"ApointmentDetails table updated for patient_id:{appointment_id}.")

        elif user_input == "4": 
            doctor_id = input("Enter doctor id:")
            patient_id = input("Enter patient id:")
            diagnosis = input("Enter diagnosis:")
            prescription = input("Prescription:")
            status = input("Add status: (Admit/Discharge):")
            query = "INSERT INTO Record (doctor_id, patient_id, diagnosis, prescription, patient_status) VALUES (%s, %s, %s, %s, %s)"
            values = (doctor_id, patient_id, diagnosis, prescription, status)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"Record created for patient_id: {patient_id} by doctor_id: {doctor_id}")

        elif user_input == "5": 
            patient_id = input("Enter patient id:")
            query = "UPDATE Record SET patient_status = 'Discharge' WHERE patient_id = %s"
            values = (patient_id,)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"patient_id: {patient_id} patient status set to discharged.") 
        
        elif user_input == "6": 
            doctor_id = input("Enter doctor id:")
            query = "SELECT AVG(rating) FROM Ratings WHERE doctor_id = %s GROUP BY doctor_id"
            values = (doctor_id, )
            cursor.execute(query, values)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(f"Average rating for doctor_id: {doctor_id} is {record[0]}")

        elif user_input == "0": 
            break 
        else: 
            print("Please input a valid number:")

# Display menu for patient 
def patient_menu(): 
    print()
    while True: 
        print("Select CRUD or complex operation to perform:")
        print("1. Check all doctors (Read)")
        print("2. Schedule an appointment (Create)")
        print("3. Add ratings for a doctor (Complex)")
        print("4. View hospital bill (Read)")
        print("5. View average ratings provided (Complex)")
        print("0. Exit")

        user_input = input("Enter operation number: ")

        if user_input == "1": 
            query = "SELECT * FROM Doctor"
            cursor.execute(query)
            records = cursor.fetchall() 
            print()
            for record in records: 
                print(record)
            print()
        elif user_input == "2": 
            doctor_id = input("Enter doctor id:")
            patient_id = input("Enter patient id:") 
            query = "INSERT INTO Appointment (doctor_id, patient_id) VALUES (%s, %s)"
            values = (doctor_id, patient_id)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"New entry added to Appointment table for doctor_id: {doctor_id} and patient_id: {patient_id}.")
            print()
        elif user_input == "3": 
            doctor_id = input("Enter doctor id:")
            patient_id = input("Enter patient id:")
            rating = input("Add rating (1-5):") 
            query = "INSERT INTO Ratings (doctor_id, patient_id, rating) VALUES (%s, %s, %s)" 
            values = (doctor_id, patient_id, rating)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"Rating added for doctor_id: {doctor_id} by patient_id: {patient_id}")
            print()
        elif user_input == "4": 
            bill_id = input("Enter bill id:") 
            query = "SELECT * FROM HospitalBill WHERE bill_id = %s"
            values = (bill_id, )
            cursor.execute(query, values)
            records = cursor.fetchall() 
            print()
            for record in records: 
                print(record)
            print()
        elif user_input == "5": 
            patient_id = input("Enter patient id:")
            query = "SELECT AVG(rating) FROM Ratings WHERE patient_id = %s GROUP BY patient_id"
            values = (patient_id, )
            cursor.execute(query, values)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(f"Average rating provided by patient id: {patient_id} is {record[0]}")
            print()
        elif user_input == "0":
            break 
        else: 
            print("Please input a valid number:")

# Display menu for nurse             
def nurse_menu(): 
    print()
    while True: 
        print("Select CRUD or complex operation to perform:")
        print("1. Check all medical records (Read)")
        print("2. Discharge a patient (Update)")
        print("3. View room details (Read)")
        print("0. Exit")

        user_input = input("Enter operation number: ")

        if user_input == "1": 
            query = "SELECT * FROM Record"
            cursor.execute(query)
            records = cursor.fetchall() 
            print()
            for record in records: 
                print(record)
            print()
        elif user_input == "2": 
            patient_id = input("Enter patient id:")
            query = "UPDATE Record SET patient_status = 'Discharge' WHERE patient_id = %s"
            values = (patient_id,)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"patient_id: {patient_id} patient status set to discharged.") 
            print()
        elif user_input == "3": 
            query = "SELECT * FROM Room"
            cursor.execute(query)
            records = cursor.fetchall() 
            print()
            for record in records: 
                print(record)
            print()
        elif user_input == "0": 
            break 
        else: 
            print("Please input a valid number:")

# Display menu for admin 
def admin_menu(): 
    print()
    while True: 
        print("Select CRUD or complex operation to perform:")
        print("1. Add new doctor to hospital (Create)")
        print("2. Add new patient to hospital (Create)")
        print("3. Add new nurse to hospital (Create)")
        print("4. Assign patient to a room (Create)")
        print("5. View average rating of all doctors (Complex)")
        print("0. Exit")

        user_input = input("Enter operation number: ")

        if user_input == "1": 
            doctor_name = input("Enter doctor name:") 
            doctor_gender = input("Enter doctor gender:")
            doctor_contact = input("Enter doctor contact:")
            doctor_specialization = input("Enter doctor specialization:")
            doctor_exp = input("Enter years of experience:")
            query = "INSERT INTO Doctor (doctor_name, doctor_gender, doctor_contact, specialization, years_of_exp) VALUES (%s, %s, %s, %s, %s)"
            values = (doctor_name, doctor_gender, doctor_contact, doctor_specialization, doctor_exp)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"New doctor added to hospital.")
            print()
        elif user_input == "2": 
            patient_name = input("Enter patient name:") 
            patient_age = input("Enter patient age:")
            patient_gender = input("Enter patient gender:")
            patient_contact = input("Enter patient contact:")
            query = "INSERT INTO Patient (patient_name, patient_age, patient_gender, patient_contact) VALUES (%s, %s, %s, %s)"
            values = (patient_name, patient_age, patient_gender, patient_contact)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"New patient added to hospital.")
            print()

        elif user_input == "3": 
            nurse_name = input("Enter nurse name:") 
            nurse_gender = input("Enter nurse gender:")
            nurse_contact = input("Enter nurse contact:")
            query = "INSERT INTO Nurse (nurse_name, nurse_gender, nurse_contact) VALUES (%s, %s, %s)"
            values = (nurse_name, nurse_gender, nurse_contact)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"New nurse added to hospital.")
            print()

        elif user_input == "4": 
            record_id = input("Enter record_id:")
            query = "INSERT INTO Room (record_id, stay_time) VALUES (%s, NULL)"
            values = (record_id,)
            cursor.execute(query, values)
            conn.commit()
            print()
            print(f"Patient with record_id {record_id} assigned to room.")
            print()
        elif user_input == "5": 
            query = "SELECT doctor_id, AVG(rating) FROM Ratings GROUP BY doctor_id"
            cursor.execute(query)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(f"Average rating for doctor_id: {record[0]} is {record[1]}")
            print()
        elif user_input == "0":
            break 
        else: 
            print("Please input a valid number:")

# Display menu for complex queries
def complex_menu(): 
    print()

    ## Insert data for testing of complex queries 
    while True: 
        print("Select complex operation to perform:")
        print("1. Average patient stay time for specific procedures/diagnosis")
        print("2. Identify all patients who were diagnosed with a certain illness and were admitted at the same time")
        print("3. Rank doctors within each specialty based on satisfaction ratings and order them by years of experience")
        print("0. Exit")

        user_input = input("Enter operation number: ")

        if user_input == "1": 
            procedure = input("Enter procedure/diagnosis:") 
            query = '''
                SELECT M.Diagnosis, R.stay_time 
                FROM Record as M, Room as R 
                WHERE M.record_id = R.record_id AND R.stay_time > (
                    SELECT AVG(R.stay_time)
                    FROM Room as R, Record as M 
                    Where R.record_id = M.record_id 
                    GROUP BY M.diagnosis
                    HAVING M.diagnosis = %s
                )
            '''
            values = (procedure, )
            cursor.execute(query, values)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(record)
            conn.commit()
            print()

        elif user_input == "2": 
            procedure = input("Enter procedure/diagnosis:") 
            query = '''
                SELECT D.doctor_name, P.patient_name 
                FROM Doctor D, Patient P 
                WHERE (D.doctor_id, P.patient_id) in (
                    SELECT A.doctor_id, A.patient_id
                    FROM Appointment as A, (
                        SELECT DISTINCT patient_id 
                        FROM Record 
                        WHERE diagnosis = %s
                    ) as sq1 
                    WHERE A.patient_id = sq1.patient_id and appointment_id in (
                        SELECT A.appointment_id
                        FROM ApointmentDetails as A, ApointmentDetails as B 
                        WHERE A.time = B.time and A.appointment_id <> B.appointment_id
                    )
                )
            '''
            values = (procedure, )
            cursor.execute(query, values)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(record)
            conn.commit()
            print()

        elif user_input == "3": 
            query = '''
                SELECT D.doctor_id, D.specialization, D.years_of_exp, subquery.avg_rating
                FROM Doctor D, (
                    SELECT doctor_id, AVG(rating) as avg_rating
                    FROM ratings 
                    GROUP BY doctor_id
                ) AS subquery
                WHERE D.doctor_id = subquery.doctor_id
                ORDER BY D.specialization, subquery.avg_rating DESC, D.years_of_exp DESC
            '''
            cursor.execute(query)
            records = cursor.fetchall()
            print()
            for record in records: 
                print(record)
            conn.commit()
            print()

        elif user_input == "0":
            break 
        else: 
            print("Please input a valid number:")

while True:
    print("\nUser Type:")
    print("1. Doctor")
    print("2. Patient")
    print("3. Nurse")
    print("4. Admin")
    print("5. Complex Queries")
    print("0. Exit")
    
    user_type = input("Enter the user type: ")
    
    if user_type == "1":
        doctor_menu()
    elif user_type == "2":
        patient_menu() 
    elif user_type == "3":
        nurse_menu()
    elif user_type == "4": 
        admin_menu()
    elif user_type == "5": 
        complex_menu() 
    elif user_type == "0":
        break
    else:
        print("Invalid user type. Please try again.")

# Close the connection
cursor.close()
conn.close()
