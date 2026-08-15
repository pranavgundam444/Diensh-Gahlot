import { FcGoogle } from "react-icons/fc";
import { PyramidIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">

      {/* Logo */}
      <div className="mb-5 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <PyramidIcon className="h-4 w-4 text-white" />
        </div>
        <span>Pyramid</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[430px] rounded-3xl border border-gray-200 bg-white px-7 py-8 shadow-sm">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Let's Get back on track
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter your email below to login to your account.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          {/* Guest Login */}
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="h-11 w-full cursor-pointer rounded-xl bg-black px-4 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Continue as Guest
          </button>

          {/* Google Login */}
          <button
            type="button"
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50 active:scale-[0.99]"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Login with Google</span>
          </button>

        </div>
      </div>

      {/* Terms */}
      <p className="mt-5 max-w-[360px] text-center text-xs leading-5 text-gray-500">
        By clicking Continue, you agree to
        <br />
        our{" "}
        <span className="cursor-pointer underline underline-offset-2 hover:text-gray-700">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="cursor-pointer underline underline-offset-2 hover:text-gray-700">
          Privacy Policy
        </span>
      </p>

    </div>
  );
};

export default Login;