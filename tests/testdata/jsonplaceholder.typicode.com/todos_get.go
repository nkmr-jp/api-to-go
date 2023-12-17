// Generated Code But Editable.
// Format The Code with `go fmt` or something and edit it manually to use it.
//
// Generated by: api-to-go (https://github.com/nkmr-jp/api-to-go).

package jsonplaceholdertypicodecom

// TodosGet is the HTTP Response Body.
//
//	Status:  200 OK
//	Request: GET https://jsonplaceholder.typicode.com/todos?userId=1
//	Docs:    https://jsonplaceholder.typicode.com/
type TodosGet []struct {
	UserID    int    `json:"userId"`
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}