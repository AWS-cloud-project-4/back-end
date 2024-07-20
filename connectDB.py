import mysql.connector
from mysql.connector import Error

def connect_to_mysql():
    """ Connect to MySQL database """
    # 커넥션 설정은 나중에 RDS 연결할 때 다 변경해야하는 거 같아요
    try:
        connection = mysql.connector.connect(
            host='localhost',     # e.g., 'localhost' or '127.0.0.1'
            port=3305, 
            database='mozzy_guard_db', # e.g., 'test_db'
            user='root',     # e.g., 'root'
            password='awscloudproject_4',  # your password
            charset='utf-8'
        )
        if connection.is_connected():
            print("Successfully connected to the database")

            # Create a cursor object
            cursor = connection.cursor()

            # Execute a simple query
            cursor.execute("SELECT DATABASE();")

            # Fetch the result of the query
            record = cursor.fetchone()
            print("You're connected to database: ", record)

            # Close the cursor and connection
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

    except Error as e:
        print("Error while connecting to MySQL", e)

if __name__ == "__main__":
    connect_to_mysql()