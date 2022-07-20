package actions

import (
	"fmt"

	"github.com/davidalvarez305/vending_machine/server/database"
	"github.com/davidalvarez305/vending_machine/server/models"
)

func DeleteProduct(id int) ([]models.Product, error) {
	var products []models.Product
	sql := fmt.Sprintf("DELETE FROM product WHERE id = %v", id)
	r := database.DB.Exec(sql)

	fmt.Printf("%v\n", sql)

	if r.Error != nil {
		return products, r.Error
	}

	p := database.DB.Find(&products)

	if p.Error != nil {
		return products, p.Error
	}

	return products, nil
}
