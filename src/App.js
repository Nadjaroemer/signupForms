import { useRef } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  fornavn: yup.string().required(),
  efternavn: yup.string().required(),
  email: yup.string().email(),
}).required();

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const email = useRef({});
  email.current = watch("email", "");

  const validation = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="App mt-10 w-1/3 mx-auto">
        <form
          onSubmit={handleSubmit(validation)}
          className="flex justify-center flex-col items-center"
        >
          {errors.fornavn && <p>{errors.fornavn?.message}</p>}
          <input
            {...register("fornavn")}
            type="text"
            placeholder="Fornavn"
            className="mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
"
          />
          <input
            type="text"
            placeholder="Efternavn"
            className="mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            {...register("email", { required: "field is required" })}
            type="text"
            placeholder="Email"
            className="mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
"
          />
          {errors.bekraeftemail && <p>{errors.bekraeftemail.message}</p>}
          <input
            {...register("bekraeftemail", {
              required: "field is required",
              validate: (value) =>
                value === email.current || "Emails do not match",
            })}
            type="text"
            placeholder="Bekræft email"
            className="mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
"
          />
          <input
            type="password"
            placeholder="Kodeord"
            className="mt-2
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
"
          />
          <input
            type="submit"
            value="Videre"
            className="bg-green-500 rounded-md mt-10 cursor-pointer pt-1 pb-1 pl-10 pr-10 text-white"
          />
        </form>
      </div>
    </>
  );
}

export default App;
