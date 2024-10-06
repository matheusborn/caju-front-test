import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useState, useEffect } from "react";
import { formatCpf } from "~/Utils";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/Store";
import { fetchUserByCpf, fetchUsers, resetUsers } from "~/Store/userSlice";

export const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state: RootState) => state.users.loading);
  const [cpf, setCpf] = useState<string>("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    if (cpf.length === 14) {
      dispatch(resetUsers());
      dispatch(fetchUserByCpf(cpf));
    }
  }, [cpf, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  return (
    <S.Container>
      <TextField
        value={cpf}
        placeholder="Digite um CPF válido"
        onChange={(e) => setCpf(formatCpf(e.target.value))}
      />
      <S.Actions>
        <IconButton
          className={loading ? "loading" : ""}
          onClick={handleRefresh}
          aria-label="refetch"
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
