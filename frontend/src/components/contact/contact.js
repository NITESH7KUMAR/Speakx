import React from 'react';
import './contact.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Contact() {
  return (
    <>
      <div className="contact">
        <h1>Contact Us</h1>
        <h4>We Build, Create and Deliver</h4>
        <p>We strive to provide excellent service and meet your expectations.</p>
        <p>Feel free to reach out to us with any questions or inquiries.</p>

        <div className="detail">
          <p>Phone: +1 123-456-7890</p>
          <p>Email: speakx@gmail.com</p>
        </div>

        <div className="social-media">
          <a href="#facebook">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="#twitter">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#instagram">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="#linkedin">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>

        <p>We are here to help. Have a question? Feel free to ask.</p>
        <h3>Our Address</h3>
        <p>123 Main St, LPU, Punjab</p>

        <div className="contact-form">
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Phone" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
