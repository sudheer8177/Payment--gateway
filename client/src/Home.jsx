import React from 'react';
import { Box, Stack } from "@chakra-ui/react";
import Card from './Card';
import axios from "axios";

const Home = () => {
    const checkoutHandler = async (amount) => {
        try {
            // Fetch the key from the server
            const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey");

            // Send a checkout request to the server
            const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
                amount
            });

            // Prepare options for Razorpay
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "6 Pack Programmer",
                description: "Tutorial of RazorPay",
                image: "https://i.pinimg.com/736x/50/08/ef/5008efb9df96969624d2674645027a3a.jpg",
                order_id: order.id,
                callback_url: "http://localhost:4000/api/paymentverification",
                prefill: {
                    name: "Sudheer Kumar",
                    email: "sudheerkumar77773@gmail.coom",
                    contact: "9346701469"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            
            // Initialize and open Razorpay
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error
        }
    };

    return (
        <Box>
            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>
                <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
                <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>
    );
}

export default Home;
