# Simplified Product Display Web Application

## Overview
This is a full-stack web application for displaying product listings and details. It allows users to browse available products, view product details, and navigate between different pages.

## Features
- Landing page with a button to explore product listings.
- Product list page displaying available products with basic information.
- Product details page showing detailed information about a specific product.

## Technologies Used
- Frontend: React.js, React Router, Bootstrap
- Backend: Node.js, Express.js, MongoDB
- Other: Axios for API requests

## Setup Instructions

### Frontend Setup:

1. Clone the repository from GitHub:
```sh
git clone https://github.com/your-username/simplified-product-app.git
```
2. Navigate to the Frontend directory:
```sh
cd simplified-product-app/frontend
```

3. Install dependencies:
```sh
npm install
```
4. Start the development server:
```sh
npm start
```

5. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

### Backend Setup:
1. Navigate to the Backend Directory
```sh
cd ../backend
```
2. Install Dependencies:
```sh
npm install
```
3. Start the Backend Server:
 ```sh
   npm start
 ```
4. Access the API Endpoints:
The backend server will be running on [https://localhost:5000](http://localhost:5000). Use this base URL to access the API endpoints.

## API Endpoints
- **GET /api/productsList**: Fetches all available products list.
- **GET /api/productsList/:id**: Fetches details of a specific product by ID.

## Design Decisions
- **Frontend**: Designed a simple and intuitive user interface using React.js and Bootstrap to enhance user experience.
- **Backend**: Implemented a RESTful API using Node.js and Express.js to handle data retrieval and manipulation.
- **Database**: Utilized MongoDB to store product data, providing flexibility and scalability for future enhancements.
- **Challenges**: Faced challenges in handling asynchronous operations and managing state in React components. Overcame them by using useEffect hook for fetching data and managing state effectively.

### Screenshot
- **Frontend**:
![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/frontend-1.png)

![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/frontend-2.png)

![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/frontend-3.png)

![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/frontend-4.png)

- **Backend**:
![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/backend-1.png)

![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/backend-2.png)

- **database**:

![frontend_screenshot.png](https://github.com/prathmesh12-coder/simplified-product-display/blob/main/images/database.png)


## Future Improvements
- Implement user authentication and authorization for secure access.
- Add functionality for users to add products to their cart and make purchases.
- Enhance the design with more interactive features and animations.
- implement barcodeScanner to scan the products to directly add to the cart.
- below is the reference code for using quagga API, you can also find it in the barcodeScanner.js in components section. 
  ```sh
 
    useEffect(() => {
        if (!videoRef.current) return;

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoRef.current,
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment", // Use the device's rear camera
                },
            },
            decoder: {
                readers: ["ean_reader"], // Specify the type of barcode to scan (EAN)
            },
        }, function (err) {
            if (err) {
                console.error("Error initializing Quagga:", err);
                return;
            }
            console.log("Quagga initialized successfully");
            Quagga.start();
        });

        Quagga.onDetected(function (result) {
            const code = result.codeResult.code;
            alert(`Scanned Barcode: ${code}`);
            Quagga.stop();
        });

        return () => {
            Quagga.stop();
        };
    }, [videoRef]); // Added videoRef to the dependency array

    return (
        <div>
            <h1>This is Barcode Scanner!!</h1>
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
        </div>
    );


  ```
  -Github repo for reference:
  
  Barcode Scanner (not supported for Desktop)
  ```sh
  https://github.com/tony-xlh/react-barcode-qrcode-scanner?tab=readme-ov-file
  ```
  QR Scanner
  ```sh
  https://github.com/chung-leong/react-barcode-detection?tab=readme-ov-file

  ```
  

