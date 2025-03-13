import { useContext } from "react";
import Swal from "sweetalert2";
import { ErrorContext } from "../context/ErrorContext";

const CustonAlert = () => {
  const { SetErrorNull, Error } = useContext(ErrorContext);

  if (Error === "שגיאה באימות!") {
    Swal.fire({
      title: "שגיאה באימות!",
      text: "התחבר מחדש",
      icon: "error",
      confirmButtonText: "הבנתי",
    }).then(() => {
      SetErrorNull();
    });
  }

  if (Error === "קבוע לך שיעור במועד זה") {
    Swal.fire({
      title: "קבוע שיעור במועד זה",
      text: "מחק את השיעור הקיים או קבע שיעור בזמן אחר",
      icon: "error",
      confirmButtonText: "הבנתי",
    }).then(() => {
      SetErrorNull();
    });
  }

  if (Error === "כבר קבועים שיעורים באחד ממועדים אלו") {
    Swal.fire({
      title: "כבר קבועים שיעורים באחד ממועדים אלו",
      text: "מחק את השיעורים הקיימים או קבע שיעור בזמן אחר",
      icon: "error",
      confirmButtonText: "הבנתי",
    }).then(() => {
      SetErrorNull();
    });
  }
};

export default CustonAlert;
