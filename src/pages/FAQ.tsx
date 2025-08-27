import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I send a parcel?",
    answer:
      "Login to your account, go to 'Create Parcel', fill in the pickup and delivery details, parcel type, weight, and cost. Once submitted, our team will process your request."
  },
  {
    question: "How can I track my parcel?",
    answer:
      "You can track your parcel using the Tracking ID provided after booking. Enter the ID in the tracking section to see real-time updates."
  },
  {
    question: "What parcel types are supported?",
    answer:
      "We support documents, electronics, fragile items, clothing, and more. Please check the guidelines for restricted items before booking."
  },
  {
    question: "Can I cancel a parcel after booking?",
    answer:
      "Yes, you can cancel a parcel as long as it hasn’t been dispatched. Go to your dashboard, select the parcel, and click 'Cancel Parcel'."
  },
  {
    question: "What happens if the receiver is unavailable?",
    answer:
      "If the receiver is unavailable, our delivery partner will try again. If delivery is still unsuccessful, the parcel may be marked as 'RETURNED'."
  },
  {
    question: "How is delivery cost calculated?",
    answer:
      "Delivery cost is calculated based on parcel type, weight, and distance between pickup and delivery addresses."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 2–5 business days depending on distance. Express delivery options may be available in your area."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
