package routes

import (
	"github.com/davidalvarez305/vending_machine/server/controllers"
	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	api := app.Group("api")
	controllers.User(api)
	controllers.Product(api)
}
