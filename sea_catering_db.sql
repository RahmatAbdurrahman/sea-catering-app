CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
   	full_name VARCHAR(255) NOT NULL, 
    phone_number VARCHAR(50) NOT NULL, 
    plan_name VARCHAR(100) NOT NULL, 
    total_price DECIMAL NOT NULL,
    meal_types JSONB NOT NULL, 
    delivery_days JSONB NOT NULL, 
    allergies TEXT,
    status VARCHAR(50) DEFAULT 'acitve',
    paused_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    review_message TEXT NOT NULL,
    rating INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



