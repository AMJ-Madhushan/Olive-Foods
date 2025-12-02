import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageHero from '../../components/PageHero/PageHero'

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
    <div className="font-manrope min-h-screen bg-background">
      <PageHero 
        header="Contact Us"
        title="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />
      <div className="max-w-[1200px] mx-auto py-[60px] px-5 max-[768px]:py-10 max-[768px]:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start max-[1024px]:gap-10 max-[768px]:gap-8">
          {/* Contact Information Section */}
          <div className="flex flex-col gap-[30px] max-[768px]:gap-6">
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] border border-gray-100 max-[768px]:p-6 max-[480px]:p-5">
              <div className="text-[3rem] mb-4 max-[768px]:text-[2.5rem]">📧</div>
              <h3 className="text-xl text-primary mb-2.5 font-semibold max-[768px]:text-lg">Email</h3>
              <p className="text-text leading-relaxed text-base max-[768px]:text-sm">support@olivefoods.com</p>
            </div>
            
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] border border-gray-100 max-[768px]:p-6 max-[480px]:p-5">
              <div className="text-[3rem] mb-4 max-[768px]:text-[2.5rem]">📞</div>
              <h3 className="text-xl text-primary mb-2.5 font-semibold max-[768px]:text-lg">Phone</h3>
              <p className="text-text leading-relaxed text-base max-[768px]:text-sm">+1 (555) 123-4567</p>
            </div>
            
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] border border-gray-100 max-[768px]:p-6 max-[480px]:p-5">
              <div className="text-[3rem] mb-4 max-[768px]:text-[2.5rem]">📍</div>
              <h3 className="text-xl text-primary mb-2.5 font-semibold max-[768px]:text-lg">Address</h3>
              <p className="text-text leading-relaxed text-base max-[768px]:text-sm">123 Food Street<br />Delicious City, DC 12345</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 max-[768px]:p-8 max-[768px]:px-6 max-[480px]:p-6 max-[480px]:px-5">
            <h2 className="text-2xl font-bold text-primary mb-6 max-[768px]:text-xl max-[768px]:mb-5">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-[768px]:gap-5">
              <input type="hidden" name="access_key" value="hdwhjd-wdwhjd-232nwdw-djdu2" />
              <input type="hidden" name="subject" value="New Contact Form Submission from Olive Foods" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-text text-base max-[768px]:text-sm">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full p-[15px] border-2 border-lightgray rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] max-[768px]:p-3 max-[768px]:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-text text-base max-[768px]:text-sm">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full p-[15px] border-2 border-lightgray rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] max-[768px]:p-3 max-[768px]:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-semibold text-text text-base max-[768px]:text-sm">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full p-[15px] border-2 border-lightgray rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] max-[768px]:p-3 max-[768px]:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-semibold text-text text-base max-[768px]:text-sm">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Enter your message"
                  className="w-full p-[15px] border-2 border-lightgray rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text resize-y min-h-[120px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] max-[768px]:p-3 max-[768px]:text-sm"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-br from-primary to-secondary text-white border-none py-[15px] px-[30px] rounded-xl text-lg font-bold cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(78,140,1,0.3)] hover:from-secondary hover:to-tertiary disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 max-[768px]:py-3 max-[768px]:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {result && (
                <div className={`p-4 rounded-xl text-center font-medium mt-2 ${result.includes('success') || result.includes('Thank') ? 'bg-[#d4edda] text-[#155724] border border-[#c3e6cb]' : 'bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb]'}`}>
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
