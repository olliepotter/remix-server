import { WhereFilterOp } from "firebase-admin/firestore";
import { Bike, CreateMxRider, MxRider } from "~/types";
import { db } from "~/firebase.server";

type Collection = "bikes" | "riders";
//   | "affiliations"
//   | "bikes"
//   | "entries"
//   | "events"
//   | "licences"
//   | "riders"
//   | "users";

/**
 * Basically what we are saying here is that 'T' has to be a member of the Collection type.
 * If it is, then we return the 'keyof' the CollectionType<T> which is the type of the document.
 *
 * For example, if T is 'users', then we return the keys of the User document.
 * If T is 'riders', then we return the keys of the MxRider document.
 */

// This maps the collection name to the of queryable fields
type QueryType<T> = T extends Collection ? keyof CollectionType<T> : never;

// This maps the collection name to the type of the document
type CollectionType<T> = T extends "bikes"
  ? Bike
  : T extends "riders"
  ? MxRider
  : //   : T extends "users"
    //   ? User
    //   : T extends "licences"
    //   ? MxLicence
    //   : T extends "affiliations"
    //   ? Affiliation
    //   : T extends "entries"
    //   ? MxEntry | MxEntryV2
    //   : T extends "events"
    //   ? MxEvent
    never;

type CreateCollectionType<T> = T extends "riders" ? CreateMxRider : never;

const createError = (options: Record<string, unknown>) => {
  console.log(options);
  throw new Error("Not implemented");
};

export async function queryByCollection<T extends Collection>(
  col: T
): Promise<CollectionType<T>[]> {
  const snapshot = await db.collection(col).get();
  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    } as CollectionType<T>;
  });
  return docs;
}

// export const set = async (col: Collection, document: Object) => {
//   await db.collection(col).doc().set(document, { merge: true });
// };

// export const add = async (col: Collection, document: Object) => {
//   const colRef = collection(firestoreDB, col);
//   const docRef = await addDoc(colRef, document);
//   return docRef;
// };

export const del = async (col: Collection, id: string) => {
  const docRef = db.collection(col).doc(id);
  return await docRef.delete();
};

export async function findDocsByField<T extends Collection>(
  col: T,
  field: QueryType<T>,
  op: WhereFilterOp,
  value: string | boolean | number
): Promise<CollectionType<T>[]> {
  console.log("Calling firestore");
  const snapshot = await db.collection(col).where(field, op, value).get();
  const docs = [];
  for (const doc of snapshot.docs) {
    docs.push({ id: doc.id, ...doc.data() } as CollectionType<T>);
  }
  return docs;
}

export async function countDocsByField<T extends Collection>(
  col: T,
  field: QueryType<T>,
  op: WhereFilterOp,
  value: string
): Promise<number> {
  const snapshot = await db
    .collection(col)
    .where(field, op, value)
    .count()
    .get();
  return snapshot.data().count;
}

export async function findDocsByFields<T extends Collection>(
  col: T,
  conditions: {
    field: QueryType<T>;
    op: WhereFilterOp;
    value: string | boolean | number;
  }[]
): Promise<CollectionType<T>[]> {
  const collectionRef = db.collection(col);

  if (conditions.length < 1) {
    throw createError({
      statusCode: 500,
      message: `Bad query`,
    });
  }

  // We can use index because the first condition MUST be set because we've already
  // exited the loop if conditions.length > 1
  let query = collectionRef.where(
    conditions[0].field,
    conditions[0].op,
    conditions[0].value
  );
  for (let i = 1; i < conditions.length; i++) {
    query = query.where(
      conditions[i].field,
      conditions[i].op,
      conditions[i].value
    );
  }
  const snapshot = await query.get();

  const docs = [];
  for (const doc of snapshot.docs) {
    docs.push({ id: doc.id, ...doc.data() } as CollectionType<T>);
  }
  return docs;
}

export async function findDocById<T extends Collection>(
  col: T,
  id: string
): Promise<CollectionType<T>> {
  const ref = db.collection(col).doc(id);
  const docSnap = await ref.get();
  if (docSnap.exists) {
    const doc = { id: docSnap.id, ...docSnap.data() };
    return doc as CollectionType<T>;
  } else {
    // Capitalize the first letter of collection name
    const name = col.charAt(0).toUpperCase() + col.slice(1);

    // Remove the last character of name if it's an 's'
    const nameWithoutS = name.slice(-1) === "s" ? name.slice(0, -1) : name;

    throw createError({
      statusCode: 404,
      message: `${nameWithoutS} not found`,
    });
  }
}

export async function updateDocById<T extends Collection>(
  col: T,
  id: string,
  data: Partial<CollectionType<T>>
) {
  const docToUpdate = db.collection(col).doc(id);
  await docToUpdate.update(data);
  return docToUpdate.id;
}

export async function createDoc<T extends Collection>(
  col: T,
  data: Partial<CreateCollectionType<T>>
) {
  const colRef = db.collection(col);
  const docRef = await colRef.add(data);
  return docRef.id;
}

export async function deleteDocById<T extends Collection>(
  col: T,
  id: string
): Promise<void> {
  const ref = db.collection(col).doc(id);
  const docSnap = await ref.get();
  if (docSnap.exists) {
    await ref.delete();
  } else {
    throw createError({
      statusCode: 404,
      message: `Document not found`,
    });
  }
}
