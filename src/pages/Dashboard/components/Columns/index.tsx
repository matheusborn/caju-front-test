import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "~/Store/userSlice";
import { RootState, AppDispatch } from "~/Store";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

const Columns = () => {
  const dispatch: AppDispatch = useDispatch(); // Use a tipagem correta para dispatch
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    console.log("aqui");
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <S.Container>
      {users.length > 0 ? (
        !loading ? (
          allColumns.map((column, index) => {
            return (
              <S.Column status={column.status} key={index}>
                <>
                  <S.TitleColumn status={column.status}>
                    {column.title}
                  </S.TitleColumn>

                  <S.CollumContent>
                    {users.map(
                      (user: any) =>
                        user.status === column.status && (
                          <RegistrationCard data={user} key={user.id} />
                        )
                    )}
                  </S.CollumContent>
                </>
              </S.Column>
            );
          })
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>Vazio</p>
      )}
    </S.Container>
  );
};
export default Columns;
