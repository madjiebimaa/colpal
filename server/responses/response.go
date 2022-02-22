package responses

type Suc struct {
	Success bool        `json:"success"`
	Status  int         `json:"status"`
	Data    interface{} `json:"data"`
}

type Fail struct {
	Success bool    `json:"success"`
	Status  int     `json:"status"`
	Errors  []error `json:"errors"`
}
