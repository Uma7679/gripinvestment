# Investment Platform

A full-stack **investment management application** built with **Spring Boot (backend)** and **React + Tailwind (frontend)**.  
It provides authentication, product listing, portfolio tracking, and role-based access control.

---

##  Features
###  Authentication
- User **signup & login** with JWT authentication
- Passwords stored securely using BCrypt
- Role-based access: `USER` and `ADMIN`

###  Investment Management
- List available investment products
- View detailed product information
- Track user portfolio and transactions
- Role-based APIs (`USER` vs `ADMIN`)

### 🖥 Frontend
- Built with **React (Vite)** + **TailwindCSS**
- Authentication context with protected routes
- Integration with backend APIs via Axios

### Backend
- **Spring Boot 3 + Spring Security 6**
- JWT authentication with custom `JwtFilter`
- RESTful APIs for auth, products, investments, portfolio
- MySQL/PostgreSQL database support (via JPA/Hibernate)
- Role-based endpoint protection

---

##  Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- Axios
- React Router

**Backend**
- Spring Boot 3
- Spring Security (JWT)
- JPA/Hibernate
- MySQL/PostgreSQL

---

## Project Structure

### Frontend
