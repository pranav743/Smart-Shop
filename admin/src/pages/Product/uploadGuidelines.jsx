import React from 'react';

function ProductListingGuidelines() {
  const guidelines = [
    "Ensure that the product information provided is accurate, complete, and up-to-date.",
    "Use high-resolution images that accurately represent the product.",
    "Provide clear and concise descriptions that highlight the key features, benefits, and any unique selling points of the product.",
    "Choose the most appropriate category and subcategory for each product listing.",
    "Ensure that your products comply with all relevant laws, regulations, and safety standards.",
    "Clearly display the correct pricing information for each product, including any applicable taxes, fees, or discounts.",
    "Keep the product availability information accurate and updated.",
    "Provide clear details about shipping options, delivery times, and any associated costs.",
    "Encourage customers to leave honest reviews and ratings for your products.",
    "Avoid listing products that promote violence, hate speech, illegal activities, or any content that violates ethical standards."
  ];

  return (
    <>
    <p style={{fontSize: '20px', letterSpacing: '2px'}}>Instructions : </p>
    <ol style={{width: '100%'}}>
      {guidelines.map((guideline, index) => (
        <li key={index}>{guideline}</li>
      ))}
    </ol>
    </>
  );
}

export default ProductListingGuidelines;
