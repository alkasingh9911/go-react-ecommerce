package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	
	"ecommerce-api/handlers"
	"ecommerce-api/middleware"
	"ecommerce-api/models"
)

func main() {
	db, err := gorm.Open(sqlite.Open("ecommerce.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err := models.MigrateDB(db); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	userHandler := &handlers.UserHandler{DB: db}
	itemHandler := &handlers.ItemHandler{DB: db}
	cartHandler := &handlers.CartHandler{DB: db}
	orderHandler := &handlers.OrderHandler{DB: db}

	r.POST("/users", userHandler.CreateUser)
	r.GET("/users", userHandler.ListUsers)
	r.POST("/users/login", userHandler.Login)

	r.POST("/items", itemHandler.CreateItem)
	r.GET("/items", itemHandler.ListItems)

	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware(db))
	{
		authorized.POST("/carts", cartHandler.AddToCart)
		authorized.GET("/carts", cartHandler.ListCarts)
		authorized.POST("/orders", orderHandler.CreateOrder)
		authorized.GET("/orders", orderHandler.ListOrders)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	log.Println("Server starting on :" + port)
	r.Run(":" + port)
}
