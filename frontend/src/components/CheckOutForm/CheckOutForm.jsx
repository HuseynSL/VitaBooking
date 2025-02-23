import React from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;


    const response = await fetch("https://your-api-url.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, currency: "usd" }),
    });
    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: event.target.cardholderName.value,
        },
      },
    });

    if (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      alert("Payment successful!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" className="w-full p-3 border rounded-lg" placeholder="E-posta adresiniz" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
            <div className="p-3 border rounded-lg flex gap-2 bg-gray-50">
              <CardNumberElement className="flex-1 p-2 border rounded-md" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">AA / YY</label>
              <div className="p-3 border rounded-lg bg-gray-50">
                <CardExpiryElement className="w-full p-2" />
              </div>
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <div className="p-3 border rounded-lg bg-gray-50">
                <CardCvcElement className="w-full p-2" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Owner Name</label>
            <input type="text" name="cardholderName" className="w-full p-3 border rounded-lg" placeholder="Ad ve Soyad" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select className="w-full p-3 border rounded-lg">
              <option>Azerbaijan</option>
              <option>Turkey</option>
              <option>Germany</option>
              <option>Russia</option>
              <option>United States</option>
              <option>China</option>
            </select>
          </div>

          <button type="submit" disabled={!stripe} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
