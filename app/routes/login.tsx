import { Input } from "@/components/input";
import logo from "@/components/wisernote-removebg.png";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as z from "zod";
import { WorkOS } from "@workos-inc/node";
import { commitSession, getSession } from "~/util/session_server";

const schema = z.object({
  email: z
    .string({ required_error: "Please provide an Email Address to register" })
    .email("Please provide a valid Email Address!"),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;
const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  let { receivedValues, errors, data } = await getValidatedFormData<FormData>(
    request,
    resolver
  );
  console.log(data);
  if (!data) {
    throw new Response("Oh no! Something went wrong!", {
      status: 400,
    });
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const res = await workos.userManagement.authenticateWithPassword({
    email: data.email,
    password: data.password,
    clientId: process.env.WORKOS_CLIENT_ID || ""
  });

  let session = await getSession()
  session.set('user', res.user)
  const setCookieHeader = await commitSession(session)

  return redirect('/', {
    headers: {
        'Set-Cookie': setCookieHeader,
    }
  });

};

export default function Log() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <div className="flex justify-between h-screen">
      <div className="w-full flex items-center justify-center"> </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-9">
          <img src={logo} alt="Logo" className="w-auto h-12 items-center mr-2" />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow w-80">
          <h1 className="p-5 text-lg font-semibold font-sans to-blue-950">
            {" "}
            Welcome Back!
          </h1>
          <Form onSubmit={handleSubmit}>
          <Input className="w-full h-8 p-5 mb-5" {...register("email")} type="email" name="email" placeholder="Email Address" />
          {errors.email && (
            <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {" "}
              {errors.email.message}
            </p>
          )}

          <Input className="w-full h-8 p-5" {...register("password")} type="password" name="password" placeholder="Password" />
          {errors.password && (
            <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {" "}
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 rounded text-white w-full h-8 font-semibold font-sans text-sm bg-gradient-to-l from-blue-100 to-[#0074B7] hover:from-[#0074B7] hover:to-[#003B73] shadow-md"
          >
            {" "}
            Sign in{" "}
          </button>
          </Form>
          <span className="w-20 border border-black mt-4 mb-2 rounded-sm"></span>

          <p> Don't have an account yet? <Link to="/register" className="underline"> Register here</Link>.</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center"> </div>
    </div>
  );
}
