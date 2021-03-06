const { firestore } = require('../database/config');
const Patlet = require('../models/patlet');
const sendMail = require('../middleware/email');

async function getAllPatlets(req, res) {
  try {
    const patlets = await firestore.collection('patlets');
    const snapshot = await patlets.get();
    const patletsArray = [];
    if (snapshot.empty) {
      res.status(404).send('No patlet records found');
    } else {
      snapshot.forEach((doc) => {
        const patlet = new Patlet(
          parseInt(doc.id, 10),
          doc.data().image,
          doc.data().introduction,
          doc.data().graph_po,
          doc.data().graph_vs,
          doc.data().linked_patlets,
          doc.data().problem,
          doc.data().solution,
          doc.data().stars,
          doc.data().title,
          doc.data().link,
        );
        patletsArray.push(patlet);
      });
      patletsArray.sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));
      res.send(patletsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getPatlet(req, res) {
  const docRef = await firestore.collection('patlets').doc(req.params.id);
  docRef.get().then((doc) => {
    if (!doc.exists) {
      res.status(404).send('Patlet not found');
    } else {
      const patlet = new Patlet(
        parseInt(doc.id, 10),
        doc.data().image,
        doc.data().introduction,
        doc.data().graph_po,
        doc.data().graph_vs,
        doc.data().linked_patlets,
        doc.data().problem,
        doc.data().solution,
        doc.data().stars,
        doc.data().title,
        doc.data().link,
      );
      res.send(patlet);
    }
  }).catch((error) => {
    res.status(400).send(error.message);
  });
}

async function addReview(req) {
  const { rating, review } = req.body;

  const patletRef = firestore.collection('patlets').doc(req.params.id);
  firestore.collection('reviews').doc().set({
    rating,
    review,
    patletRef,
  });

  patletRef.get().then((doc) => {
    sendMail(`Rating Patlet: ${doc.data().title}`, `\nRating: ${rating}/5\n\n${review}`);
  });
}

module.exports = {
  getAllPatlets,
  getPatlet,
  addReview,
};
