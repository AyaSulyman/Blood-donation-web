import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/auth.model';
import Donor from '../models/Donor';
import Center from '../models/Center';
import BloodDonation from '../models/BloodDonation';

async function seed() {

  const uri = process.env.MONGO_URI ?? 'mongodb+srv://hamzamerie60_db_user:9OBc0EPqwh2i2AZx@cluster0.5u6bgxg.mongodb.net/bloodDonation?appName=Cluster0'

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('Connected to MongoDB for seeding');

  // Wipe existing data so re-running this script doesn't duplicate records
  await Promise.all([
    User.deleteMany({}),
    Donor.deleteMany({}),
    Center.deleteMany({}),
    BloodDonation.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // 1. Users (role: 'donor')
  // NOTE: `bloodType` is now required on User too (the merged auth.model.ts
  // schema requires it), so every user below carries the same blood type as
  // their linked Donor record further down — keep these in sync if you add more.
  const users = await User.insertMany([
    {
      name: 'Rami Nasser',
      username: 'rami.nasser',
      email: 'rami.nasser@example.com',
      phone: '+96170000001',
      address: 'Beirut',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'O+',
    },
    {
      name: 'Ahmad Jalal',
      username: 'ahmad.jalal',
      email: 'ahmad.jalal@example.com',
      phone: '+96170023572',
      address: 'Beirut',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'O+',
    },
    {
      name: 'Jamila Rabei',
      username: 'jamila.rabei',
      email: 'jamila.rabei@example.com',
      phone: '+96170002356',
      address: 'Bekaa',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'O+',
    },
    {
      name: 'Layla Fares',
      username: 'layla.fares',
      email: 'layla.fares@example.com',
      phone: '+96170000002',
      address: 'Sidon',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'A+',
    },
    {
      name: 'Karim Saade',
      username: 'karim.saade',
      email: 'karim.saade@example.com',
      phone: '+96170000003',
      address: 'Tyre',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'AB-',
    },
    {
      name: 'Amani Jomaa',
      username: 'amani.jomaa',
      email: 'amani.jomaa@example.com',
      phone: '+96170004563',
      address: 'Bekaa',
      password: 'placeholder-hash',
      role: 'donor',
      bloodType: 'B+',
    },
  ]);
  console.log(`Inserted ${users.length} users`);

  // 2. Centers
  const centers = await Center.insertMany([
    {
      name: 'Beirut Central Blood Bank',
      address: 'Hamra, Beirut',
      phoneNb: '+9611000001',
      email: 'contact@beirutbloodbank.org',
    },
    {
      name: 'Saida Blood Bank',
      address: 'Saida',
      phoneNb: '+9610923455',
      email: 'contact@saidabloodbank.org',
    },
    {
      name: 'Bekaa Central Blood Bank',
      address: 'Bekaa',
      phoneNb: '+96108512345',
      email: 'contact@bekaa_bloodbank.org',
    },
    {
      name: 'Tripoli Blood Center',
      address: 'Al Mina, Tripoli',
      phoneNb: '+9616123456',
      email: 'contact@tripolibloodcenter.org',
    },
    {
      name: 'Byblos Regional Blood Bank',
      address: 'Byblos',
      phoneNb: '+9619345678',
      email: 'contact@byblosbloodbank.org',
    },
    {
      name: 'Nabatieh Blood Donation Center',
      address: 'Nabatieh',
      phoneNb: '+9617234567',
      email: 'contact@nabatiehbloodcenter.org',
    },
    {
      name: 'Zahle Central Blood Bank',
      address: 'Zahle, Bekaa',
      phoneNb: '+9618765432',
      email: 'contact@zahlebloodbank.org',
    },
    {
      name: 'Tyre Coastal Blood Bank',
      address: 'Tyre',
      phoneNb: '+9617456123',
      email: 'contact@tyrebloodbank.org',
    },
  ]);
  console.log(`Inserted ${centers.length} centers`);

  // 3. Donors (linked to users)
  const donors = await Donor.insertMany([
    {
      userId: users[0]._id,
      bloodType: 'O+',
      availability: { date: new Date('2026-08-10'), time: '14:00' },
    },
    {
      userId: users[1]._id,
      bloodType: 'O+',
      availability: { date: new Date('2026-08-12'), time: '10:30' },
    },
    {
      userId: users[2]._id,
      bloodType: 'O+',
      availability: { date: new Date('2026-08-15'), time: '16:00' },
    },
    {
      userId: users[3]._id,
      bloodType: 'A+',
      availability: { date: new Date('2026-08-15'), time: '16:00' },
    },
    {
      userId: users[4]._id,
      bloodType: 'AB-',
      availability: { date: new Date('2026-08-15'), time: '16:00' },
    },
    {
      userId: users[5]._id,
      bloodType: 'B+',
      availability: { date: new Date('2026-08-15'), time: '16:00' },
    },
  ]);
  console.log(`Inserted ${donors.length} donors`);

  // 4. Blood donations (so "last donated" isn't empty)
  const donations = await BloodDonation.insertMany([
    {
      donorId: donors[0]._id,
      centerId: centers[0]._id,
      createdAt: new Date('2026-05-04'), // ~3 months ago from Aug 4, 2026
    },
    {
      donorId: donors[1]._id,
      centerId: centers[0]._id,
      createdAt: new Date('2026-03-04'), // ~5 months ago
    },
    {
      donorId: donors[2]._id,
      centerId: centers[0]._id,
      createdAt: new Date('2026-07-04'), // ~1 month ago
    },
  ]);
  console.log(`Inserted ${donations.length} donations`);

  console.log('Seed complete');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});