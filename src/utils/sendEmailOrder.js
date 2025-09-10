export const sendOrderEmail = async (orderData) => {
  try {
    // Construct the email content
    const productsText = orderData.products
      .map(p => `${p.name} x ${p.quantity} = ₹${p.total.toFixed(2)}`)
      .join("\n");

    const totalAmount = orderData.products
      .reduce((sum, p) => sum + p.total, 0)
      .toFixed(2);

    const templateParams = {
      to_name: "Admin", // recipient name
      message: `New order placed:\n\n${productsText}\n\nTotal Amount: ₹${totalAmount}`,
      from_name: "user@gmail.com",
      reply_to: "sivaagpc@gmail.com.com",
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
    console.log("Order email sent successfully!");
  } catch (err) {
    console.error("Failed to send order email:", err);
  }
};
