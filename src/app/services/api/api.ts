import { Injectable } from '@angular/core';
import { setDoc, doc, Firestore, getDoc, query, collectionData, where, getDocs, addDoc, docData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private firestore: Firestore) { }
  
  docRef(path){
    return doc(this.firestore, path);
  }

  collectionRef(path){
    return collection(this.firestore, path);
  }

  setDocument(path, data){
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data);
  }

  addDocument(path, data){
    const dataRef = this.collectionRef(path);
    return addDoc(dataRef, data);
  }

  getDocById(path) {
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocs(path, queryFn?){
    let dataRef: any = this.collectionRef(path);
    if(queryFn){
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return getDocs(dataRef);
  }

  collectionDataQuery(path, queryFn?){
    let dataRef: any = this.collectionRef(path);
    if(queryFn){
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef, {idField: 'id'});
    return collection_data;
  }

  docDataQuery(path, id?, queryFn?) {
    let dataRef: any = this.docRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    let doc_data;
    if(id) doc_data = docData<any>(dataRef, {idField: id});
    else doc_data = docData<any>(dataRef);
    return doc_data;
  }

  whereQuery(field, condition, value){
    return where(field, condition, value);
  }
}
