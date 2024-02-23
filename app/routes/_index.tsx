import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { generateWiseNote } from "~/util/ai_funcs";
import {
  CreateNoteDB,
  deleteNote,
  getNotebyID,
  loadNotesDB,
  replaceWiseNote,
} from "~/util/db_funcs";
import { destroySession, getSession } from "~/util/session_server";
import NavBar from "@/components/navbar";
import CreateNoteBox from "@/components/CreateNoteBox";
import GridNotes from "@/components/NotesGrid";
import HeadingText from "@/components/heading";

interface Note {
  id: number;
  createBy: string;
  content: string;
  wiser_content: string;
  createdAt: Date;
}

export const meta: MetaFunction = () => {
  return [
    { title: "WiserNote" },
    { name: "description", content: "Welcome to WiserNote!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");

  if (!cookie) {
    let stat = "nouser";
    return stat;
  }
  //console.log(session.data);
  const session = await getSession(cookie);
  const notesfetch = await loadNotesDB({ createBy: session.data.user.id });
  return { session: session.data, notesfetch };
}

export async function action({ request }: LoaderFunctionArgs) {
  let { _action, noteContent, notewiseid } = Object.fromEntries(
    await request.formData()
  );

  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);

  switch (_action) {
    case "logout":
      //console.log("Logging out");
      const setCookieHeader = await destroySession(session);
      return redirect("/", {
        headers: {
          "Set-Cookie": setCookieHeader,
        },
      });

    case "createNote":
      let note = { createBy: session.data.user.id, content: noteContent }; //noteContent only works in case of createnote buttom form
      const cr = await CreateNoteDB(note);
      return redirect("/");

    case "wiseit":
      //console.log(notewiseid);
      let notetext = await getNotebyID(notewiseid);
      //console.log(notetext)
      let wisenote = await generateWiseNote(notetext as string);
      console.log(wisenote);
      let replace = await replaceWiseNote(notewiseid, wisenote as string);

      if (replace) {
        return redirect("/");
      }

      return null;

    case "delete":
      let del = await deleteNote(notewiseid);
      if (del) {
        return redirect("/");
      }
      return null;
  }
}

export default function Index() {
  // const { session, notesfetch } = useLoaderData<typeof loader>();
  let data = useLoaderData<typeof loader>();
  console.log(data);

  if (data === "nouser") {
    return (
      <div>
        <NavBar />
        <div style={{textAlign:"center"}}>
          <h1 className="mb-4 mt-14 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Create more organized notes <br/> with{" "}
            <span className="text-blue-600 dark:text-blue-500">WiserNote</span>{" "}
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Press 'Get Started' at the top right corner to start your organized
            journey.
          </p>
        </div>
      </div>
    );
  }

  const { session, notesfetch } = data; //something is wrong with the types.

  return (
    <>
      <div>
        <NavBar currentUser={session.user} />
        <div className="bg-white h-screen flex flex-col justify-center items-center">
          <CreateNoteBox />

          <div className="w-full h-screen ">
            <div className="flex flex-wrap justify-start p-4">
              {notesfetch.map(
                (
                  note: Note //I cannot pass the notes to a react component as a prop
                ) => (
                  <div key={note.id} className="w-1/3 p-2">
                    <Form method="POST">
                      <input type="hidden" name="notewiseid" value={note.id} />
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="text-lg font-semibold mb-7">
                          {note.content}
                        </p>
                        <div className="flex justify-end">
                          <input
                            type="hidden"
                            name="notewiseid"
                            value={note.id}
                          />
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
                      </div>
                    </Form>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
