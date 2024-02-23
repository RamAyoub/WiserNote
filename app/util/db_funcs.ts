import { db } from "./db_server";

export async function CreateNoteDB({ content, createBy }: any) {
  const note = await db.note.create({
    data: {
      content: content as string,
      createBy: createBy as string,
      wiser_content: "",
    },
  });

  return null;
}

export async function deleteNote(noteid:any) {
  const deleteNote = await db.note.delete({
    where: {
      id: parseInt(noteid)
    }
  })
  return deleteNote
}

export async function replaceWiseNote(noteid: any, wisenote: any) {
  const updateNote = await db.note.update({
    where: {
      id: parseInt(noteid),
    },
    data: {
      content: wisenote as string,
    },
  });
  return updateNote;
}

export async function getNotebyID(noteid: any) {
  const notetext = await db.note.findUnique({
    where: {
      id: parseInt(noteid),
    },
  });
  return notetext?.content;
}
export async function loadNotesDB({ createBy }: any) {
  const notes = await db.note.findMany({
    where: {
      createBy: createBy as string,
    },
  });
  return notes;
}
