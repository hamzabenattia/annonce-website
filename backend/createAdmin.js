const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./Models/userSchema');

// Load environment variables
dotenv.config();

const createAdmin = async (email = 'admin@admin.com', password = 'admin123', firstname = 'Admin', lastname = 'User') => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      console.log(`Email Confirmed: ${existingAdmin.emailConfirmed}`);
      console.log(`Is Admin: ${existingAdmin.isAdmin}`);
      console.log(`Is Active: ${existingAdmin.isActive}`);
      if (!existingAdmin.emailConfirmed) {
        console.log('⚠️  Email not confirmed. Updating admin account...');
        existingAdmin.emailConfirmed = true;
        existingAdmin.isAdmin = true;
        existingAdmin.isActive = true;
        await existingAdmin.save();
        console.log('✅ Admin account updated successfully!');
      }
      process.exit(0);
    }

    // Create admin user (let the pre-save middleware hash the password)
    const adminUser = new User({
      firstname,
      lastname,
      email,
      password, // Plain password - will be hashed by pre-save middleware
      phonenum: '0000000000',
      isAdmin: true,
      emailConfirmed: true, // Admin doesn't need email confirmation
      isActive: true
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Check if this script is run directly
if (require.main === module) {
  // Get command line arguments
  const args = process.argv.slice(2);
  let email = 'admin@admin.com';
  let password = 'admin123';
  let firstname = 'Admin';
  let lastname = 'User';

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--email':
      case '-e':
        email = args[i + 1];
        i++;
        break;
      case '--password':
      case '-p':
        password = args[i + 1];
        i++;
        break;
      case '--firstname':
      case '-f':
        firstname = args[i + 1];
        i++;
        break;
      case '--lastname':
      case '-l':
        lastname = args[i + 1];
        i++;
        break;
      case '--help':
      case '-h':
        console.log('Usage: node createAdmin.js [options]');
        console.log('');
        console.log('Options:');
        console.log('  -e, --email <email>        Admin email (default: admin@admin.com)');
        console.log('  -p, --password <password>  Admin password (default: admin123)');
        console.log('  -f, --firstname <name>     Admin first name (default: Admin)');
        console.log('  -l, --lastname <name>      Admin last name (default: User)');
        console.log('  -h, --help                 Show this help message');
        console.log('');
        console.log('Examples:');
        console.log('  node createAdmin.js');
        console.log('  node createAdmin.js --email myadmin@example.com --password mypassword');
        process.exit(0);
    }
  }

  createAdmin(email, password, firstname, lastname);
}

module.exports = createAdmin;
