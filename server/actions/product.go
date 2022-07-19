package actions

import (
	"fmt"

	"github.com/davidalvarez305/vending_machine/server/database"
	"github.com/davidalvarez305/vending_machine/server/models"
)

func DeleteProduct(id int) ([]models.Product, error) {
	var products []models.Product
	sql := fmt.Sprintf(`DELETE FROM product WHERE id = %v`, id)
	r := database.DB.Raw(sql)

	if r.Error != nil {
		return products, r.Error
	}

	return products, nil
}
