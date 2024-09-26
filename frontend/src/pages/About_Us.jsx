import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: '#19191b', color: 'white', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center">
          <h3 className="display-1">About Us</h3>
        </div>
        <br /><br />
        <h4 className="blockquote">Welcome to ContractorConnect, where seamless connections spark golden opportunities.</h4>
        <p className="blockquote">ContractorConnect is your premier destination for connecting vendors with multinational corporations (MNCs), fostering partnerships that drive mutual success. Our platform is meticulously crafted to simplify the process of linking vendors offering top-tier products and services with MNCs seeking innovative solutions to propel their businesses forward.</p>
        <p className="blockquote">Dedicated to excellence and efficiency, we provide a comprehensive marketplace where vendors can showcase their offerings to a global audience of MNCs actively seeking new collaborations. Our user-friendly interface ensures MNCs have access to a diverse range of vendors, guaranteeing they find the perfect match for their unique needs and requirements.</p>
        <p className="blockquote">What distinguishes ContractorConnect is our unwavering commitment to fostering genuine relationships and facilitating transparent communication between vendors and MNCs. We recognize the significance of trust and reliability in business partnerships, which is why integrity and accountability are at the core of our platform.</p>
        <p className="blockquote">Whether you're a vendor looking to expand your reach or an MNC seeking innovative solutions from trusted partners, ContractorConnect is your ultimate ally. Join us today and unlock a world of opportunities for your business.</p>

        <section className="locations">
          <div className="heading">
            <div className="text-center">
              <h2 className="display-4">Available across multiple Cities!</h2>
            </div>
            <br /><br />
          </div>
          <div className="row justify-content-center text-center">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="blockquote">Bangalore</li>
                <li className="blockquote">Belgum</li>
                <li className="blockquote">Dispur</li>
                <li className="blockquote">Chennai</li>
                <li className="blockquote">Vishakapatnam</li>
                <li className="blockquote">Hyderabad</li>
                <li className="blockquote">Nagpur</li>
                <li className="blockquote">Mumbai</li>
                <li className="blockquote">Kolkata</li>
                <li className="blockquote">Sricity</li>
                <li className="blockquote">Delhi</li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="blockquote">Ahemdabad</li>
                <li className="blockquote">Bhubneshwar</li>
                <li className="blockquote">Raipur</li>
                <li className="blockquote">Udaipur</li>
                <li className="blockquote">Lucknow</li>
                <li className="blockquote">Patna</li>
                <li className="blockquote">Chandighar</li>
                <li className="blockquote">Noida</li>
                <li className="blockquote">Jaipur</li>
                <li className="blockquote">Bhopal</li>
                <li className="blockquote">Jammu and Kashmir</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
