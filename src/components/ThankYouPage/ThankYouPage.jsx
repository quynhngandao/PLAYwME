import React from 'react';
import './ThankYouPage.css'
import { Button } from '@mui/material';

const CustomComponent = () => {
  return (
    <div className="thankyou-page">
      <div className="yellow-box"></div>
      <div className="blue-box"></div>
      <img className="image" src="https://s3-alpha-sig.figma.com/img/bf3a/9aea/7abed1c355b4aff3ca31596a9f510f5f?Expires=1691971200&Signature=O~S6UHh2~WDyFkNwmzAAvKQgkAF4HNLaMaiR1a9fSB52CxuTtN-erLvBgkibIEXOraYpcwaQA~f9Qehp6kLEMUWKpAT~WB1Y~oQe1VlDZHlIvvW9MmFsXXIlgNwwnaU5XlJhrh-9rn4mobkhXw6wagqCsi4W4Er7DMKyt7K0fdkeqRBxsLMQSYARwVsn1OWMaaj5jzG5nrGJFN9BpaPuUsnRWKos2FiVbyTqht0Pmg3MNy4Y-o7VD5e97c05a6LeroN3KKBHbbXtCOEB55lNF6Q0VxqFdjBTig6GCyipFZohSCDTcAMpb9em7gQHYWomCUEgdVZXj7r-zAuKz4aT~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
      <div className="text-container">
        <div className="title">Thank You</div>
        <div className="message">We Appreciate You! You Will Be Contacted Shortly!</div>
        <div className="button-container">
          <Button className="button">Go Back Home</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomComponent;
