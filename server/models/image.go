package models

type ImageURLs struct {
	Raw     string `json:"raw"`
	Full    string `json:"full"`
	Regular string `json:"regular"`
	Small   string `json:"small"`
	Thumb   string `json:"thumb"`
}

type ImageLinks struct {
	Self     string `json:"self"`
	HTML     string `json:"html"`
	Download string `json:"download"`
}

type Image struct {
	ID          string      `json:"id"`
	CreatedAt   string      `json:"created_at"`
	Width       int         `json:"width"`
	Height      int         `json:"height"`
	Color       string      `json:"color"`
	BlurHash    string      `json:"blur_hash"`
	Likes       int         `json:"likes"`
	LikedByUser bool        `json:"liked_by_user"`
	Description string      `json:"description"`
	User        *User       `json:"user"`
	Urls        *ImageURLs  `json:"urls"`
	Links       *ImageLinks `json:"links"`
}
