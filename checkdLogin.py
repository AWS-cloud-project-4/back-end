import mysql.connector
from mysql.connector import Error

def check_login(user_id, user_password):
    try:
        # 데이터베이스 연결 설정
        connection = mysql.connector.connect(
            host='localhost',     # e.g., 'localhost' or '127.0.0.1'
            port=3306,
            database='mozzy_guard_db', # e.g., 'test_db'
            user='root',     # e.g., 'root'
            password='mozzyguard'  # your password
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)

            # 아이디와 비밀번호를 확인하기 위한 쿼리
            query = "SELECT user_password FROM user WHERE user_id = %s"
            cursor.execute(query, (user_id,))
            result = cursor.fetchone()

            if result is None:
                # 아이디가 존재하지 않는 경우
                print("존재하지 않는 회원입니다.")
            else:
                # 아이디는 존재하지만 비밀번호가 틀린 경우
                stored_password = result['user_password']
                if user_password == stored_password:
                    print("로그인 성공!")
                else:
                    print("비밀번호가 틀렸습니다.")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# 사용자로부터 아이디와 비밀번호를 입력 받음
user_id = input("아이디를 입력하세요: ")
user_password = input("비밀번호를 입력하세요: ")

check_login(user_id, user_password)

# 로그인 할 때 데이터베이스에 있는 회원 정보 확인
# 로그인 조건
# 1. 로그인 성공: 아이디, 패스워드 모두 맞을 경우
# 2. 패스워드 틀림: 아이디는 존재하는데 비밀번호를 틀렸을 경우
# 3. 아이디 없음: 가입되지 않은 아이디일 경우