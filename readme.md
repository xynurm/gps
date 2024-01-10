1. Setup .env
2. use mysql create gps table: 
CREATE TABLE gps (
id serial PRIMARY KEY,
device_id VARCHAR(255),
device_type VARCHAR(255),
timestamp timestamp,
location VARCHAR(255)
)

3. insert value gps
INSERT INTO gps (device_id, device_type, timestamp, location)
VALUES ('D-1567', 'Aircraft', '2022-08-31 10:05:00', 'L1'),
('D-1567', 'Aircraft', '2022-08-31 10:10:00', 'L1'),
('D-1567', 'Aircraft', '2022-08-31 10:15:00', 'L1'),
('D-1567', 'Aircraft', '2022-08-31 10:20:00', 'L1'),
('D-1567', 'Aircraft', '2022-08-31 10:25:00', 'L2'),
('D-1568', 'Personal', '2022-08-31 10:05:00', 'L3'),
('D-1568', 'Personal', '2022-08-31 10:10:00', 'L3'),
('D-1568', 'Personal', '2022-08-31 10:15:00', 'L3'),
('D-1568', 'Personal', '2022-08-31 10:20:00', 'L3'),
('D-1568', 'Personal', '2022-08-31 10:25:00', 'L3'),
('D-1569', 'Asset', '2022-08-31 10:15:00', 'L4'),
('D-1569', 'Asset', '2022-08-31 10:20:00', 'L4'),
('D-1569', 'Asset', '2022-08-31 10:25:00', 'L1'),
('D-1569', 'Asset', '2022-08-31 10:30:00', 'L1'),
('D-1569', 'Asset', '2022-08-31 10:35:00', 'L2'),
('D-1570', 'Personal', '2022-08-31 10:35:00', 'L5'),
('D-1571', 'Asset', '2022-08-31 10:35:00', 'L6');