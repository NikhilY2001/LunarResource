package models

type Token struct {
	UserID string
	Value string
	TimeStamp string
}

const CreateTokenTable = `create table if not exists token(userId varchar(255), value varchar(255) unique, creationTime timestamp, foreign key (userId) references user(userId), primary key (userId, value))`

func InsertIntoTokenTable(id string) string {
	return "insert into token(userId, value, creationTime) values('" + id + "', uuid(), now())"
}

func GetRecentTokenOfUser(id string) string {
	return "select value from token where userId='" + id + "' order by creationTime desc limit 1"
}

func GetUserFromToken(token string) string {
	return "select userId from token where value='" + token + "' limit 1"
}

func DeleteToken(value string) string {
	return "delete from token where value='" + value + "'"
}

func DefaultInsertManyTokens(tokens []Token) string {
	var insertionString  = "insert ignore into token values"
	for i := range tokens {
		token := tokens[i]
		insertionString += "('" + token.UserID + "', '" + token.Value + "', '" + token.TimeStamp + "'),"
	}
	insertionString = insertionString[:len(insertionString) - 1]
	return insertionString
}
