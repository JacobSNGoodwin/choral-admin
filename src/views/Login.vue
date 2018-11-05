<template>
  <section class="section">
    <div class="container">
        <h1>{{ title }}</h1>
    </div>
  </section>
</template>

<script>
import { performancesRef } from '@/firebase/firebaseInit';

export default {
  data() {
    return {
      title: 'The Admin Login Page!',
    };
  },
  created() {
    // test if we can get performances!
    performancesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });

    // However, we should not be able to write without auth
    performancesRef.add({
      title: 'A performance of epic proportions!',
    }).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  },
};
</script>
