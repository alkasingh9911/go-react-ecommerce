package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ecommerce-api/models"
)

type OrderHandler struct {
	DB *gorm.DB
}

type CreateOrderRequest struct {
	CartID uint `json:"cart_id" binding:"required"`
}

func (h *OrderHandler) CreateOrder(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var req CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	if err := h.DB.Preload("CartItems").Where("id = ? AND user_id = ?", req.CartID, userID).First(&cart).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
		return
	}

	if len(cart.CartItems) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
		return
	}

	order := models.Order{UserID: userID}
	if err := h.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	for _, cartItem := range cart.CartItems {
		orderItem := models.OrderItem{
			OrderID: order.ID,
			ItemID:  cartItem.ItemID,
		}
		h.DB.Create(&orderItem)
	}

	h.DB.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{})
	h.DB.Delete(&cart)

	h.DB.Preload("OrderItems.Item").First(&order, order.ID)
	c.JSON(http.StatusCreated, order)
}

func (h *OrderHandler) ListOrders(c *gin.Context) {
	userID := c.GetUint("user_id")
	
	var orders []models.Order
	h.DB.Preload("OrderItems.Item").Where("user_id = ?", userID).Find(&orders)
	c.JSON(http.StatusOK, orders)
}
