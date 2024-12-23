/*
  # Add initial poll record
  
  1. New Data
    - Creates initial poll record for December 24, 2024
  
  2. Changes
    - Inserts a poll record with ID '1' that matches the hardcoded ID in the application
*/

INSERT INTO polls (id, title, deadline)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Class Attendance Poll for December 24, 2024',
  '2024-12-24 23:59:59+00'
);