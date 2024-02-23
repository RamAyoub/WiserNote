import { Form } from "@remix-run/react";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";

export default function CreateNoteBox() {
  return (
    <div className="h-1/3 ">
      <h1 className="font-semibold font-sans text-lg mt-3 mb-3">
        {" "}
        Get Started by writing something here...
      </h1>

      <Form method="POST">
        <div className="flex flex-col h-screen items-center">
          <Textarea
            id="noteContent"
            name="noteContent"
            style={{ width: "100%" }}
            rows={7}
            cols={20}
            className="border-2 rounded-md max-h-44"
            placeholder="What would you like to write down?"
          />
          <button
            name="_action"
            value="createNote"
            type="submit"
            className="font-sans w-32 text-white border rounded-md mt-2 bg-[#0074B7] hover:bg-[#003B73] shadow-md"
          >
            Write it down
          </button>
        </div>
      </Form>
    </div>
  );
}
