package models

type Color struct {
	Hex string `json:"hex"`
}

type Palette struct {
	Main  *Color  `json:"main"`
	Dark  *Color  `json:"dark"`
	Light *Color  `json:"light"`
	Value float32 `json:"value"`
}
