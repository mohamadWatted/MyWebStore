# Mohamad Watted
> A React project with a .NET backend.

## Table of Contents
* [General Information](#general-information)
* [Built With](#built-with)
* [How It Works](#how-it-works)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)

## ℹ️ General Information
<a name="general-information"/>

MyStore is a clothing store project. It is designed to solve [specific problems] and serves the purpose of [its intended use].
The project was created as a project task for [ReactJS]


## ⚒️ Built With
<a name="built-with"/>

### The following NuGet packages are used in the backend project:

- Microsoft.AspNetCore.Authentication.JwtB: 6.0.20
- Microsoft.AspNetCore.Identity.EntityFramewor: 6.0.21
- Microsoft.AspNetCore.Mvc.NewtonsoftJson: 6.0.20
- Microsoft.AspNetCore.Mvc.Versioning: 6.0.21
- Microsoft.EntityFrameworkCore: 7.0.9
- Microsoft.EntityFrameworkCore: 7.0.9


### The following packages are used in the frontend project: 
- @fontsource/roboto": "^5.0.8,
- @emotion/css": "^11.11.2,
- @emotion/react": "^11.11.1,
- @emotion/styled": "^11.11.0,
- @mantine/carousel": "^6.0.20,
- @mantine/core": "^6.0.20,
- @mantine/dates": "^6.0.20,
- @mantine/dropzone": "^6.0.20,
- @mantine/form": "^6.0.20,
- @mantine/hooks": "^6.0.20,
- @mantine/modals": "^6.0.20,
- @mantine/notifications": "^6.0.20,
- @mantine/nprogress": "^6.0.20,
- @mantine/prism": "^6.0.20,
- @mantine/spotlight": "^6.0.20,
- @mantine/tiptap": "^6.0.20,
- @mui/material": "^5.14.18,
- @reduxjs/toolkit": "^1.9.5,
- @tabler/icons": "^2.30.0,
- @tabler/icons-react": "^2.41.0,
- @testing-library/jest-dom": "^5.17.0,
- @testing-library/react": "^13.4.0,
- @testing-library/user-event": "^13.5.0,
- @tiptap/extension-link": "^2.1.8,
- @tiptap/react": "^2.1.8,
- @tiptap/starter-kit": "^2.1.8,
- @types/jest": "^27.5.2,
- @types/node": "^16.18.39,
- @types/react": "^18.2.18,
- @types/react-dom": "^18.2.7,
- "antd": "^5.8.6",
- "axios": "^1.4.0",
- "bootstrap": "^5.3.1",
- "react-bootstrap": "^2.8.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-icons": "^4.10.1",
- "react-loader-spinner": "^5.3.4",
- "react-redux": "^8.1.2",
- "react-router-dom": "^6.21.1",
- "react-scripts": "5.0.1",
- "react-toastify": "^9.1.3",
- "redux": "^4.2.1",
- "redux-logger": "^3.0.6",
- "sweetalert2": "^11.7.20",
- "typescript": "^4.9.5",
- "web-vitals": "^2.1.4",
- "yup": "^1.3.2"

## 💁 How It Works
<a name="how-it-works"/>

### Logged-In Admin:
Permission exists for Backoffice,
Ability to dive into all products while being able to: add, expand and delete,
Another option is to add to the shopping cart.


  ``` 
  Admin@gmail.com
  ```
  ``` 
  12345678
  ```
  
### Logged-In Users:
limited abilities,\
User action You can choose and the product is sent to the shopping cart.

  ``` 
  User@gmail.com
  ```
  ``` 
  87654321
  ```

### It is very important to note:
- there is an ability to send the product to the shopping cart only with logged in or registered.

### New client:
Create a new customer by clicking on REGISTER.


### shopping basket:
You can dive into the basket, add an existing product and delete the product permanently.

### BackOffice:
Option [New Product], [Delete Product], [Edit Product].



## 🔨 Features
<a name="features"/>

- CRUD operations for listings
- Ability to extend, delete and create a new product on the part of the customer
- Ability to change price from large to small or reverse
- Product selection by the plus and sent to the shopping cart
- Option to click on a product and dive into the diddles
- Dark/Light theme
- Responsive design
- Client-side validations
- Client-side search
- Client-side pagination
- JWT authentication
  
  
## 📷 Screenshots
<a name="screenshots"/>

<img width="952" alt="image" src="https://i.ibb.co/RBbHY6R/img1.png">
<img width="951" alt="image" src="https://i.ibb.co/wQ0tvLJ/img2.png">
<img width="952" alt="image" src="https://i.ibb.co/7Kf2Dh0/img3.png">
<img width="950" alt="image" src="https://github.com/mohamadWatted/img4.git">
<img width="954" alt="image" src="https://github.com/mohamadWatted/img5.git">
<img width="950" alt="image" src="https://github.com/mohamadWatted/img6.git">



## ⚙️ Setup
<a name="setup"/>

3. **Run Backend:**
   1. Open the solution in Visual Studio or your favorite IDE.
   2. Build and run the solution.
   3. Now that the database is created with your connection string, we'll need to manually apply the migrations.
   4. Open a terminal in the *api* folder and run the following command:
    ```Powershell
    dotnet ef database update
    ```
   5. You are ready to run the solution.

  
### Frontend     
1. **Open a terminal in the *react-ui* folder and run the following commands:**
   ```Powershell
   npm i
   ```
   ```
   npm start
   ```

