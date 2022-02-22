package models

type User struct {
	ID                string `json:"id"`
	Username          string `json:"username"`
	Name              string `json:"name"`
	FirstName         string `json:"first_name"`
	LastName          string `json:"last_name"`
	InstagramUsername string `json:"instagram_username"`
	TwitterUsername   string `json:"twitter_username"`
	PortfolioURL      string `json:"portfolio_url"`
	ProfileImage      struct {
		Small  string `json:"small"`
		Medium string `json:"medium"`
		Large  string `json:"large"`
	} `json:"profile_image"`
}
