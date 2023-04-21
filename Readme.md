
# Ecommerce Application

Welcome to our ecommerce application! This application is designed to allow customers to browse, purchase, and manage their orders for a variety of products. In this document, you will find information about how to use the application, how to set it up for development, and how to contribute to its ongoing development.

## Getting Started

To get started using the ecommerce application, you will need to have the following:

A modern web browser (e.g., Chrome, Firefox, Safari)
An internet connection
To access the application, simply navigate to our website at https://www.example.com. Once there, you can browse products, add items to your cart, and check out using a secure payment system.

## Usage

The ecommerce application is designed to be intuitive and easy to use. Here are some key features:

Browse products by category, price, or popularity
Add items to your cart and adjust quantities as needed
Check out securely using a variety of payment methods
View your order history and manage your account settings
If you encounter any issues while using the application, please don't hesitate to contact our support team at support@example.com.

## Installation

To install and run the ecommerce application locally from Github using Node.js, follow these steps:

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/your-username/ecommerce-application.git
```
Replace your-username with your actual Github username.

2. Install Node.js and npm (the Node.js package manager) on your machine if you haven't already. You can download them from the official Node.js website: https://nodejs.org/en/download/

3. Navigate to the root directory of the cloned repository:

```bash
  cd ecommerce-application
```

4. Install the required dependencies:

```bash
npm install
```

5. Install nodemon globally

```bash
npm i -g nodemon
```

6. Create a .env file in the root directory of the project with the following environment variables:

```bash
PORT = 3000

API_VERSION = /api/v1

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'ecommerce'

cloudinary_name = ""
cloudinary_api_key = ""
cloudinary_secret = ""
```
