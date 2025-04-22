/*
  # Add booking constraints and indexes

  1. Changes
    - Add unique constraint for facility bookings
    - Add index for faster booking lookups
    - Add check constraint for valid dates
*/

-- Add unique constraint to prevent double bookings
ALTER TABLE bookings
ADD CONSTRAINT unique_facility_booking UNIQUE (facility, date, time);

-- Add index for faster booking queries
CREATE INDEX idx_bookings_user_date ON bookings (user_id, date);

-- Add check constraint for valid dates
ALTER TABLE bookings
ADD CONSTRAINT valid_booking_date CHECK (date >= CURRENT_DATE);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();