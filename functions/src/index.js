const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize the Admin SDK
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

/**
 * Callable function to assign a role (admin or recruiter) to a user.
 * Only callers with custom claim "admin" can invoke.
 */
exports.assignRole = functions.https.onCall(async (data, context) => {
  // Must be authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Request not authenticated.');
  }

  // Verify caller is admin via custom claim
  const callerClaims = context.auth.token;
  if (!callerClaims.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can assign roles.');
  }

  const { uid, role } = data;

  // Validate parameters
  if (!uid || typeof uid !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'A valid user UID is required.');
  }
  if (!role || !['admin', 'recruiter'].includes(role)) {
    throw new functions.https.HttpsError('invalid-argument', 'Role must be "admin" or "recruiter".');
  }

  // Set custom claim on target user
  await auth.setCustomUserClaims(uid, { [role]: true });

  // Synchronize Firestore profile with the trusted role
  const userRef = db.collection('users').doc(uid);
  await userRef.update({
    role,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, uid, role };
});
