/**
 * Admin Provisioning Script
 * Usage: node scripts/createAdmin.js <email> <password> "Full Name"
 *
 * Prerequisites:
 *   - Set GOOGLE_APPLICATION_CREDENTIALS env var to your Firebase service account JSON path.
 *   - Run: npm install firebase-admin (or ensure it's available).
 */

const admin = require('firebase-admin');

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node scripts/createAdmin.js <email> <password> "Full Name"');
  process.exit(1);
}

const [email, password, fullName] = args;

// Initialize Admin SDK using the service account specified by GOOGLE_APPLICATION_CREDENTIALS
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const auth = admin.auth();
const db = admin.firestore();

(async () => {
  try {
    // Create the Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });
    console.log('Created Auth user:', userRecord.uid);

    // Set admin custom claim
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });
    console.log('Set admin custom claim.');

    // Create Firestore profile
    const userRef = db.collection('users').doc(userRecord.uid);
    await userRef.set({
      uid: userRecord.uid,
      name: fullName,
      email: email,
      role: 'admin',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Created Firestore profile with role: admin');
    console.log('Admin user provisioned successfully:', userRecord.uid);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
})();
