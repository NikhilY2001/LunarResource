package models

type User struct {
	UserId string
	Username string
	Email string
	Password string
	Role string
}

const CreateUserTable = "create table if not exists user(userId varchar(255) primary key,username varchar(20),email varchar(40) not null unique,password varchar(255),role varchar(10), createdAt timestamp);"
func InsertIntoUserTable(
	username string,
	email string,
	password string,
	role string,
) string {
	if(role != "Admin") {
		role = "Customer"
	}
	return "insert into user values(uuid(), '" + username + "', '" + email + "', '" + password + "', '" + role + "', now())"
}
func FindUserByEmail(email string) string {
	return "select userId, username, email, password, role from user where email='" + email + "'"
}
func GetUsers() string {
	return "select userId, username, email, role from user"
}
func DeleteUser(id string) string {
	return "delete from user where userId='" + id + "'"
}

func DefaultInsertManyUsers(users []User) string{
	var insertionString string = "insert ignore into user values"
	for i := range users {
		user := users[i]
		insertionString += "(uuid(), '" + user.Username + "', '" + user.Email + "', '" + user.Password +"', '" + user.Role + "', now()),"
	}
	insertionString = insertionString[:len(insertionString) - 1]
	return insertionString
}

func UpdateUser(user User) string {
	return "update user set username='" + user.Username + "', email='" + user.Email+ "', role='" + user.Role + "' where userId='" + user.UserId + "'"
}

func GetUser(id string) string {
	return "select userId, username, email, role from user where userId='" + id + "' limit 1"
}