package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ecommerce-api/models"
)

type CartHandler struct {
	DB *gorm.DB
}

type AddToCartRequest struct {
	ItemID uint `json:"item_id" binding:"required"`
}

func (h *CartHandler) AddToCart(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var req AddToCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var item models.Item
	if err := h.DB.First(&item, req.ItemID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}

	var cart models.Cart
	if err := h.DB.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		cart = models.Cart{UserID: userID}
		h.DB.Create(&cart)
	}

	cartItem := models.CartItem{
		CartID: cart.ID,
		ItemID: req.ItemID,
	}

	if err := h.DB.Create(&cartItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item to cart"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Item added to cart", "cart_id": cart.ID})
}

func (h *CartHandler) ListCarts(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var cart models.Cart
	if err := h.DB.Preload("CartItems.Item").Where("user_id = ?", userID).First(&cart).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{"cart_items": []models.CartItem{}})
		return
	}

	c.JSON(http.StatusOK, cart)
}
