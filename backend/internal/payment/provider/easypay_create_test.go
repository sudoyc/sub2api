package provider

import (
	"context"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/Wei-Shaw/sub2api/internal/payment"
)

func TestEasyPayAPIPaymentDoesNotIncludeClientIPInSignature(t *testing.T) {
	t.Parallel()

	var gotForm url.Values
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/mapi.php" {
			t.Errorf("create payment path = %q, want /mapi.php", r.URL.Path)
		}
		if err := r.ParseForm(); err != nil {
			t.Errorf("ParseForm: %v", err)
		}
		gotForm = r.PostForm

		signParams := map[string]string{}
		for key := range gotForm {
			signParams[key] = gotForm.Get(key)
		}
		delete(signParams, "clientip")
		wantSign := easyPaySign(signParams, "pkey-1")
		if got := gotForm.Get("sign"); got != wantSign {
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`{"code":-1,"msg":"签名验证失败","payurl":"","qrcode":""}`))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"code":1,"msg":"success","trade_no":"trade-1","payurl":"https://pay.example/order","qrcode":"qr"}`))
	}))
	defer server.Close()

	provider := newTestEasyPay(t, server.URL)
	resp, err := provider.CreatePayment(context.Background(), payment.CreatePaymentRequest{
		OrderID:     "order-1",
		PaymentType: payment.TypeAlipay,
		Subject:     "test order",
		Amount:      "0.01",
		ClientIP:    "203.0.113.10",
	})
	if err != nil {
		t.Fatalf("CreatePayment returned error: %v (form=%v)", err, gotForm)
	}
	if resp == nil || resp.TradeNo != "trade-1" || resp.PayURL == "" || resp.QRCode == "" {
		t.Fatalf("CreatePayment response = %+v, want populated response", resp)
	}
	if got := gotForm.Get("clientip"); got != "203.0.113.10" {
		t.Fatalf("form[clientip] = %q, want request client IP", got)
	}
}
