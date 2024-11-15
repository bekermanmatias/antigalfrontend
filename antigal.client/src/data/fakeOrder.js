const fakeOrders = [
    {
      "id": 101,
      "userId": 1,
      "orderNumber": "ORD-20231001-001",
      "date": "2023-10-01",
      "status": "Shipped",
      "total": 149.99,
      "items": [
        {
          "productId": 201,
          "productName": "Proteína en polvo",
          "quantity": 1,
          "price": 79.99,
          "image":"/images/product/default.png"  },
        {
          "productId": 202,
          "productName": "Barra de proteínas",
          "quantity": 1,
          "price": 29.99,
          "image":"/images/product/default.png"        },
        {
          "productId": 203,
          "productName": "Suplemento de Omega-3",
          "quantity": 2,
          "price": 10.00,
          "image":"/images/product/default.png"}
      ]
    },
    {
      "id": 102,
      "userId": 1,
      "orderNumber": "ORD-20231003-002",
      "date": "2023-10-03",
      "status": "Delivered",
      "total": 59.99,
      "items": [
        {
          "productId": 204,
          "productName": "Té verde",
          "quantity": 1,
          "price": 19.99,
          "image":"/images/product/default.png" },
        {
          "productId": 205,
          "productName": "Snack de frutas deshidratadas",
          "quantity": 2,
          "price": 20.00,
          "image":"/images/product/default.png"     }
      ]
    },
    {
      "id": 103,
      "userId": 2,
      "orderNumber": "ORD-20231005-003",
      "date": "2023-10-05",
      "status": "Processing",
      "total": 89.99,
      "items": [
        {
          "productId": 206,
          "productName": "Batido de proteínas",
          "quantity": 1,
          "price": 89.99,
          "image":"/images/product/default.png"
        }
      ]
    },
    {
      "id": 104,
      "userId": 1,
      "orderNumber": "ORD-20231008-004",
      "date": "2023-10-08",
      "status": "Pending",
      "total": 199.99,
      "items": [
        {
          "productId": 207,
          "productName": "Suplemento de vitamina D",
          "quantity": 1,
          "price": 199.99,
          "image":"/images/product/default.png"   }
      ]
    }
  ];
  
  export default fakeOrders;