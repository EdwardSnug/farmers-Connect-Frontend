# Farmers Connect
- Farmers Connect is a full-stack web application that connects **farmers** and **buyers**. Its built with **Flask(PYTHON)** for backend API and **React.js** for the frontend User interface.

## Project Structure
- farmers-connect/
- backend/                  # Flask backend
- app.py                # Flask app entry point
- farmers_inventory.db  # SQLite database (auto-created)
- logic/                # Core backend logic
- __init__.py
- extensions.py     # DB + Marshmallow setup
- models.py         # Database models (SQLAlchemy)
- routes.py         # API routes (CRUD for products)
- schemas.py        # Marshmallow schemas
- migrations           # Database migrations (Flask-Migrate)
- var                  # (optional storage)
- src/                      # React frontend
- api/                  # Firebase/Backend API setup
- assets/               # Images and static files
- components/           # Reusable React components
- pages/                # Page-level React components
- styles/               # CSS styling
- App.jsx               # Root React component
- main.jsx              # React entry point
- index.html
- public/                   # Public frontend assets
- .gitignore
- README.md                 # Project documentation
## Getting Started
### Clone the repository
- Fork the repository to your local workspace.
- bash: git clone https://github.com/your-username/farmers-connect.git
- cd farmers-connect
- You will have two main directories: `backend/` for Flask and `src/` for React.

## Backend Setup(Flask API)
### Requirements
- Python 3.8+
- virtualenvironment activated, `pipenv` or `venv`
- SQLite and other flask dependencies

### Installation
```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate    # Windows

pip install -r requirements.txt
```
### Run the server
```bash
flask run
```
The backend will run on:
```
http://127.0.0.1:5000
```

### API Endpoints

| Method | Endpoint              | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/products`      | Get all products        |
| POST   | `/api/products`      | Add a new product       |
| PUT    | `/api/products/<id>` | Update a product        |
| DELETE | `/api/products/<id>` | Delete a product        |

## Frontend Setup (React)

### Requirements
- Node.js 16+
- npm or yarn

### Installation
```bash
cd src
npm install
```

### Run the frontend
```bash
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```
## Connecting Frontend & Backend
- Frontend fetches products from Flask API:
```js
useEffect(() => {
  fetch("http://127.0.0.1:5000/api/products")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);
```
- CORS is already enabled in Flask.

## Features

- Farmers: Add, edit, and manage products.
- Buyers: Browse, search, filter, and add items to cart.
- Auth: Login & Register (Firebase / backend).
- Cart: Add/remove products with live count.
- Categories: Organize by category and location.

## Future Improvements
- Deployment with Vercel & Render
- Role-based dashboards
- Image uploads with Cloudinary/Firebase Storage
- Integrating payment systems.

## License
This project is protected by MIT license thereby all rules, regulations and copyright laws under this ACT to be followed.

## Author
Built by **Edward Karogo** in collaboration with **Malcolm Kagolobya**