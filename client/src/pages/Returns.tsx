import { PolicyPage } from "./PolicyPage";

export function Returns() {
  return (
    <PolicyPage
      eyebrow="Customer care / Returns"
      title="A simple return process."
      intro="If something is not right with your order, reach out to us and we will review it with you."
      sections={[
        { heading: "Start a request", body: "Contact us on WhatsApp as soon as possible with your order number, the item concerned, and a brief description of the issue." },
        { heading: "Condition", body: "Items must be unused and returned in their original condition and packaging. Items showing signs of wear may not qualify for a return or exchange." },
        { heading: "Review and resolution", body: "Each request is reviewed individually. Once approved, we will confirm the available exchange, replacement, or other resolution with you." },
      ]}
    />
  );
}
