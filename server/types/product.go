package types

type Product struct {
	ID                 int    `json:"id"`
	ProductName        string `json:"productName"`
	ProductDescription string `json:"productDescription"`
	ProductCost        int    `json:"productCost"`
	Quantity           int    `json:"quantity"`
}
