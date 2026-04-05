# Apna Ghar  

**Rental house listings platform to easily browse and find available rental properties. Users can view detailed listings, upload images, leave reviews and ratings, and filter/search to find suitable homes efficiently.**

[Live Demo](https://apna-ghar-tvfe.onrender.com/listings)

---

## 🌟 Project Overview 

Apna Ghar is a full-stack rental house listings platform designed to help users **find available rental homes quickly and conveniently**. It provides access to:

- Detailed rental listings with images and descriptions  
- Reviews and ratings for each listing  
- Search and filter functionality to find suitable homes quickly  
- User authentication and authorization  
- Image uploads for property listings  

The goal of Apna Ghar is to **help users focus on finding homes, not searching aimlessly**, and explore rental listings efficiently.

---

## 🎯 Key Features 

- **User Authentication & Authorization:** Secure login/signup and role‑based access  
- **CRUD for Listings:** Users can create, edit, delete house listings  
- **Reviews & Ratings:** Users can leave feedback and rate listings  
- **Search & Filter:** Efficient search and filter to find houses fast  
- **Image Uploads:** Upload listing images via **Cloudinary**
  
---

## ⚡ Technology Stack
- Backend: Node.js + Express  
- Database: MongoDB  
- Frontend: EJS + Bootstrap (MVC pattern)  
- Authentication: Google OAuth 2.0  
- File Uploads: Cloudinary (media storage)  
- Other Tools: Mongoose, custom middleware

---

## 🔧 Environment Variables

Create a `.env` file in the project root and add the following (replace placeholders with your credentials):

```env
# Cloudinary for media storage
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret

# MongoDB Atlas
ATLASDB_URL=your_mongodb_atlas_url

# Session & JWT Secret
SECRET=your_secret_key

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
````

---
## 🛠 Installation & Setup

### Prerequisites

* Node.js (v16 or later) – [https://nodejs.org](https://nodejs.org)
* npm (comes with Node.js)
* MongoDB (Atlas or local) – [https://www.mongodb.com](https://www.mongodb.com)
* Git – [https://git-scm.com](https://git-scm.com)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/naruneswarreddy/apna-ghar.git
cd syllabite
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create `.env` as shown above).

4. Run the application locally:

```bash
node server.js
```

5. Open your browser and visit:

```
http://localhost:8080
```

---

## 📂 Project Structure

ApnaGhar follows the MVC (Model-View-Controller) design pattern for scalability and organized code management:

```
sapna-ghar/
├── config/                    # Configuration files
│   ├── passport.js            # Google OAuth & login strategies
│   └── session.js             # Session setup and options
│
├── controllers/               # Handles logic for routes
│   ├── listings.js
│   ├── reviews.js
│   ├── users.js  
│
├── models/                    # Mongoose schemas for MongoDB
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│
├── public/                    # Static assets
│   └── css/
│       ├── boilerplate.csss
│       ├── flash.css
│       ├── footer.css
│       ├── home.css
│       ├── listings.css
│       ├── login.css
│       ├── navbar.css
│       ├── rating.css
│       └── signup.css
│
├── routes/                     # Express routes
│   ├── listing.js
│   ├── review.js
│
├── utils/                      # Helper functions & error handling
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/                       # EJS templates
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── errors/
│   │   └── error.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   ├── deleteModal.ejs
│   │   ├── flash.ejs
│   │   ├── navbar.ejs
│   │   ├── pagination.ejs
│   │   └── reviewSection.ejs
│   ├── reviews/
│   │   └── index.ejs
│
├── .env                        # Environment variables
├── .gitignore                  # Ignored files/folders
├── app.js                       # Express app & middleware setup
├── cloudConfig.js               # Cloudinary config
├── middleware.js                # Custom middleware
├── package-lock.json
├── package.json
├── schema.js                    # Data validation schemas
└── server.js                    # Start server    

```

---

## 👤 Contributors

* **Aruneswar Reddy** – [@naruneswarreddy](https://github.com/naruneswarreddy)
