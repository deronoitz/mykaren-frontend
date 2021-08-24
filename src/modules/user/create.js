import * as yup from "yup";
import { fetcherWithBody } from "../fetcher";
import { swrWithInput } from "../swr";

const schema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(
      /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
      "Must contain uppercase, lowercase, number and special case character"
    )
    .required(),
  phoneNumber: yup.string(),
  nis: yup.number()
});

const contract = {
  path: "api/auth/create",
  method: "post",
  withToken: false,
  schema
};

const fetcher = fetcherWithBody(contract);

const swr = (options) => swrWithInput(contract, fetcher, options);

const User__CreateContract = {
  schema,
  contract,
  fetcher,
  swr
};

export default User__CreateContract;
