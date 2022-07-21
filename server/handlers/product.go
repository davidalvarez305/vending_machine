package handlers

import (
	"fmt"
	"strconv"

	"github.com/davidalvarez305/vending_machine/server/actions"
	"github.com/davidalvarez305/vending_machine/server/database"
	"github.com/davidalvarez305/vending_machine/server/models"
	"github.com/davidalvarez305/vending_machine/server/types"
	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	var products []models.Product

	p := database.DB.Find(&products)

	if p.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": p.Error,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": products,
	})
}

func CreateProduct(c *fiber.Ctx) error {
	var products []models.Product
	var body types.Product

	err := c.BodyParser(&body)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"data": err,
		})
	}

	_, err = actions.Post(body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	p := database.DB.Find(&products)

	if p.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": p.Error,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": products,
	})
}

func UpdateProduct(c *fiber.Ctx) error {
	var products []models.Product

	var body models.Product

	err := c.BodyParser(&body)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"data": "Unable to Parse Request Body.",
		})
	}

	fmt.Printf("%+v", body)

	_, err = actions.Update(body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	p := database.DB.Find(&products)

	if p.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": p.Error,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": products,
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	var products []models.Product

	product := c.Query("product")

	id, err := strconv.Atoi(product)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"data": err,
		})
	}

	_, err = actions.DeleteProduct(id)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	p := database.DB.Find(&products)

	if p.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": p.Error,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": products,
	})
}
