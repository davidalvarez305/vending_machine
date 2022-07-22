package handlers

import (
	"encoding/gob"
	"fmt"

	"github.com/davidalvarez305/vending_machine/server/actions"
	"github.com/davidalvarez305/vending_machine/server/database"
	"github.com/davidalvarez305/vending_machine/server/models"
	"github.com/davidalvarez305/vending_machine/server/sessions"
	"github.com/davidalvarez305/vending_machine/server/types"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *fiber.Ctx) error {
	var u types.Users
	err := c.BodyParser(&u)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"data": "Unable to Parse Request Body.",
		})
	}

	if u.Password == "" || u.Username == "" {
		return c.Status(400).JSON(fiber.Map{
			"data": "Missing Fields.",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err,
		})
	}

	u.Password = string(hashedPassword)
	u.IsAdmin = false

	data, err := actions.Post(u)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"data": data,
	})
}

func GetUser(c *fiber.Ctx) error {
	var user models.Users
	gob.Register(user)
	sess, err := sessions.Sessions.Get(c)

	if err != nil {
		fmt.Printf("%+v", err)
		return c.Status(500).JSON(fiber.Map{
			"data": "Unable to retrieve cookie.",
		})
	}

	u := sess.Get("user")

	if u == nil {
		return c.Status(404).JSON(fiber.Map{
			"data": "Not found.",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": u,
	})
}

func Logout(c *fiber.Ctx) error {
	var user models.Users
	gob.Register(user)
	sess, err := sessions.Sessions.Get(c)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	if err := sess.Destroy(); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": "Logged out!",
	})
}

func Login(c *fiber.Ctx) error {
	var u types.Users
	var user models.Users
	gob.Register(user)
	err := c.BodyParser(&u)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Bad Input.",
		})
	}

	result := database.DB.Where("username = ?", &u.Username).First(&user)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Incorrect username.",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Password))

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Incorrect password.",
		})
	}

	sess, err := sessions.Sessions.Get(c)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	sess.Set("user", user)

	err = sess.Save()

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"data": err,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": user,
	})
}
