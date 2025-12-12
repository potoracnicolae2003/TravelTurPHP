# Run project with PHP (built-in server)

## Prerequisites
- PHP 7.4+ installed with PDO MySQL extension
- MySQL server running with database `travel_auth`
- Database credentials configured in `config.php`:
  - Host: `localhost`
  - User: `root`
  - Password: `rout`

## Quick Start

1. **Create the database** (first time only):
   - Import `database.sql` to MySQL:
   ```sql
   mysql -u root -p < database.sql
   ```
   Or use phpMyAdmin to import the SQL file.

2. **Start PHP built-in server**:
   ```powershell
   cd D:\TravelTur
   php -S localhost:8000 -t .
   ```

3. **Open in browser**:
   - Homepage: http://localhost:8000/index.php
   - Login: http://localhost:8000/login.php
   - Admin panel: http://localhost:8000/admin-consultatii.php

## Architecture

### Backend (PHP APIs)
- `config.php` - Database connection and initialization
- `api/login.php` - User login endpoint
- `api/register.php` - User registration endpoint
- `api/logout.php` - User logout endpoint
- `api/auth-status.php` - Check authentication status
- `api/consultatie.php` - Save consultation request
- `api/hoteluri.php` - Get hotels from database
- `api/admin-consultatii.php` - Admin: Get all consultation requests

### Frontend (PHP Pages)
- `index.php` - Homepage
- `login.php` - Login page
- `oferte.php` - Offers page (protected, requires login)
- `admin-consultatii.php` - Admin panel
- `termeni-si-conditii.php` - Terms & conditions

## Database Configuration

Edit `config.php` to change database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'rout');
define('DB_NAME', 'travel_auth');
```

## Features
✅ User registration & login with password hashing
✅ Session management
✅ Consultation requests saved to database
✅ Hotel management from MySQL
✅ Admin panel to view consultation requests
✅ RESTful API endpoints

## Troubleshooting

**Q: "Connection failed"**
- Ensure MySQL is running
- Verify database `travel_auth` exists
- Check credentials in `config.php`

**Q: "Table doesn't exist"**
- Run `database.sql` to create tables
- Tables are auto-created on first request via `initDatabase()` function

**Q: API endpoints return empty**
- Check MySQL connection
- Verify database has data
- Check browser console for errors

## Notes
- Sessions persist across browser restarts (PHP sessions)
- No Node.js required - pure PHP stack
- Hotel data is automatically initialized on first page load

