package models

type FAQs struct {
	ID string
	Question string
	Answer string
}

const CreateFAQsTable = "create table if not exists faqs(id varchar(255) primary key, question text, answer text)"

func InsertIntoFAQsTable(
	question string,
	answer string,
) string {
	return "insert into faqs values(uuid(), '" + question + "', '"+ answer +"')"
}

func FindFAQsById(id string) string {
	return "select * from faqs where id='" + id + "'"
}

func GetFAQs() string {
	return "select * from faqs"
}

func UpdateFAQ(
	id string,
	question string,
	answer string,
) string {
	return "update faqs set question='" + question + "', answer='" + answer + "' where id='" + id + "'"
}

func DeleteFAQ(id string) string {
	return "delete from faqs where id='" + id + "'"
}