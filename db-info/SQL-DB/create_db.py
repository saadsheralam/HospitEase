import mysql.connector 

try: 
  # Connecting to MySQL server
  conn = mysql.connector.connect(
    host="localhost",
    user="", # Add SQL User her ,
    password="", # ADD SQL password here
  )
  if conn.is_connected():
    print('Connected to MySQL server')
    # Create a new database
    try:
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE HospitEase")
        print('Database created successfully')
    except mysql.connector.Error as e:
        print(f'Error creating database: {e}')
    finally:
        cursor.close()

except mysql.connector.Error as e:
    print(f'Error connecting to MySQL server: {e}')
finally:
    conn.close()