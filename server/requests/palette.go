package requests

type GetPalettes struct {
	URL string `json:"url"`
}

type GetPalettesRecommendation struct {
	Hex string `json:"hex"`
}
