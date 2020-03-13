## Kanban
### by Darindra R

# GET /tasks
### Get All Tasks
## Endpoint
> https://kanban-darindra.herokuapp.com/tasks

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
[
    {
        "id": 1,
        "title": "Vue component",
        "description": "mecah fitur jadi comp",
        "category": "done",
        "UserId": 1,
        "createdAt": "2020-03-12T14:36:23.789Z",
        "updatedAt": "2020-03-12T14:36:23.789Z"
    }
]
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# POST /tasks
### Create A Tasks List
## Endpoint
> https://kanban-darindra.herokuapp.com/tasks



## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN 
```

## Request body:
```
{
    title: String
    description: String,
    category: String,
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 201
```
{
    "Message": "Tasks Has Been Created.",
    "Data": {
        "title": "Vue component",
        "description": "mecah fitur jadi comp",
        "category": "done",
        "UserId": 1,
   }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# GET /tasks/:id
### Get Tasks By ID
## Endpoint
> https://kanban-darindra.herokuapp.com/tasks/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
{ 
    "id": 1,
    "title": "Vue component",
    "description": "mecah fitur jadi comp",
    "category": "done",
    "UserId": 1,
    "createdAt": "2020-03-12T14:36:23.789Z",
    "updatedAt": "2020-03-12T14:36:23.789Z"
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# PUT /tasks/:id
### Update Tasks By ID
## Endpoint
> https://kanban-darindra.herokuapp.com/tasks/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request body:
```
{
    title: String
    description: String,
    category: String,
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 200
```
{
    "Message": "Tasks Has Been Updated",
    "Data": {
        "title": "Vue component",
        "description": "mecah fitur jadi comp",
        "category": "done",
        "UserId": 1,
    }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# DELETE /tasks/:id
### Delete Tasks From Todo List
## Endpoint
> https://kanban-darindra.herokuapp.com/tasks/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Succes Response :
Status 200
```
{
    "Message": "Tasks Has Been Deleted",
    "Data": {
        "id": 1,
        "title": "Vue component",
        "description": "mecah fitur jadi comp",
        "category": "done",
        "UserId": 1,
        "createdAt": "2020-03-12T14:36:23.789Z",
        "updatedAt": "2020-03-12T14:36:23.789Z"
    }
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /user/register
### Register User
## Endpoint
> https://kanban-darindra.herokuapp.com/user/register

## Request body:
```
{
    fullname: string,
    email: string,
    password: string
}
```
All Request Body is **REQUIRED**

## Success Response :
Status 201
```
{
    token: "YOUR TOKEN",
    fullname: "YOUR NAME"
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /user/login
### Login User
## Endpoint
> https://kanban-darindra.herokuapp.com/user/login
## Request body:
```
{
    email: string,
    password: string
}
```
All Request Body is **REQUIRED**

## Success Response
Status 200
```
{
   token: "YOUR TOKEN",
   fullname: "YOUR NAME"
}
```
## Error Response
Status 400
```
{
     "message": "Bad Request"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
