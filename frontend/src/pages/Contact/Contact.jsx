import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Please wait...');

    const formDataToSend = {
      access_key: 'f62d7e69-e609-452d-8578-fb8bac58967e',
      subject: 'You have Received a Message from Olive Foods',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      botcheck: false
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formDataToSend)
      });

      const json = await response.json();
      
      if (response.status === 200) {
        setResult(json.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
        toast.success('Message sent successfully!');
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setResult(json.message);
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setResult('Something went wrong!');
      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setResult('');
      }, 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>support@olivefoods.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>123 Food Street<br />Delicious City, DC 12345</p>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <input type="hidden" name="access_key" value="hdwhjd-wdwhjd-232nwdw-djdu2" />
              <input type="hidden" name="subject" value="New Contact Form Submission from Olive Foods" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Enter your message"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {result && (
                <div className={`result-message ${result.includes('success') || result.includes('Thank') ? 'success' : 'error'}`}>
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
