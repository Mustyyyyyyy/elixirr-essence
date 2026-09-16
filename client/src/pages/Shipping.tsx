import { PolicyPage } from "./PolicyPage";

export function Shipping() {
  return (
    <PolicyPage
      eyebrow="Customer care / Shipping"
      title="Shipping, considered."
      intro="We prepare every order with care and keep you informed from confirmation through delivery."
      sections={[
        { heading: "Processing", body: "Orders are prepared after confirmation. Our team will contact you through WhatsApp with the next steps and an estimated delivery window." },
        { heading: "Delivery windows", body: "Delivery timing depends on your location and item availability. Please share accurate contact and delivery details at checkout so our courier can reach you." },
        { heading: "Delivery updates", body: "For the latest update on an order, contact us with your order details. We will help coordinate any delivery questions directly." },
      ]}
    />
  );
}
