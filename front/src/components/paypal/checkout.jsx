import React, { useEffect } from "react";
import axios from "axios";

const PayPalButton = () => {
  useEffect(() => {
    // Load the PayPal JavaScript SDK
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AabA922Wg_hBBqOYQ7DdlY_zCbeQQ3sqkJ0EUPRTiOuGXSderRyEy2C9NPjL4Z5Bd9rMj5FTIUfiwle-&currency=USD";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical", // Layout of the button
              color: "blue", // Color of the button
              shape: "pill", // Shape of the button
              label: "checkout", // Label of the button
            },
            async createOrder() {
              try {
                const response = await fetch("/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cart: [
                      {
                        id: "samsung",
                        quantity: "2",
                      },
                    ],
                  }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
                resultMessage(
                  `Could not initiate PayPal Checkout...<br><br>${error}`
                );
              }
            },
            async onApprove(data, actions) {
              try {
                const response = await fetch(
                  `/api/orders/${data.orderID}/capture`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const orderData = await response.json();

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else if (!orderData.purchase_units) {
                  throw new Error(JSON.stringify(orderData));
                } else {
                  const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments
                      ?.authorizations?.[0];
                  resultMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
                  );
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                  );

                  // Make the axios call when the payment is approved
                  axios.get("/checkout").then((response) => {
                    console.log("Checkout response:", response.data);
                    // Handle the response as needed
                  });
                }
              } catch (error) {
                console.error(error);
                resultMessage(
                  `Sorry, your transaction could not be processed...<br><br>${error}`
                );
              }
            },
          })
          .render("#paypal-button-container");
      } else {
        console.error("PayPal SDK not loaded");
      }
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const resultMessage = (message) => {
    const container = document.querySelector("#result-message");
    if (container) {
      container.innerHTML = message;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div id="paypal-button-container" className="my-4"></div>
      <p id="result-message" className="text-red-500"></p>
    </div>
  );
};

export default PayPalButton;
