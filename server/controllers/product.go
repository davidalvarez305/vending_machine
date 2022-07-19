package controllers

import (
	"github.com/davidalvarez305/vending_machine/server/handlers"
	"github.com/gofiber/fiber/v2"
)

func Product(router fiber.Router) {

	product := router.Group("product")

	product.Get("/", handlers.GetProducts)
	product.Post("/", handlers.CreateProduct)
	product.Put("/", handlers.UpdateProduct)
	product.Delete("/", handlers.DeleteProduct)
}
