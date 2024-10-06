import { useState, useEffect } from "react";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateCpf = (cpf: string): boolean => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
};

const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

const formatCpf = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");
  const limitedCpf = onlyNumbers.slice(0, 11);

  if (limitedCpf.length <= 3) return limitedCpf;
  if (limitedCpf.length <= 6)
    return `${limitedCpf.slice(0, 3)}.${limitedCpf.slice(3)}`;
  if (limitedCpf.length <= 9)
    return `${limitedCpf.slice(0, 3)}.${limitedCpf.slice(
      3,
      6
    )}.${limitedCpf.slice(6)}`;
  return `${limitedCpf.slice(0, 3)}.${limitedCpf.slice(
    3,
    6
  )}.${limitedCpf.slice(6, 9)}-${limitedCpf.slice(9)}`;
};

interface FormValues {
  name: string;
  cpf: string;
  email: string;
  admissionDate: string;
}

const useForm = () => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    cpf: "",
    email: "",
    admissionDate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    cpf: "",
    email: "",
    admissionDate: "",
  });

  const [isTouched, setIsTouched] = useState({
    name: false,
    cpf: false,
    email: false,
    admissionDate: false,
  });

  const [isFormValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = name === "cpf" ? formatCpf(value) : value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setIsTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  useEffect(() => {
    const newErrors = {
      name: "",
      cpf: "",
      email: "",
      admissionDate: "",
    };

    if (isTouched.name && values.name.trim() === "") {
      newErrors.name = "Nome é obrigatório";
    } else if (isTouched.name && values.name.length < 4) {
      newErrors.name = "Nome muito curto";
    }

    if (isTouched.cpf && !validateCpf(values.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    if (isTouched.email && !validateEmail(values.email)) {
      newErrors.email = "Email inválido";
    }

    if (isTouched.admissionDate && !validateDate(values.admissionDate)) {
      newErrors.admissionDate = "Data inválida";
    }

    setErrors(newErrors);

    const validForm =
      values.name.trim() !== "" &&
      values.name.length >= 4 &&
      validateCpf(values.cpf) &&
      validateEmail(values.email) &&
      validateDate(values.admissionDate);

    setFormValid(validForm);
  }, [values, isTouched]);

  return {
    values,
    errors,
    isFormValid,
    handleChange,
    handleBlur,
  };
};

export default useForm;
