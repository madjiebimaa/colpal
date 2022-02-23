package requests

type SearchImages struct {
	Query string `form:"q"`
}
