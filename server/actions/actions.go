package actions

import (
	"github.com/davidalvarez305/vending_machine/server/database"
)

func Post(item interface{}) (interface{}, error) {
	result := database.DB.Create(item)

	if result.Error != nil {
		return item, result.Error
	}

	return item, nil
}

func Update(item interface{}) (interface{}, error) {
	result := database.DB.Save(item)

	if result.Error != nil {
		return item, result.Error
	}

	return item, nil
}
