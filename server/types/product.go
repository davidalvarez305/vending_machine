package types

type Product struct {
	ProductName        string `gorm:"unique" json:"productName"`
	ProductDescription string `json:"productDescription"`
	ProductCost        int    `json:"productCost"`
	Quantity           int    `json:"quantity"`
}
