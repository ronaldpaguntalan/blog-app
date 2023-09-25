import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private firestore: AngularFirestore) {}

  // Function to load featured posts data from Firestore
  // It retrieves posts with 'isFeatured' flag set to true, limiting the result to 4 posts.
  loadFeatured() {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  // Function to load the latest posts, ordered by 'createdAt' in descending order
  // It limits the result to 6 posts.
  loadLatest() {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('createdAt', 'desc').limit(6))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  // Function to load posts from a specific category based on the 'categoryId'
  loadCategoryPost(categoryId: string) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  // Function to load a single post by its ID
  loadOnePost(postId: string) {
    return this.firestore.doc(`posts/${postId}`).valueChanges();
  }

  // Function to load similar posts from the same category
  // It limits the result to 4 posts.
  loadSimilar(catId: string) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  // Function to count views for a post
  countViews(postId: any) {
    // Use Firestore's FieldValue.increment to increment the 'views' field by 1
    const viewCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };

    // Update the post with the incremented view count
    this.firestore.doc(`/posts/${postId}`).update(viewCount).then(() => {});
  }
}