<!-- ABOUT THE PROJECT -->
## About The Project
This project has User and Admin account. User can sign up and sign in account. The project as JWT autherization. The project will display all the products added my user and admin.
Only one admin has all the authority to add/edit/delete Users and add/edit/delete products. Users can add/edit/delete only the products added by them. 

### Built With

* [Node JS](https://nodejs.org/en/)
* [Express JS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
Set up the environment. 
Node and Mongo should be installed
Check version of the Node using
   ```sh
   node -v .
   ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SoumyaSian/Iauro_Assignment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Refer/change the data in the \.env file 

  ```sh
  DB_CONNECT = mongodb+srv://user_24:vyJgYPbLcm8rO848@cluster0.gh8rd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  PORT = 3000
  ACCESS_TOKEN_SECRET = xwertyuihgfdsxcvbnmxdfghcnrt67yuikhgfdrt6t78uicfdsertyuikhgtredfgh
   
   ```
   
   
<!-- USAGE EXAMPLES -->
## Usage
### User SignUP
```js
POST /api/user/signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 113

{
  "username": "Trial User",
  "email": "trialUser@gmail.com",
  "password": "User@123",
  "role": "user"
}

```

Above <userRole> should 'user' while adding as a first. Change the role to admin in 'Users' DB later

```js
response.body : 
{
    "user": "603e1b8b1f21f33d0862cf38"
}
```

Add another user using the same api call which will add as a user
### User SignIn
```js
POST /api/user/signin HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 65

{
  "email": "trialUser@gmail.com",
  "password": "User@123"
}
```
response will have the Authorization token. Copy the token and save it
```js
{
  "results" :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU,
  "message":"Successfully Logged In"
 }
 ```

### User Deletion
```js
DELETE /api/deletUser/603dea3d2cfc471a30dd7116 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkY2FiMGM3YmVhYzI5NmMyMTk1NDMiLCJpYXQiOjE2MTQ2NjIzMzR9.Pl_BoDN1XYI3pK_cQUby4nQfHWcitPF9FPg7N8cx8Mk
Content-Type: application/json
Content-Length: 47

{
    "adminId":"603de64aad713220280a6acc" 
}
```

response 
```js
{
    "results": null,
    "message": "User Deleted Successully"
}
```

### User Updatation 
```js
PUT /api/updateUser/603df1debffff4136cd361a3/603de64aad713220280a6acc HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
Content-Type: application/json
Content-Length: 117

{
  "username": "updatedUser",
  "email": "user_updated@gmail.com",
  "password": "User@123",
  "role": "user"
}
```

response 
```js
{
    "results": {
        "_id": "603df1debffff4136cd361a3",
        "username": "updatedUser",
        "email": "user_updated@gmail.com",
        "password": "User@123",
        "role": "user",
        "date": "2021-03-02T08:05:50.739Z",
        "__v": 0
    },
    "message": "User Data Updated Successully"
}
```
### Add Products
```js
POST /api/product/addProduct HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
Content-Type: application/json
Content-Length: 110

{
	"name":"BLouse",
    "price":1000,
	"details":"black blouse",
	"addedBy": "603df1debffff4136cd361a3"
}
```
response 
```js
{
    "results": {
        "displayProduct": false,
        "_id": "603e2423b173dc0e3ccb1729",
        "name": "BLouse",
        "price": 1000,
        "details": "black blouse",
        "addedBy": "603df1debffff4136cd361a3",
        "__v": 0
    },
    "message": "Product is added successfully"
}
```
### Fetch All Products
```js
GET /api/product/allProducts HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
```

response 
```js
{
    "results": [
        {
            "isDisplay":false,
            "_id": "603df3504762bb431411320c",
            "name": "Study Chair 2",
            "price": 400,
            "details": "Table with 4 legs",
            "addedBy": "603df1debffff4136cd361a3",
            "__v": 0
        },
        {
            "isDisplay":false,
            "_id": "603e23c6b173dc0e3ccb1728",
            "name": "Saree",
            "price": 2000,
            "details": "silkSaree",
            "addedBy": "603df1debffff4136cd361a3",
            "__v": 0
        },
        {
            "isDisplay":false,
            "_id": "603e2423b173dc0e3ccb1729",
            "name": "BLouse",
            "price": 1000,
            "details": "black blouse",
            "addedBy": "603df1debffff4136cd361a3",
            "__v": 0
        }
    ],
    "message": "Succefully fetched all the product"
}
```
### Update Product
```js
PUT /api/product/update/603df32a4762bb431411320b HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
Content-Type: application/json
Content-Length: 135

{
"name": "Study Chair",
      "price": 400,
      "details": "Plastic chairs",
      "addedBy": "603df1debffff4136cd361a3"
}
```

### Delete Product
```js
DELETE /api/product/delete/603df32a4762bb431411320b HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
Content-Type: application/json
Content-Length: 48

{
     "addedBy": "603dea3d2cfc471a30dd7116"
}
```
Response
```js
{
    "results": null,
    "message": "User has deleted his product successfully"
}
```
### Display Product
```js
PUT /api/product/displayProducts/603de64aad713220280a6acc/603e2423b173dc0e3ccb1729 HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNkMTJmMjgzYjYyZTEyNmM0NDdmMWUiLCJpYXQiOjE2MTQ2NTA0NjR9.bA2c4B80TsArN2_LbbjK3mOMTpXJzLmaJw46scwZkQU
Content-Type: application/json
Content-Length: 181

{
            "isDisplay":true,
            "name": "Saree",
            "price": 2000,
            "details": "silkSaree",
            "addedBy": "603df1debffff4136cd361a3"
}
```

Above all the api in the project
