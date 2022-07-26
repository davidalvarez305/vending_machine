package models

type Product struct {
	ID                 int    `json:"id"`
	ProductName        string `gorm:"unique" json:"productName"`
	ProductDescription string `json:"productDescription"`
	ProductCost        int    `json:"productCost"`
	Quantity           int    `json:"quantity"`
}
