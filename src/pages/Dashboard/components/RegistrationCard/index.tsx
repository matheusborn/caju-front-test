import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { fetchUsers } from "~/Store/userSlice";
import { AppDispatch } from "~/Store";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const removeUser = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registrations/${id}`
      );
      console.log("User deleted successfully:", response.data);

      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error deleting user:", error);
      if (isAxiosError(error)) {
        console.error("Axios error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const changeStatus = async (user: any, type: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registrations/${user.id}`,
        { ...user, status: type }
      );

      console.log("User status updated successfully:", response.data);

      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error updating user status:", error);
      if (isAxiosError(error)) {
        console.error("Axios error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === "REVIEW" && (
          <>
            <ButtonSmall
              onClick={() => changeStatus(props.data, "REPROVED")}
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              onClick={() => changeStatus(props.data, "APPROVED")}
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            onClick={() => changeStatus(props.data, "REVIEW")}
            bgcolor="#ff8858"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash onClick={() => removeUser(props.data.id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
