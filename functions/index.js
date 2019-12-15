const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin: true});

const firestore = admin.firestore();

// getting users information (if needed!)
exports.listUsers = functions.https.onRequest(async (req, res) => {

  // eslint-disable-next-line no-empty-function
  cors(req, res, async () => {
    try {
      let users = [];
      const list = async nextPageToken => {
      await admin.auth().listUsers(1000, nextPageToken)
      .then(async result => {
        if (result.pageToken) {
          await list(result.pageToken);
        }
        return result.users.forEach(userRecord => {
          const user = userRecord;
          users.push(user);
          // console.log(userRecord);
        });
      })
    }
    await list();
    res.status(200).send({
      success: 'SUCCESS',
      users
    })
    } catch (error) {
      res.status(500).send({error});
    }
  });
});

exports.onUserStatusChanged = functions.database
  .ref('/status/{userId}') // Reference to the Firebase RealTime database key
  .onUpdate(event => {
    const usersRef = firestore.collection('profiles'); // Create a reference to the Firestore Collection
    return event.data.ref.once('value')
    .then(statusSnapshot => snapShot.val()) // Get the latest value from the Firebase Realtime database
    .then(status => {
      console.log(status)
      // check if the value is 'offline'
      if (status === 'offline') {
        // Set the Firestore's document's online value to false
        usersRef
          .doc(event.params.userId)
          .set({
            online: false
          }, { merge: true });
      }
      return 0;
    })
  });

exports.createNewUser = functions.https.onRequest((req, res) => {
  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    phoneNumber: req.body.phone,
    password: req.body.password,
    displayName: req.body.name,
    photoURL: req.body.photo,
    disabled: false
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log('Successfully created new user:', userRecord.uid);
      let registeredUser = userRecord;
      return registeredUser;
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.status(500).send({error});
    });
})