import { useRef } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  fornavn: yup
  .string()
  .required("Your name is required")
  .min(2, "Our programmers have determined that your name must contain more than to letters")
  .matches(/^[a-zzZ-À-ÿ -]+$/, "The name you entered has to contain letters only"),
  efternavn: yup
  .string()
  .required("Your name is required")
  .matches(/^[aA-zZÀ-ÿ]+$/, "The name you entered has to contain letters")
  .min(2, "Your name must contain more than to letters"),
  email: yup
  .string()
  .email()
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "The email you entered is not a valid email adress. Enter in the format name@example.com")
  .required("Your name is required"),
  bekraeftemail: yup
  .string()
  .oneOf([yup.ref("email")], "The email you entered does not match your email adress above")
  .required("You have to confirm your email adress")
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
            {...register("email", { required: "This field requires an email adress" })}
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
              required: "This field requires an email adress",
              validate: (value) =>
                value === email.current || "Your Emails do not match",
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
          <div class="flex">
            <input
              type="password"
              placeholder="Kodeord"
              className="mt-2
                      block
                      w-full
                      rounded-md
                      bg-gray-100
                      border-transparent
                      focus:border-gray-500 focus:bg-white focus:ring-0"
                     
            />
          </div>
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
