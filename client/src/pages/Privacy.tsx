import { PolicyPage } from "./PolicyPage";

export function Privacy() {
  return (
    <PolicyPage
      eyebrow="Legal / Privacy"
      title="Your privacy matters."
      intro="We collect only the information needed to provide a thoughtful shopping and delivery experience."
      sections={[
        { heading: "Information we collect", body: "When you place an order or subscribe, we may collect your name, contact details, delivery information, and order preferences." },
        { heading: "How we use it", body: "We use your information to process orders, coordinate delivery, answer support requests, and share updates when you have subscribed to them." },
        { heading: "Your choices", body: "You can ask us to update or remove your details, or unsubscribe from marketing updates, by contacting our team." },
      ]}
    />
  );
}
