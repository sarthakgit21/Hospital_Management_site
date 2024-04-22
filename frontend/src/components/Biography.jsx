import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            We offer a comprehensive range of medical services to address a
            variety of health concerns. From primary care to specialized
            treatments, our goal is to provide personalized care tailored to
            each patient's unique needs. Our primary care physicians focus on
            preventive care and routine check-ups to keep you healthy, while our
            team of specialists offers expertise in areas such as cardiology,
            orthopedics, and more. In times of emergency, our 24/7 emergency
            department stands ready to provide immediate medical attention and
            expert care for all types of emergencies. Our skilled surgical team
            utilizes advanced techniques and technology to perform a wide range
            of surgical procedures, from minimally invasive surgeries to complex
            interventions.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            As a trusted healthcare provider in the community, we are dedicated
            to improving the health and well-being of our patients through
            education, outreach, and community partnerships. Whether you need to
            schedule an appointment, inquire about our services, or have any
            other questions, we're here to help. Contact us today to experience
            the difference at Heal Health Hospital.
          </p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
