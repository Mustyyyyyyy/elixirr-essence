import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion } from "../components/Accordion";
import { useEffect } from "react";

const faqSections = [
  {
    title: "Orders",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "You can place an order through our website or by contacting us on WhatsApp. Select your desired items, add them to your bag, and proceed to checkout.",
      },
      {
        question: "Can I modify my order after placing it?",
        answer:
          "Please contact us on WhatsApp as soon as possible to modify your order. We cannot guarantee changes once an order has been processed.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        question: "Do you deliver outside Nigeria?",
        answer:
          "Currently, we deliver within Nigeria only. Please contact us on WhatsApp for international delivery inquiries.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery timelines vary by location. Please contact us on WhatsApp for current delivery estimates for your area.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "Orders are currently processed via WhatsApp. Payment arrangements will be made directly with our team. Online payment integration is coming soon.",
      },
    ],
  },
  {
    title: "Returns",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Please contact us on WhatsApp for return and exchange inquiries. Each case is handled individually based on the product and condition.",
      },
    ],
  },
  {
    title: "Product Care",
    items: [
      {
        question: "How do I care for my accessories?",
        answer:
          "Each product listing includes specific care instructions. Generally, avoid direct contact with water, chemicals, and store in a dry place.",
      },
    ],
  },
  {
    title: "Sizing",
    items: [
      {
        question: "How do I find my ring size?",
        answer:
          "Ring sizes are listed on each product page. If you are unsure, please contact us on WhatsApp for sizing guidance.",
      },
      {
        question: "Are necklace lengths adjustable?",
        answer:
          "Chain lengths vary by product. Each listing specifies the available sizes. Some chains can be adjusted - please check the product details.",
      },
    ],
  },
  {
    title: "WhatsApp Orders",
    items: [
      {
        question: "Can I order through WhatsApp?",
        answer:
          "Yes, you can order through WhatsApp. Simply send us a message with the products you are interested in and we will guide you through the process.",
      },
      {
        question: "What is your WhatsApp number?",
        answer:
          "You can reach us at 08100181602. Click the WhatsApp button on our website to start a conversation.",
      },
    ],
  },
];

export function FAQ() {
  const [allItems, setAllItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    const combined = faqSections.flatMap((s) => s.items);
    setAllItems(combined);
  }, []);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
            FAQ
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Frequently Asked
            <br />
            Questions
          </h1>
        </div>

        {faqSections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-white/40 mb-6">
              {section.title}
            </h2>
            <div className="max-w-3xl">
              <Accordion items={section.items} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
