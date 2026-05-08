-- Password: Admin@123456 (bcrypt hash — change in production!)
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
  ('admin@artisania-albaycin.com',
   '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGTG9rsW2JY./e4PZWQM6VWbN.m',
   'Admin', 'Artisania', 'admin')
ON CONFLICT (email) DO NOTHING;
