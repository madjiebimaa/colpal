package requests

type GetPalettes struct {
	URL string `json:"url"`
}

type GetPalettesRecommendation struct {
	R float32 `json:"r"`
	G float32 `json:"g"`
	B float32 `json:"b"`
}
