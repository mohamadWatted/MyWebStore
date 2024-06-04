import React from "react";
import {
  container,
  cardA,
  cardB,
  sliceA,
  sliceB,
  cardCenter,
  h3Style,
} from "./AboutStyles";
const AboutComponents = () => {
  return (
    <div>
      <div style={container}>
        <div style={cardA}>
          <div>
            <img
              style={sliceA}
              src="https://i.imgur.com/R8OsXeK.png"
              alt="my photo"
            />
          </div>
          <div style={sliceB}>
            <h2>Mohamad Watted</h2>
            <br />
            <p>Full Stack Developer</p>
          </div>
        </div>

        <div style={cardCenter}>
          <div>
            <h3>Project Name:</h3>
          </div>
          <div>
            <h2>Full Stack in .NET and Entity Framework</h2>
          </div>
        </div>
        {/* ------------------------------------ */}
        <div style={cardB}>
          <h3>Main purpose</h3>
          <div style={sliceB}>
            <h4>Backand</h4>
            <p>
              Development of an advanced inventory management system using .NET
              and Entity Framework. You can allow users to use product
              inventory, track orders, and perform various analyses.
            </p>{" "}
          </div>

          <div>
            <h4>Frontend</h4>
            <p>
              The project is an inventory management system developed using a
              modern technology stack, including React, TypeScript, Redux
              Toolkit, Emotion, React Bootstrap and SweetAlert2. It offers
              responsive design, robust state management, user-friendly UI
              components, and TypeScript-based development approaches to ensure
              code quality and type safety. The project focuses on user
              authentication, product and order management and user profiles,
              supported by comprehensive documentation and ongoing support.
            </p>
          </div>
        </div>

        <div style={cardCenter}>
          <div>
            <h3>The exact needs of the project:</h3>
          </div>
          <div>
            <p>Full Stack in .NET and Entity Framework</p>
          </div>
        </div>

        {/* ----------------1------------------- */}
        <div style={cardA}>
          <div style={sliceA}>
            <h3 style={h3Style}>1</h3>
          </div>
          <div style={sliceB}>
            <h3> Graphic user interface</h3>
            <p>
              Development of an intuitive and easy-to-use user interface, which
              allows easy and efficient navigation between different screens.
            </p>
          </div>
        </div>
        {/* ----------------2------------------- */}
        <div style={cardB}>
          <div style={sliceB}>
            <h3>Inventory management</h3>
            <p>
              Ability to add, update, delete and see information about products
              in stock. including details such as product name, price, quantity
              in stock, photos and categories by logging in Login:
              Admin@gmail.com.
            </p>
          </div>
          <div>
            <h3 style={h3Style}>2</h3>
          </div>
        </div>
        {/* ----------------3------------------- */}
        <div style={cardA}>
          <div>
            <h3 style={h3Style}>3</h3>
          </div>
          <div style={sliceB}>
            <h3>Area Tracking orders</h3>
            <p>
              Data security: The system will be secure with login options and
              appropriate users, and protection of sensitive data.
            </p>
          </div>
        </div>
        {/* ----------------4------------------- */}
        <div style={cardB}>
          <div style={sliceB}>
            <h3>Data security</h3>
            <p>
              The system will be secure with login options and appropriate
              users, and protection of sensitive data.
            </p>
          </div>
          <div>
            <h3 style={h3Style}>4</h3>
          </div>
        </div>
        {/* ----------------5------------------- */}
        <div style={cardCenter}>
          <p>
            to achieve the goal. ASP Core was used to develop the API, Entity
            Framework to manage administration, and React to develop the
            graphical user interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutComponents;
