// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     // Backend'den clientSecret al
//     const response = await fetch("/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 5000, currency: "usd" }), // $50 için 5000 cent
//     });
//     const { clientSecret } = await response.json();

//     // Stripe ile ödemeyi onayla
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: event.target.cardholderName.value, // Kart sahibi adı
//         },
//       },
//     });

//     if (error) {
//       console.error(error);
//       alert("Payment failed. Please try again.");
//     } else if (paymentIntent.status === "succeeded") {
//       console.log("Payment successful:", paymentIntent);
//       alert("Payment successful!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Kart Sahibi Adı */}
//           <div className="mb-12">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
//             <input
//               type="text"
//               name="cardholderName"
//               placeholder="John Doe"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Kart Bilgileri */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
//             <div className="border border-gray-300 rounded-lg p-3">
//               <CardElement
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "16px",
//                       color: "#424770",
//                       "::placeholder": {
//                         color: "#aab7c4",
//                       },
//                     },
//                     invalid: {
//                       color: "#9e2146",
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           {/* Ödeme Butonu */}
//           <button
//             type="submit"
//             disabled={!stripe}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {stripe ? "Pay $50" : "Loading..."}
//           </button>

//           {/* Güvenlik Mesajı */}
//           <p className="text-sm text-gray-500 mt-4 text-center">
//             You'll be charged $50. Your payment is secure and encrypted.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;