package handler

import (
	"strings"

	"github.com/Wei-Shaw/sub2api/internal/pkg/response"
	"github.com/Wei-Shaw/sub2api/internal/service"

	"github.com/gin-gonic/gin"
)

type ModelPricingHandler struct {
	billingService *service.BillingService
}

func NewModelPricingHandler(billingService *service.BillingService) *ModelPricingHandler {
	return &ModelPricingHandler{billingService: billingService}
}

type userModelPricingResponse struct {
	Model            string   `json:"model"`
	Found            bool     `json:"found"`
	InputPrice       *float64 `json:"input_price"`
	OutputPrice      *float64 `json:"output_price"`
	CacheWritePrice  *float64 `json:"cache_write_price"`
	CacheReadPrice   *float64 `json:"cache_read_price"`
	ImageOutputPrice *float64 `json:"image_output_price"`
}

// List returns the current billing baseline prices used by BillingService.
// GET /api/v1/models/pricing?models=gpt-5.5,gpt-5.4
func (h *ModelPricingHandler) List(c *gin.Context) {
	modelsParam := strings.TrimSpace(c.Query("models"))
	if modelsParam == "" {
		response.BadRequest(c, "models parameter is required")
		return
	}

	models := splitModelList(modelsParam)
	if len(models) == 0 {
		response.BadRequest(c, "models parameter is required")
		return
	}
	if len(models) > 200 {
		response.BadRequest(c, "too many models requested")
		return
	}

	out := make([]userModelPricingResponse, 0, len(models))
	for _, model := range models {
		item := userModelPricingResponse{Model: model}
		pricing, err := h.billingService.GetModelPricing(model)
		if err == nil && pricing != nil {
			item.Found = true
			item.InputPrice = ptrFloat64(pricing.InputPricePerToken)
			item.OutputPrice = ptrFloat64(pricing.OutputPricePerToken)
			item.CacheWritePrice = ptrFloat64(pricing.CacheCreationPricePerToken)
			item.CacheReadPrice = ptrFloat64(pricing.CacheReadPricePerToken)
			item.ImageOutputPrice = ptrFloat64(pricing.ImageOutputPricePerToken)
		}
		out = append(out, item)
	}

	response.Success(c, out)
}

func splitModelList(raw string) []string {
	parts := strings.Split(raw, ",")
	out := make([]string, 0, len(parts))
	seen := make(map[string]struct{}, len(parts))
	for _, part := range parts {
		model := strings.TrimSpace(part)
		if model == "" {
			continue
		}
		key := strings.ToLower(model)
		if _, ok := seen[key]; ok {
			continue
		}
		seen[key] = struct{}{}
		out = append(out, model)
	}
	return out
}

func ptrFloat64(value float64) *float64 {
	if value == 0 {
		return nil
	}
	return &value
}
