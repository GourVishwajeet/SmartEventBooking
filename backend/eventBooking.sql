-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATETIME NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  img VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  mobile VARCHAR(20),
  quantity INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_date DATETIME NOT NULL,
  status ENUM('confirmed','cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Index for faster lookups
CREATE INDEX idx_event_id ON bookings(event_id);
