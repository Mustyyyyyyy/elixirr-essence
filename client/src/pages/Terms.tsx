import { PolicyPage } from "./PolicyPage";

export function Terms() {
  return (
    <PolicyPage
      eyebrow="Legal / Terms"
      title="Our terms of service."
      intro="These terms help keep every Elixirr Essence order clear, considered, and fair."
      sections={[
        { heading: "Orders", body: "An order is confirmed once our team has reviewed the details with you. Product availability and pricing may be confirmed before fulfilment." },
        { heading: "Product details", body: "We take care to represent each piece accurately. Colours and textures may vary slightly depending on your screen and the nature of the materials." },
        { heading: "Responsible use", body: "All website content, images, and brand materials belong to Elixirr Essence and may not be copied or used commercially without permission." },
      ]}
    />
  );
}
