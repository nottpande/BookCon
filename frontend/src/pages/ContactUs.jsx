import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactUs() {
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#19191b' }}>
      <div className="row w-100">
        {/* Image Column */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src="/contact.png" alt="Contact Us" className="img-fluid" style={{ borderRadius: '30px', maxHeight: '80%', maxWidth: '100%' }} />
        </div>

        {/* Form Column */}
        <div className="col-md-4 mx-auto d-flex justify-content-start">
          <div className="card p-4" style={{ width: '100%', backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '30px' }}>
            <h2 className='display-6 text-center mb-3'>HELP CENTRE</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="First name" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Last name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phoneNumber" placeholder="+91-1234567890" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="3" placeholder="Describe your Issue"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn" style={{ backgroundColor: '#51c3ba', color: 'white', width: '100%' }}>Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
