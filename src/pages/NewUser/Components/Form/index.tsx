import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import useForm from "../Hooks";
import axios, { isAxiosError } from "axios";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

const Form = () => {
  const { values, errors, isFormValid, handleChange, handleBlur } = useForm();
  const history = useHistory();

  const createUser = async () => {
    if (isFormValid) {
      console.log("Creating user with values:", values);

      const cleanedCpf = values.cpf.replace(/[^\d]/g, "");

      try {
        const response = await axios.post(
          "http://localhost:3000/registrations",
          {
            id: String(Math.random() * 100000),
            email: values.email,
            cpf: cleanedCpf,
            employeeName: values.name,
            admissionData: values.admissionDate,
            status: "REVIEW",
          }
        );
        console.log("User created successfully:", response.data);
        history.push(routes.dashboard);
      } catch (error) {
        console.error("Error creating user:", error);
        if (isAxiosError(error)) {
          console.error("Axios error message:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    } else {
      console.log("Form is invalid. Fix the errors:", errors);
    }
  };

  return (
    <>
      <TextField
        placeholder="Nome"
        label="Nome"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

      <TextField
        placeholder="Email"
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

      <TextField
        placeholder="CPF"
        label="CPF"
        name="cpf"
        value={values.cpf}
        onChange={(e) => handleChange(e)}
        onBlur={handleBlur}
      />
      {errors.cpf && <span style={{ color: "red" }}>{errors.cpf}</span>}

      <TextField
        label="Data de admissão"
        type="date"
        name="admissionDate"
        value={values.admissionDate}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.admissionDate && (
        <span style={{ color: "red" }}>{errors.admissionDate}</span>
      )}

      <Button disabled={!isFormValid} onClick={createUser}>
        Cadastrar
      </Button>
    </>
  );
};

export default Form;
