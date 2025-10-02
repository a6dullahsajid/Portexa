"use client";
import React, { useState } from 'react'
import styles from './FAQSection.module.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is Portexa?",
      answer: "Portexa is a revolutionary portfolio-building platform that helps professionals create stunning portfolios in minutes by simply filling out forms. No coding skills required - just answer questions about your work, upload your projects, and we'll generate a professional portfolio for you to land your dream opportunities."
    },
    {
      question: "How much does it cost?",
      answer: "Portexa is completely free! Access all our professional templates and form-filling features at no cost. Create unlimited portfolios without any hidden fees or subscription charges."
    },
    {
      question: "Do I need coding skills?",
      answer: "Absolutely not! Portexa works like a simple questionnaire - just fill out forms about your experience, projects, and skills. If you can fill out a job application, you can create a stunning portfolio with our guided form system."
    },
    {
      question: "Can I switch templates after my portfolio is live?",
      answer: "Yes! Switch templates instantly without losing any of your form data - your projects, text, and images are preserved. Browse our template library, select a new design, and transform your portfolio in seconds while keeping all your information intact."
    },
    {
      question: "Are Portexa portfolios SEO-friendly?",
      answer: "Absolutely! Our portfolios include optimized meta tags, fast loading speeds, mobile responsiveness, and clean HTML code that search engines love."
    },
    {
      question: "How quickly does my portfolio update after I save changes?",
      answer: "Updates are instant! Your form changes go live immediately across all devices and browsers with no waiting period. Our global CDN ensures worldwide updates within seconds, so you can make last-minute edits before important meetings."
    },
    {
      question: "How do I publish my portfolio?",
      answer: "Simply click the 'Publish' button and your portfolio goes live instantly. No technical setup required - we handle everything. Share your portfolio link on resumes, business cards, and social media immediately."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
      <div className={styles.faqContainer}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div 
              className={styles.faqQuestion} 
              onClick={() => toggleFAQ(index)}
            >
              <h2>{faq.question}</h2>
              <span className={`${styles.plusIcon} ${openIndex === index ? styles.rotated : ''}`}>
                +
              </span>
            </div>
            <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
