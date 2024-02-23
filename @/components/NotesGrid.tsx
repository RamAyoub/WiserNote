import { Form } from "@remix-run/react";

interface Note {
  id: number;
  createBy: string;
  content: string;
  wiser_content: string;
  createdAt: Date;
}

export default function GridNotes(notesfetch: any) {

  return (
    <div className="w-full h-screen ">
      <div className="flex flex-wrap justify-start p-4">
        <ul>
          {notesfetch.map(
            (
              note: Note //I cannot pass the notes to a react component as a prop
            ) => (
              <div key={note.id} className="w-1/3 p-2">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="text-lg font-semibold mb-7">{note.content}</p>
                    <Form method="POST">
                  <div className="flex justify-end">
                      <input type="hidden" name="notewiseid" value={note.id} />
                      <button
                        name="_action"
                        value="delete"
                        className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md mr-2"
                      >
                        x
                      </button>
                      <button
                        name="_action"
                        value="wiseit"
                        className="bg-[#0074B7] hover:bg-[#003B73] shadow-md text-white px-4 py-2 rounded-md"
                      >
                        Wise
                      </button>
                  </div>
                    </Form>
                </div>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
